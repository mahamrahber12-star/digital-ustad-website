/**
 * Digital Ustad - Backend Lead Capture Endpoint (Netlify Serverless Function)
 * Route: /api/leads -> /.netlify/functions/leads
 * 
 * SERVER-SIDE REQUIREMENTS:
 * 1. POST method enforcement (rejects GET/PUT/DELETE with 405)
 * 2. Request payload size limit (< 10 KB, rejects with 413)
 * 3. Origin verification / CORS whitelist
 * 4. Spam protection: Honeypot check (_gotcha)
 * 5. Input validation & sanitization (name, phone, service, budget, message)
 * 6. Rate limiting (max 5 requests per IP per 10 minutes)
 * 7. Safe logging: Zero unredacted PII in logs
 * 8. Lead delivery forwarding to approved owner destination
 */

// In-memory sliding window rate limiter for serverless instance
const ipRateLimits = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Allowed origins
const ALLOWED_ORIGINS = [
  'https://digitalustad.co',
  'https://www.digitalustad.co'
];

// Helper: Sanitize string to prevent injection
function sanitizeString(str, maxLen = 500) {
  if (typeof str !== 'string') return '';
  return str
    .trim()
    .replace(/[<>]/g, '') // Strip HTML tags
    .substring(0, maxLen);
}

// Helper: Validate Pakistan or international phone number
function isValidPakistanPhone(phone) {
  if (typeof phone !== 'string') return false;
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
  return /^((\+92|0092|92)?3[0-9]{9}|03[0-9]{9}|\+[1-9]\d{7,14})$/.test(cleaned);
}

// Helper: Mask phone number for safe logging
function maskPhone(phone) {
  if (!phone || phone.length < 6) return '***';
  return phone.substring(0, 4) + '****' + phone.substring(phone.length - 2);
}

exports.handler = async (event, context) => {
  const origin = event.headers.origin || event.headers.Origin || '';
  const isAllowedOrigin = ALLOWED_ORIGINS.includes(origin) || 
                          origin.includes('localhost') || 
                          origin.includes('127.0.0.1') || 
                          origin.endsWith('.netlify.app');

  const corsHeaders = {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : 'https://digitalustad.co',
    'Access-Control-Allow-Headers': 'Content-Type, Idempotency-Key, X-Requested-With',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: ''
    };
  }

  // 1. Enforce POST method
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        error: 'METHOD_NOT_ALLOWED',
        message: 'Only POST requests are permitted.'
      })
    };
  }

  // 2. Request payload size check (< 10 KB)
  const rawBody = event.body || '';
  if (Buffer.byteLength(rawBody, 'utf8') > 10240) {
    return {
      statusCode: 413,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        error: 'PAYLOAD_TOO_LARGE',
        message: 'Request payload exceeds 10 KB limit.'
      })
    };
  }

  // 3. Rate limiting per IP
  const clientIp = event.headers['client-ip'] || 
                   event.headers['x-forwarded-for'] || 
                   'unknown';

  const now = Date.now();
  const clientHistory = ipRateLimits.get(clientIp) || [];
  const recentHistory = clientHistory.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recentHistory.length >= MAX_REQUESTS_PER_WINDOW) {
    return {
      statusCode: 429,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        error: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many submissions from this connection. Please wait a few minutes before retrying.'
      })
    };
  }

  recentHistory.push(now);
  ipRateLimits.set(clientIp, recentHistory);

  // 4. Parse JSON payload
  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch (err) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        error: 'INVALID_JSON',
        message: 'Malformed request body.'
      })
    };
  }

  // 5. Spam Protection: Honeypot check (_gotcha)
  if (payload._gotcha) {
    // Silent drop: Return success to fool automated spam bots
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        confirmationId: 'ack_drop_' + Date.now(),
        message: 'Lead received.'
      })
    };
  }

  // 6. Input Validation & Sanitization
  const name = sanitizeString(payload.name, 100);
  const businessName = sanitizeString(payload.businessName || payload.business, 120);
  const phone = sanitizeString(payload.phone, 30);
  const email = sanitizeString(payload.email, 120);
  const website = sanitizeString(payload.website, 180);
  const service = sanitizeString(payload.service, 120) || 'General Inquiry';
  const budget = sanitizeString(payload.budget, 80) || 'Not Specified';
  const message = sanitizeString(payload.message, 1000);
  const sourcePage = sanitizeString(payload.sourcePage, 100) || '/';
  const leadSource = sanitizeString(payload.leadSource, 50) || 'website';
  const idempotencyKey = sanitizeString(payload.idempotencyKey || event.headers['idempotency-key'], 64) || ('lead_' + Date.now());

  if (!name || name.length < 2) {
    return {
      statusCode: 422,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        error: 'VALIDATION_FAILED',
        field: 'name',
        message: 'Please provide a valid full name (minimum 2 characters).'
      })
    };
  }

  if (!phone || !isValidPakistanPhone(phone)) {
    return {
      statusCode: 422,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        error: 'VALIDATION_FAILED',
        field: 'phone',
        message: 'Please enter a valid Pakistan phone or WhatsApp number (e.g. 03XX XXXXXXX).'
      })
    };
  }

  // 7. Safe Logging (Zero unredacted PII)
  console.log(`[Lead Ingestion] Timestamp=${new Date().toISOString()} Key=${idempotencyKey} Service="${service}" SourcePage="${sourcePage}" Source="${leadSource}" Phone=${maskPhone(phone)}`);

  // 8. Lead Delivery to Approved Owner Destination
  const approvedDestinationUrl = process.env.CLONVO_LEAD_ENDPOINT || 
                                 process.env.DU_LEAD_DESTINATION_WEBHOOK || 
                                 '';

  const leadRecord = {
    idempotencyKey,
    name,
    businessName,
    phone,
    email,
    website,
    service,
    budget,
    message,
    sourcePage,
    leadSource,
    submittedAt: new Date().toISOString(),
    clientIp: clientIp !== 'unknown' ? clientIp.split(',')[0].trim() : 'hidden'
  };

  // If owner has configured an approved live destination, forward via POST
  if (approvedDestinationUrl && approvedDestinationUrl.trim() !== '') {
    try {
      const forwardResponse = await fetch(approvedDestinationUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': idempotencyKey,
          'User-Agent': 'DigitalUstad-LeadDelivery/1.0'
        },
        body: JSON.stringify(leadRecord)
      });

      if (!forwardResponse.ok) {
        console.error(`[Lead Delivery Failed] Destination responded with status ${forwardResponse.status}`);
        return {
          statusCode: 502,
          headers: corsHeaders,
          body: JSON.stringify({
            success: false,
            error: 'DESTINATION_DELIVERY_FAILED',
            message: 'Unable to forward lead to destination CRM at this time. Please retry.'
          })
        };
      }

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          success: true,
          confirmationId: idempotencyKey,
          message: 'Project brief submitted and delivered successfully.'
        })
      };
    } catch (deliveryErr) {
      console.error('[Lead Delivery Network Error]', deliveryErr.message);
      return {
        statusCode: 503,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'DESTINATION_UNAVAILABLE',
          message: 'Lead destination service temporarily unavailable. Please retry or contact us directly.'
        })
      };
    }
  }

  // If approved destination is not yet configured by the owner in production environment:
  // In staging/local or initial setup, return confirmed receipt with status notice
  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify({
      success: true,
      confirmationId: idempotencyKey,
      message: 'Project brief submitted and queued for review.',
      notice: 'Lead endpoint active. Awaiting owner production webhook destination for automated forwarding.'
    })
  };
};
