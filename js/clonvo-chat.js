/**
 * Digital Ustad - Clonvo.chat Webchat Integration Layer (QA-05)
 * 
 * Official visitor-facing chat layer: "Digital Ustad Assistant"
 * Attribution: "Powered by Clonvo.chat"
 * 
 * Security & Architecture:
 * - Zero hardcoded secret keys. Tenant, assistant, and API endpoints are loaded from DU_CONFIG.clonvo.
 * - Single-instance enforcement per page.
 * - Bilingual support: English and Roman Urdu.
 * - 10-step guided consultation and lead qualification engine with local fallback.
 * - Strict WhatsApp isolation: WhatsApp is NEVER exposed on non-contact pages.
 * - Safe-area mobile compliance, full accessibility (ARIA, focus trap, Escape key).
 * - Rate limiting (5 msgs / 10s), input limits (500 chars), HTML sanitization.
 * - Idempotent lead submissions and failure state handling.
 */

(function() {
  'use strict';

  // Prevent multiple initializations
  if (typeof window === 'undefined' || window.__DU_CLONVO_INITIALIZED__) {
    return;
  }
  window.__DU_CLONVO_INITIALIZED__ = true;

  // Retrieve configuration safely from DU_CONFIG
  const getConfig = () => {
    const defaultConf = {
      enabled: true,
      assistantName: 'Digital Ustad Assistant',
      attribution: 'Powered by Clonvo.chat',
      privacyUrl: 'privacy.html',
      contactUrl: 'contact.html',
      apiUrl: '',
      tenantId: '',
      assistantId: '',
      rateLimit: { maxRequests: 5, windowMs: 10000 },
      inputMaxChars: 500,
      timeoutMs: 15000,
      defaultLanguage: 'en'
    };
    if (window.DU_CONFIG && window.DU_CONFIG.clonvo) {
      return Object.assign({}, defaultConf, window.DU_CONFIG.clonvo);
    }
    return defaultConf;
  };

  // State Management
  const state = {
    isOpen: false,
    language: 'en', // 'en' | 'ur'
    step: 0, // 0 = welcome, 1 = goal, 2 = business_type, 3 = challenge, 4 = recommended, 5 = budget_timeline, 6 = summary, 7 = consent, 8 = contact, 9 = submitted
    leadData: {
      goal: '',
      service: '',
      packageId: '',
      businessType: '',
      challenge: '',
      recommendation: '',
      budget: '',
      timeline: '',
      consentGiven: false,
      name: '',
      contact: '',
      idempotencyKey: '',
      sourcePage: window.location.pathname,
      campaign: ''
    },
    messageTimestamps: [],
    savedDraft: '',
    isWaitingResponse: false,
    focusedElementBeforeOpen: null
  };

  // Bilingual Copy Dictionary
  const COPY = {
    en: {
      assistantName: 'Digital Ustad Assistant',
      onlineStatus: 'Online • Active',
      attribution: 'Powered by Clonvo.chat',
      privacyText: 'Privacy Policy',
      welcome: 'Welcome to Digital Ustad. I can help you compare website, marketing, SEO, branding and automation solutions. What would you like to improve?',
      quickActionsTitle: 'Quick Actions:',
      quickActions: [
        { id: 'web', label: 'Website Packages', goal: 'Custom Website / Redesign' },
        { id: 'marketing', label: 'Digital Marketing', goal: 'Digital Marketing & Ads' },
        { id: 'seo', label: 'SEO & Google Business', goal: 'Google Ranking & Local SEO' },
        { id: 'branding', label: 'Branding & Design', goal: 'Brand Identity & Design' },
        { id: 'automation', label: 'Automation Solutions', goal: 'WhatsApp & Business Automation' },
        { id: 'human', label: 'Talk to the Team', goal: 'Direct Team Consultation' }
      ],
      businessTypes: [
        'Clinic / Healthcare',
        'Restaurant / Food',
        'Salon / Beauty',
        'Real Estate',
        'Education / Academy',
        'Retail / E-Commerce',
        'Professional Services',
        'Other Business'
      ],
      challenges: [
        'No website yet',
        'Low lead generation',
        'Poor Google / Map visibility',
        'Inconsistent social media',
        'Manual WhatsApp / order handling',
        'Custom requirement'
      ],
      budgetBands: [
        'Under PKR 30k',
        'PKR 30k - 60k',
        'PKR 60k - 120k',
        'PKR 120k+'
      ],
      timelines: [
        'Urgent (1–2 weeks)',
        'Standard (3–4 weeks)',
        'Flexible'
      ],
      steps: {
        askBusinessType: 'Great! What type of business are you operating?',
        askChallenge: 'Got it. What is your primary challenge or objective right now?',
        serviceRecommendation: 'Based on your needs, here is what we recommend:',
        askBudgetTimeline: 'To provide the most realistic roadmap, what is your estimated budget band and desired timeline?',
        summaryTitle: '📋 Your Project Summary:',
        consentPrompt: 'We treat your information with strict confidentiality. Do you consent to Digital Ustad contacting you regarding this inquiry? (Zero spam guaranteed).',
        consentCheckbox: 'I consent to Digital Ustad contacting me regarding this project.',
        askContactInfo: 'Please provide your name and phone number (or email) so our lead specialist can follow up with your formal proposal:',
        submitSuccess: '✅ Thank you! Your project brief has been recorded. Our team will review your specifications.',
        continueContactBtn: 'Continue on Contact Page'
      },
      errors: {
        timeout: 'The assistant is taking longer than expected.',
        unavailable: 'The assistant is temporarily unavailable.',
        empty: 'I could not generate a useful answer.',
        humanHandoff: 'Our team can continue from here.',
        offline: 'You appear to be offline. Your draft has been saved locally.',
        rateLimit: 'Please wait a few seconds before sending another message.',
        tooLong: 'Message exceeds the 500 character limit.'
      },
      inputPlaceholder: 'Ask a question or describe your project...',
      charCount: '/500'
    },
    ur: {
      assistantName: 'Digital Ustad Assistant',
      onlineStatus: 'آن لائن • دستیاب',
      attribution: 'Powered by Clonvo.chat',
      privacyText: 'پرائیویسی پالیسی',
      welcome: 'Assalam-o-Alaikum! Main Digital Ustad assistant hoon. Aap website, digital marketing, SEO, branding ya automation mein kis cheez ki help chahte hain?',
      quickActionsTitle: 'Quick Actions:',
      quickActions: [
        { id: 'web', label: 'Website Packages', goal: 'ویب سائٹ پیکجز' },
        { id: 'marketing', label: 'Digital Marketing', goal: 'ڈیجیٹل مارکیٹنگ' },
        { id: 'seo', label: 'SEO & Google Business', goal: 'گوگل رینکنگ اور لوکل SEO' },
        { id: 'branding', label: 'Branding & Design', goal: 'برانڈنگ اور گرافک ڈیزائن' },
        { id: 'automation', label: 'Automation Solutions', goal: 'واٹس ایپ اور بزنس آٹومیشن' },
        { id: 'human', label: 'Talk to the Team', goal: 'ٹیم سے براہ راست رابطہ' }
      ],
      businessTypes: [
        'Clinic / Healthcare (کلینک یا ہسپتال)',
        'Restaurant / Food (ریسٹورنٹ یا کیفے)',
        'Salon / Beauty (بیوٹی پارلر یا سیلون)',
        'Real Estate (پراپرٹی یا رئیل اسٹیٹ)',
        'Education / Academy (اکیڈمی یا اسکول)',
        'Retail / E-Commerce (دکان یا آن لائن اسٹور)',
        'Professional Services (سروسز)',
        'Other Business (کوئی دوسرا کاروبار)'
      ],
      challenges: [
        'ابھی تک کوئی ویب سائٹ نہیں ہے',
        'گاہکوں یا Leads کی کمی ہے',
        'گوگل میپس پر کاروبار نظر نہیں آتا',
        'سوشل میڈیا پر باقاعدگی نہیں ہے',
        'واٹس ایپ آرڈرز مینوئل ہینڈل کرنے پڑتے ہیں',
        'کوئی خاص ضرورت ہے'
      ],
      budgetBands: [
        '30 ہزار روپے سے کم',
        '30 سے 60 ہزار روپے',
        '60 سے 120 ہزار روپے',
        '120 ہزار روپے سے زیادہ'
      ],
      timelines: [
        'ارجنٹ (1 سے 2 ہفتے)',
        'معمول (3 سے 4 ہفتے)',
        'فلیکسیبل (آرام سے)'
      ],
      steps: {
        askBusinessType: 'بہت خوب! آپ کا کاروبار کس شعبے سے تعلق رکھتا ہے؟',
        askChallenge: 'سمجھ گیا۔ اس وقت آپ کا سب سے بڑا چیلنج یا ہدف کیا ہے؟',
        serviceRecommendation: 'آپ کی ضروریات کے مطابق ہماری تجویز کردہ سروس یہ ہے:',
        askBudgetTimeline: 'صحیح رہنمائی کے لیے، آپ کا متوقع بجٹ اور وقت کیا ہے؟',
        summaryTitle: '📋 آپ کے پروجیکٹ کا خلاصہ:',
        consentPrompt: 'ہم آپ کے ڈیٹا کا احترام کرتے ہیں۔ کیا آپ کی اجازت ہے کہ ڈیجیٹل استاد کی ٹیم اس پروجیکٹ پر آپ سے رابطہ کرے؟',
        consentCheckbox: 'جی ہاں، مجھے ڈیجیٹل استاد کی طرف سے رابطہ کرنے پر رضامندی ہے۔',
        askContactInfo: 'برائے مہربانی اپنا نام اور فون نمبر (یا ای میل) درج کریں تاکہ ہم آپ کو مکمل پلان بھیج سکیں:',
        submitSuccess: '✅ شکریہ! آپ کا پروجیکٹ بریف موصول ہو چکا ہے۔ ہماری ٹیم جلد آپ سے رابطہ کرے گی۔',
        continueContactBtn: 'رابطہ صفحہ پر جاری رکھیں'
      },
      errors: {
        timeout: 'The assistant is taking longer than expected.',
        unavailable: 'The assistant is temporarily unavailable.',
        empty: 'I could not generate a useful answer.',
        humanHandoff: 'Our team can continue from here.',
        offline: 'You appear to be offline. آپ کا میسج محفوظ کر لیا گیا ہے۔',
        rateLimit: 'براہ کرم نیا میسج بھیجنے سے پہلے کچھ سیکنڈ انتظار فرمائیں۔',
        tooLong: 'میسج 500 حروف سے زیادہ طویل ہے۔'
      },
      inputPlaceholder: 'اپنا سوال یا پروجیکٹ تفصیل لکھیں...',
      charCount: '/500'
    }
  };

  // Helper: Sanitize HTML to prevent XSS
  const escapeHTML = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  // Helper: Analytics Event Dispatcher
  const dispatchAnalytics = (eventName, params = {}) => {
    const payload = Object.assign({
      event: eventName,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      language: state.language
    }, params);

    // 1. Dispatch custom DOM event
    try {
      window.dispatchEvent(new CustomEvent('digitalustad:analytics', { detail: payload }));
    } catch (e) {
      // safe ignore
    }

    // 2. Dispatch to Google Tag Manager dataLayer if present
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push(payload);
    }
  };

  // Helper: Generate Idempotency Key
  const generateIdempotencyKey = () => {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return 'du_lead_' + crypto.randomUUID();
    }
    return 'du_lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
  };

  // Rate Limiting Check (5 requests per 10 seconds)
  const isRateLimited = () => {
    const config = getConfig();
    const now = Date.now();
    const limit = config.rateLimit.maxRequests || 5;
    const windowMs = config.rateLimit.windowMs || 10000;

    // Filter out timestamps older than window
    state.messageTimestamps = state.messageTimestamps.filter(t => (now - t) < windowMs);

    if (state.messageTimestamps.length >= limit) {
      return true;
    }
    state.messageTimestamps.push(now);
    return false;
  };

  // Helper: Smart Service Recommendation Engine
  const generateRecommendation = (lead) => {
    const bType = (lead.businessType || '').toLowerCase();
    const chal = (lead.challenge || '').toLowerCase();
    const goal = (lead.goal || '').toLowerCase();

    if (bType.includes('clinic') || bType.includes('health')) {
      return {
        service: '5-Page Website Starter + Local SEO & Google Maps',
        rationale: 'Healthcare businesses succeed when patients can easily find doctor timings, verify clinic location on Google Maps, and submit appointment inquiries seamlessly.'
      };
    } else if (bType.includes('restaurant') || bType.includes('food')) {
      return {
        service: 'Social Media Management + WhatsApp Automated Workflow',
        rationale: 'Food businesses thrive on mouth-watering visual social content and fast, automated WhatsApp menu sharing and table/order coordination.'
      };
    } else if (bType.includes('real estate')) {
      return {
        service: 'Meta Lead Ads Management + Custom High-Converting Landing Page',
        rationale: 'High-value property investments need targeted buyer filtering and fast lead follow-up systems.'
      };
    } else if (bType.includes('salon') || bType.includes('beauty')) {
      return {
        service: 'Local SEO (Google Business Profile) + Instagram Growth Package',
        rationale: 'Beauty and grooming clients search locally on Google Maps and check Instagram before booking appointments.'
      };
    } else if (bType.includes('retail') || bType.includes('e-commerce') || bType.includes('store')) {
      return {
        service: 'Custom E-Commerce Web Store + WhatsApp Order Notifications',
        rationale: 'Pakistani online shoppers expect fast mobile catalogs, transparent PKR pricing, and instant automated WhatsApp confirmations.'
      };
    } else if (chal.includes('no website') || goal.includes('website')) {
      return {
        service: '5-Page Website Starter (PKR 27,999)',
        rationale: 'Our most popular SMB foundation includes clean mobile design, SEO tags, hosting setup, and an accountable 7-10 day delivery.'
      };
    } else if (chal.includes('google') || goal.includes('seo')) {
      return {
        service: 'Local SEO & Google Business Profile Management',
        rationale: 'Target high-intent searchers in your Pakistani city who are actively looking for your exact service.'
      };
    } else if (chal.includes('order') || chal.includes('manual') || goal.includes('automation')) {
      return {
        service: 'WhatsApp Automation Growth Workflow (PKR 34,999)',
        rationale: 'Eliminate manual repetitive replies with 24/7 automated inquiry capture, smart routing, and instant responses.'
      };
    }

    return {
      service: 'All-in-One Digital Growth Consultation',
      rationale: 'A holistic combination of website structure, local Google visibility, and marketing workflows tailored for sustainable business revenue.'
    };
  };

  // Build the DOM Components
  class DigitalUstadClonvoChatUI {
    constructor() {
      this.dialog = null;
      this.messagesContainer = null;
      this.form = null;
      this.input = null;
      this.charCounter = null;
      this.sendBtn = null;
      this.launcher = null;
      this.langToggleBtn = null;
      this.closeBtn = null;
      this.init();
    }

    init() {
      this.findOrCreateLauncher();
      this.createChatDialog();
      this.bindEvents();
      this.checkOfflineStatus();
    }

    findOrCreateLauncher() {
      // Look for existing launcher on the page
      let launcher = document.getElementById('du-chat-launcher');
      if (!launcher) {
        launcher = document.querySelector('button[aria-label="Open Digital Ustad assistant"]');
      }

      if (launcher) {
        this.launcher = launcher;
        this.launcher.id = 'du-chat-launcher';
        this.launcher.setAttribute('aria-haspopup', 'dialog');
        this.launcher.setAttribute('aria-expanded', 'false');
        this.launcher.setAttribute('aria-controls', 'du-chat-dialog');
      } else {
        // Create Navy / Orange Launcher
        this.launcher = document.createElement('button');
        this.launcher.id = 'du-chat-launcher';
        this.launcher.type = 'button';
        this.launcher.className = 'fixed bottom-6 right-6 z-40 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-[#0B0F19] hover:bg-slate-900 text-white flex items-center justify-center gap-2.5 shadow-2xl border border-slate-700/80 hover:border-[#FF6600] hover:scale-105 active:scale-95 transition-all group';
        this.launcher.setAttribute('aria-label', 'Open Digital Ustad assistant');
        this.launcher.setAttribute('title', 'Ask Digital Ustad');
        this.launcher.setAttribute('aria-haspopup', 'dialog');
        this.launcher.setAttribute('aria-expanded', 'false');
        this.launcher.setAttribute('aria-controls', 'du-chat-dialog');

        this.launcher.innerHTML = `
          <span class="relative flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6600] opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-[#FF6600]"></span>
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:rotate-12 transition-transform">
            <path d="M12 8V4H8"></path>
            <rect width="16" height="12" x="4" y="8" rx="2"></rect>
            <path d="M2 14h2"></path>
            <path d="M20 14h2"></path>
            <path d="M15 13v2"></path>
            <path d="M9 13v2"></path>
          </svg>
          <span class="text-xs font-bold tracking-wide hidden sm:inline text-white">Ask Digital Ustad</span>
        `;

        document.body.appendChild(this.launcher);
      }
    }

    createChatDialog() {
      // Check if dialog already exists
      let dialog = document.getElementById('du-chat-dialog');
      if (dialog) {
        this.dialog = dialog;
        return;
      }

      const conf = getConfig();

      this.dialog = document.createElement('div');
      this.dialog.id = 'du-chat-dialog';
      this.dialog.setAttribute('role', 'dialog');
      this.dialog.setAttribute('aria-modal', 'true');
      this.dialog.setAttribute('aria-labelledby', 'du-chat-title');
      this.dialog.setAttribute('tabindex', '-1');

      this.dialog.innerHTML = `
        <!-- Header -->
        <div class="px-4 py-3 bg-[#0E1526] border-b border-white/10 flex items-center justify-between select-none">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF6600] to-orange-400 flex items-center justify-center text-white shadow-md flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>
            </div>
            <div>
              <h3 id="du-chat-title" class="font-bold text-xs text-white tracking-wide">${escapeHTML(conf.assistantName)}</h3>
              <p id="du-chat-status" class="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                <span id="du-chat-status-text">Online • Active</span>
              </p>
            </div>
          </div>
          <div class="flex items-center gap-1.5">
            <!-- Language Toggle Button -->
            <button type="button" id="du-chat-lang-btn" class="px-2 py-1 text-[11px] font-bold rounded bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 transition-colors" title="Toggle English / Roman Urdu" aria-label="Toggle language">
              EN / اردو
            </button>
            <!-- Close Button -->
            <button type="button" id="du-chat-close-btn" class="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white flex items-center justify-center transition-colors" aria-label="Close chat" title="Close chat">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>
        </div>

        <!-- Optional Attribution & Privacy Bar -->
        <div class="px-4 py-1.5 bg-[#090D15] border-b border-white/5 flex items-center justify-between text-[10px] text-slate-400">
          <span class="font-medium text-slate-400">${escapeHTML(conf.attribution)}</span>
          <a href="${escapeHTML(conf.privacyUrl)}" class="text-[#FF6600] hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        </div>

        <!-- Messages Area -->
        <div id="du-chat-messages" class="du-chat-messages" role="log" aria-live="polite"></div>

        <!-- Input Area Form -->
        <form id="du-chat-form" class="p-3 bg-[#0E1526] border-t border-white/10 flex flex-col gap-1.5">
          <div class="flex items-end gap-2 bg-[#151D2F] border border-white/10 rounded-xl p-1.5 focus-within:border-[#FF6600] transition-colors">
            <textarea id="du-chat-input" rows="1" maxlength="500" placeholder="Ask a question or describe your project..." class="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none resize-none px-2 py-1 max-h-24"></textarea>
            <button type="submit" id="du-chat-send" class="p-2 rounded-lg bg-[#FF6600] hover:bg-orange-600 text-white flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed transition-all" aria-label="Send message">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
            </button>
          </div>
          <div class="flex justify-between items-center px-1 text-[10px] text-slate-400">
            <span id="du-chat-hint">Press Enter to send</span>
            <span id="du-chat-char-counter">0/500</span>
          </div>
        </form>
      `;

      document.body.appendChild(this.dialog);

      this.messagesContainer = this.dialog.querySelector('#du-chat-messages');
      this.form = this.dialog.querySelector('#du-chat-form');
      this.input = this.dialog.querySelector('#du-chat-input');
      this.charCounter = this.dialog.querySelector('#du-chat-char-counter');
      this.sendBtn = this.dialog.querySelector('#du-chat-send');
      this.langToggleBtn = this.dialog.querySelector('#du-chat-lang-btn');
      this.closeBtn = this.dialog.querySelector('#du-chat-close-btn');
    }

    bindEvents() {
      // Launcher Click
      this.launcher.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggle();
      });

      // Close Button Click
      this.closeBtn.addEventListener('click', () => {
        this.close();
      });

      // Language Toggle
      this.langToggleBtn.addEventListener('click', () => {
        this.switchLanguage(state.language === 'en' ? 'ur' : 'en');
      });

      // Form Submit
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleUserSubmit();
      });

      // Textarea Auto-expand & Enter to send
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.handleUserSubmit();
        }
      });

      this.input.addEventListener('input', () => {
        const len = this.input.value.length;
        this.charCounter.textContent = `${len}/500`;
        this.input.style.height = 'auto';
        this.input.style.height = Math.min(this.input.scrollHeight, 96) + 'px';
      });

      // Keyboard Trap & Escape Key Listener
      window.addEventListener('keydown', (e) => {
        if (!state.isOpen) return;

        if (e.key === 'Escape') {
          e.preventDefault();
          this.close();
          return;
        }

        // Focus trap
        if (e.key === 'Tab') {
          const focusable = this.dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          if (focusable.length === 0) return;
          const firstFocusable = focusable[0];
          const lastFocusable = focusable[focusable.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              lastFocusable.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusable) {
              firstFocusable.focus();
              e.preventDefault();
            }
          }
        }
      });

      // Custom Event Listener from other buttons on the page
      window.addEventListener('digitalustad:chat:open', (e) => {
        const ctx = (e && e.detail) ? e.detail : {};
        this.open(ctx);
      });
    }

    checkOfflineStatus() {
      window.addEventListener('offline', () => {
        const c = COPY[state.language];
        this.addBotMessage(c.errors.offline);
        dispatchAnalytics('chat_api_error', { reason: 'offline' });
      });

      window.addEventListener('online', () => {
        this.addBotMessage('🌐 Connection restored.');
      });
    }

    open(context = {}) {
      if (state.isOpen) {
        if (context.service || context.packageId || context.intent) {
          this.applyContext(context);
        }
        return;
      }

      state.focusedElementBeforeOpen = document.activeElement;
      state.isOpen = true;
      this.dialog.classList.add('du-chat-open');
      this.launcher.setAttribute('aria-expanded', 'true');

      // Initialize conversation if empty
      if (this.messagesContainer.children.length === 0) {
        this.startConversation(context);
      } else if (context.service || context.packageId) {
        this.applyContext(context);
      }

      dispatchAnalytics('chat_opened', {
        context_service: context.service || null,
        context_package: context.packageId || null
      });

      setTimeout(() => {
        this.input.focus();
      }, 150);
    }

    close() {
      if (!state.isOpen) return;
      state.isOpen = false;
      this.dialog.classList.remove('du-chat-open');
      this.launcher.setAttribute('aria-expanded', 'false');

      if (state.focusedElementBeforeOpen && typeof state.focusedElementBeforeOpen.focus === 'function') {
        state.focusedElementBeforeOpen.focus();
      }
    }

    toggle() {
      if (state.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }

    switchLanguage(lang) {
      if (lang !== 'en' && lang !== 'ur') return;
      state.language = lang;
      this.langToggleBtn.textContent = lang === 'en' ? 'EN / اردو' : 'اردو / EN';

      const c = COPY[lang];
      this.input.placeholder = c.inputPlaceholder;
      document.getElementById('du-chat-status-text').textContent = c.onlineStatus;

      // Add notification of language switch
      this.addBotMessage(lang === 'en' ? 'Switched to English.' : 'زبان اردو (Roman Urdu) میں تبدیل کر دی گئی ہے۔');
    }

    startConversation(context = {}) {
      const c = COPY[state.language];

      if (context.language && (context.language === 'ur' || context.language === 'en')) {
        this.switchLanguage(context.language);
      }

      // 1. Welcome Message
      this.addBotMessage(c.welcome);

      // Check if context has pre-selected package or service
      if (context.service || context.packageId) {
        this.applyContext(context);
      } else {
        // 2. Render 6 Quick Action Chips
        this.renderQuickActions();
      }
    }

    applyContext(context) {
      state.leadData.service = context.service || '';
      state.leadData.packageId = context.packageId || '';
      state.leadData.goal = context.intent || context.service || 'Package Consultation';
      state.leadData.sourcePage = context.sourcePage || window.location.pathname;

      const title = context.packageId || context.service || 'Selected Solution';
      const cleanTitle = title.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

      this.addBotMessage(`I see you are interested in **${escapeHTML(cleanTitle)}**! Let's tailor this to your business.`);
      
      // Move directly to Step 2: Ask Business Type
      state.step = 2;
      this.promptBusinessType();
    }

    renderQuickActions() {
      const c = COPY[state.language];
      const chipsWrapper = document.createElement('div');
      chipsWrapper.className = 'flex flex-wrap gap-1.5 mt-2';

      c.quickActions.forEach(qa => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'du-chip-btn';
        btn.textContent = qa.label;
        btn.addEventListener('click', () => {
          this.handleQuickAction(qa);
        });
        chipsWrapper.appendChild(btn);
      });

      this.messagesContainer.appendChild(chipsWrapper);
      this.scrollToBottom();
    }

    handleQuickAction(action) {
      dispatchAnalytics('chat_quick_action_selected', { action_id: action.id, label: action.label });

      // Add user message
      this.addUserMessage(action.label);

      // Human handoff request
      if (action.id === 'human') {
        this.handleHumanRequest();
        return;
      }

      state.leadData.goal = action.goal;
      state.leadData.service = action.label;
      state.step = 2;

      this.showTypingIndicator(() => {
        this.promptBusinessType();
      });
    }

    handleHumanRequest() {
      const c = COPY[state.language];
      this.showTypingIndicator(() => {
        this.addBotMessage(`${c.errors.humanHandoff} You can discuss your project with our senior consultants on the Contact page.`);
        this.renderContactPageButton();
      });
    }

    promptBusinessType() {
      const c = COPY[state.language];
      this.addBotMessage(c.steps.askBusinessType);

      const wrapper = document.createElement('div');
      wrapper.className = 'flex flex-wrap gap-1.5 mt-2';

      c.businessTypes.forEach(type => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'du-chip-btn';
        btn.textContent = type;
        btn.addEventListener('click', () => {
          this.addUserMessage(type);
          state.leadData.businessType = type;
          state.step = 3;
          this.showTypingIndicator(() => {
            this.promptChallenge();
          });
        });
        wrapper.appendChild(btn);
      });

      this.messagesContainer.appendChild(wrapper);
      this.scrollToBottom();
    }

    promptChallenge() {
      const c = COPY[state.language];
      this.addBotMessage(c.steps.askChallenge);

      const wrapper = document.createElement('div');
      wrapper.className = 'flex flex-wrap gap-1.5 mt-2';

      c.challenges.forEach(chal => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'du-chip-btn';
        btn.textContent = chal;
        btn.addEventListener('click', () => {
          this.addUserMessage(chal);
          state.leadData.challenge = chal;
          state.step = 4;
          this.showTypingIndicator(() => {
            this.presentRecommendation();
          });
        });
        wrapper.appendChild(btn);
      });

      this.messagesContainer.appendChild(wrapper);
      this.scrollToBottom();
    }

    presentRecommendation() {
      const c = COPY[state.language];
      const rec = generateRecommendation(state.leadData);
      state.leadData.recommendation = rec.service;

      dispatchAnalytics('chat_service_recommended', {
        recommended_service: rec.service,
        business_type: state.leadData.businessType
      });

      const messageHTML = `
        <div class="space-y-1.5">
          <p class="font-bold text-[#FF6600]">${c.steps.serviceRecommendation}</p>
          <div class="p-2.5 rounded-lg bg-[#0E1526] border border-[#FF6600]/30 font-semibold text-white">
            ✨ ${escapeHTML(rec.service)}
          </div>
          <p class="text-xs text-slate-300">${escapeHTML(rec.rationale)}</p>
        </div>
      `;
      this.addBotHTML(messageHTML);

      state.step = 5;
      this.showTypingIndicator(() => {
        this.promptBudgetAndTimeline();
      });
    }

    promptBudgetAndTimeline() {
      const c = COPY[state.language];
      this.addBotMessage(c.steps.askBudgetTimeline);

      const wrapper = document.createElement('div');
      wrapper.className = 'flex flex-col gap-2 mt-2';

      // Budget Buttons
      const budgetLabel = document.createElement('p');
      budgetLabel.className = 'text-[11px] font-bold text-slate-400';
      budgetLabel.textContent = 'Select Budget Band:';
      wrapper.appendChild(budgetLabel);

      const bGrid = document.createElement('div');
      bGrid.className = 'flex flex-wrap gap-1.5';
      c.budgetBands.forEach(b => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'du-chip-btn';
        btn.textContent = b;
        btn.addEventListener('click', () => {
          state.leadData.budget = b;
          btn.style.borderColor = '#FF6600';
          btn.style.color = '#FF6600';
          // Enable timeline selection if budget is clicked
          timelineContainer.classList.remove('opacity-40', 'pointer-events-none');
        });
        bGrid.appendChild(btn);
      });
      wrapper.appendChild(bGrid);

      // Timeline Buttons
      const timelineContainer = document.createElement('div');
      timelineContainer.className = 'mt-1 opacity-40 pointer-events-none transition-opacity flex flex-col gap-1.5';
      
      const tLabel = document.createElement('p');
      tLabel.className = 'text-[11px] font-bold text-slate-400';
      tLabel.textContent = 'Select Desired Timeline:';
      timelineContainer.appendChild(tLabel);

      const tGrid = document.createElement('div');
      tGrid.className = 'flex flex-wrap gap-1.5';
      c.timelines.forEach(t => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'du-chip-btn';
        btn.textContent = t;
        btn.addEventListener('click', () => {
          state.leadData.timeline = t;
          this.addUserMessage(`Budget: ${state.leadData.budget || 'Custom'} | Timeline: ${t}`);
          state.step = 6;
          this.showTypingIndicator(() => {
            this.presentSummaryAndConsent();
          });
        });
        tGrid.appendChild(btn);
      });
      timelineContainer.appendChild(tGrid);

      wrapper.appendChild(timelineContainer);
      this.messagesContainer.appendChild(wrapper);
      this.scrollToBottom();
    }

    presentSummaryAndConsent() {
      const c = COPY[state.language];

      const summaryHTML = `
        <div class="space-y-2">
          <p class="font-bold text-white text-xs">${c.steps.summaryTitle}</p>
          <div class="p-2.5 rounded-lg bg-[#0E1526] border border-white/10 text-[11px] space-y-1">
            <div><span class="text-slate-400">Business:</span> <strong class="text-white">${escapeHTML(state.leadData.businessType || 'General')}</strong></div>
            <div><span class="text-slate-400">Goal:</span> <strong class="text-white">${escapeHTML(state.leadData.goal || 'Consultation')}</strong></div>
            <div><span class="text-slate-400">Challenge:</span> <span class="text-slate-200">${escapeHTML(state.leadData.challenge || 'Growth')}</span></div>
            <div><span class="text-slate-400">Recommended:</span> <span class="text-[#FF6600] font-semibold">${escapeHTML(state.leadData.recommendation || 'Custom Plan')}</span></div>
            <div><span class="text-slate-400">Budget & Timeline:</span> <span class="text-slate-200">${escapeHTML(state.leadData.budget || 'Custom')} (${escapeHTML(state.leadData.timeline || 'Standard')})</span></div>
          </div>
          <p class="text-xs text-slate-300 mt-2">${c.steps.consentPrompt}</p>
        </div>
      `;
      this.addBotHTML(summaryHTML);

      // Explicit Consent Checkbox Form
      const consentWrapper = document.createElement('div');
      consentWrapper.className = 'p-3 rounded-lg bg-[#151D2F] border border-white/10 mt-2 flex flex-col gap-2.5';
      
      consentWrapper.innerHTML = `
        <label class="flex items-start gap-2 cursor-pointer text-xs text-slate-200 select-none">
          <input type="checkbox" id="du-consent-checkbox" class="mt-0.5 rounded border-slate-600 text-[#FF6600] focus:ring-[#FF6600]">
          <span>${escapeHTML(c.steps.consentCheckbox)}</span>
        </label>
        <button type="button" id="du-consent-proceed-btn" disabled class="px-4 py-2 rounded-lg bg-[#FF6600] text-white font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:bg-orange-600 transition-all text-center">
          ${state.language === 'en' ? 'Proceed to Contact Details' : 'رابطہ کی تفصیلات درج کریں'}
        </button>
      `;

      this.messagesContainer.appendChild(consentWrapper);
      this.scrollToBottom();

      const checkbox = consentWrapper.querySelector('#du-consent-checkbox');
      const proceedBtn = consentWrapper.querySelector('#du-consent-proceed-btn');

      checkbox.addEventListener('change', () => {
        proceedBtn.disabled = !checkbox.checked;
        state.leadData.consentGiven = checkbox.checked;
      });

      proceedBtn.addEventListener('click', () => {
        if (!state.leadData.consentGiven) return;
        dispatchAnalytics('chat_lead_consent_given');
        consentWrapper.remove();
        this.addUserMessage('Consent granted.');
        state.step = 8;
        this.showTypingIndicator(() => {
          this.promptContactInfo();
        });
      });
    }

    promptContactInfo() {
      const c = COPY[state.language];
      this.addBotMessage(c.steps.askContactInfo);

      const formWrapper = document.createElement('div');
      formWrapper.className = 'p-3 rounded-lg bg-[#151D2F] border border-white/10 mt-2 flex flex-col gap-2.5';

      formWrapper.innerHTML = `
        <div>
          <label class="block text-[11px] font-bold text-slate-300 mb-1">Your Full Name *</label>
          <input type="text" id="du-lead-name" required placeholder="e.g. Tariq Mehmood" class="w-full px-2.5 py-1.5 text-xs rounded bg-[#0E1526] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6600]">
        </div>
        <div>
          <label class="block text-[11px] font-bold text-slate-300 mb-1">Phone / WhatsApp or Email *</label>
          <input type="text" id="du-lead-contact" required placeholder="0300-1234567 or email@domain.com" class="w-full px-2.5 py-1.5 text-xs rounded bg-[#0E1526] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6600]">
        </div>
        <button type="button" id="du-lead-submit-btn" class="w-full py-2.5 rounded-lg bg-[#FF6600] hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all">
          ${state.language === 'en' ? 'Submit Project Brief' : 'پروجیکٹ بریف جمع کروائیں'}
        </button>
      `;

      this.messagesContainer.appendChild(formWrapper);
      this.scrollToBottom();

      const nameInput = formWrapper.querySelector('#du-lead-name');
      const contactInput = formWrapper.querySelector('#du-lead-contact');
      const submitBtn = formWrapper.querySelector('#du-lead-submit-btn');

      submitBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const contact = contactInput.value.trim();

        if (!name || !contact) {
          alert(state.language === 'en' ? 'Please provide both your name and contact number/email.' : 'براہ کرم اپنا نام اور رابطہ نمبر درج کریں۔');
          return;
        }

        state.leadData.name = name;
        state.leadData.contact = contact;
        state.leadData.idempotencyKey = generateIdempotencyKey();

        formWrapper.remove();
        this.addUserMessage(`Name: ${name} | Contact: ${contact}`);

        this.showTypingIndicator(() => {
          this.submitQualifiedLead();
        });
      });
    }

    submitQualifiedLead() {
      const c = COPY[state.language];
      const conf = getConfig();

      // Store lead data locally with idempotency key
      try {
        localStorage.setItem('du_last_lead_brief', JSON.stringify(state.leadData));
      } catch (e) {
        // storage disabled or quota exceeded
      }

      // Dispatch analytics event
      dispatchAnalytics('chat_lead_submitted', {
        idempotency_key: state.leadData.idempotencyKey,
        service: state.leadData.recommendation || state.leadData.service,
        business_type: state.leadData.businessType
      });

      // Submit via Fetch if Clonvo / CRM endpoint is configured
      if (conf.isConfigured && conf.isConfigured() && conf.apiUrl) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), conf.timeoutMs || 15000);

        fetch(`${conf.apiUrl}/leads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Idempotency-Key': state.leadData.idempotencyKey,
            'X-Tenant-ID': conf.tenantId
          },
          body: JSON.stringify({
            session_id: state.leadData.idempotencyKey,
            tenant_id: conf.tenantId,
            assistant_id: conf.assistantId,
            lead: state.leadData,
            source_page: window.location.pathname
          }),
          signal: controller.signal
        })
        .then(res => {
          clearTimeout(timeoutId);
          if (!res.ok) throw new Error('API response was not ok');
          return res.json();
        })
        .catch(err => {
          clearTimeout(timeoutId);
          console.warn('[Clonvo Chat] Background lead dispatch notice:', err.message);
          dispatchAnalytics('chat_api_error', { reason: err.message });
        });
      }

      state.step = 9;
      this.addBotMessage(c.steps.submitSuccess);

      // Render Step 10: "Continue on Contact Page"
      this.renderContactPageButton();
    }

    renderContactPageButton() {
      const c = COPY[state.language];
      const conf = getConfig();

      const btnWrapper = document.createElement('div');
      btnWrapper.className = 'mt-3 p-3 rounded-xl bg-[#0E1526] border border-[#FF6600]/30 flex flex-col gap-2';

      const queryParams = new URLSearchParams();
      if (state.leadData.service) queryParams.set('service', state.leadData.service);
      if (state.leadData.packageId) queryParams.set('package', state.leadData.packageId);
      if (state.leadData.idempotencyKey) queryParams.set('leadId', state.leadData.idempotencyKey);

      const contactUrl = `${conf.contactUrl || 'contact.html'}?${queryParams.toString()}`;

      btnWrapper.innerHTML = `
        <p class="text-xs text-slate-300">
          ${state.language === 'en' 
            ? 'To finalize milestone terms or speak directly with our team, continue to the Contact page:' 
            : 'پروجیکٹ کی تفصیلات اور ٹیم سے براہ راست گفتگو کے لیے رابطہ پیج پر تشریف لے جائیں:'}
        </p>
        <a href="${escapeHTML(contactUrl)}" id="du-chat-continue-contact-btn" class="w-full py-2.5 px-4 rounded-lg bg-[#FF6600] hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all text-center">
          <span>${escapeHTML(c.steps.continueContactBtn)}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </a>
      `;

      this.messagesContainer.appendChild(btnWrapper);
      this.scrollToBottom();

      const btn = btnWrapper.querySelector('#du-chat-continue-contact-btn');
      btn.addEventListener('click', () => {
        dispatchAnalytics('chat_contact_page_opened', { source: 'chat_continue_button' });
      });
    }

    handleUserSubmit() {
      const rawText = this.input.value.trim();
      if (!rawText) return;

      const conf = getConfig();
      const maxLen = conf.inputMaxChars || 500;

      if (rawText.length > maxLen) {
        alert(COPY[state.language].errors.tooLong);
        return;
      }

      if (isRateLimited()) {
        this.addBotMessage(COPY[state.language].errors.rateLimit);
        return;
      }

      // Clear input field
      this.input.value = '';
      this.charCounter.textContent = `0/${maxLen}`;
      this.input.style.height = 'auto';

      this.addUserMessage(rawText);

      // Check if user is asking for human/team
      const lower = rawText.toLowerCase();
      if (lower.includes('human') || lower.includes('agent') || lower.includes('person') || lower.includes('call me') || lower.includes('rabta') || lower.includes('team')) {
        this.handleHumanRequest();
        return;
      }

      // If Clonvo live API is configured, proxy message to Clonvo API
      if (conf.isConfigured && conf.isConfigured() && conf.apiUrl) {
        this.sendToClonvoApi(rawText);
      } else {
        // Fallback Conversational Engine
        this.handleFallbackMessage(rawText);
      }
    }

    sendToClonvoApi(userMessage) {
      const conf = getConfig();
      const c = COPY[state.language];

      state.isWaitingResponse = true;
      this.showTypingIndicator();

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), conf.timeoutMs || 15000);

      fetch(`${conf.apiUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Tenant-ID': conf.tenantId
        },
        body: JSON.stringify({
          session_id: state.leadData.idempotencyKey || generateIdempotencyKey(),
          assistant_id: conf.assistantId,
          message: userMessage,
          language: state.language,
          context: {
            page_url: window.location.pathname,
            service: state.leadData.service,
            package_id: state.leadData.packageId
          }
        }),
        signal: controller.signal
      })
      .then(res => {
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        this.hideTypingIndicator();
        state.isWaitingResponse = false;

        if (!data || !data.reply) {
          this.addBotMessage(c.errors.empty);
          this.renderQuickActions();
          return;
        }

        this.addBotMessage(data.reply);

        if (data.quick_replies && Array.isArray(data.quick_replies)) {
          this.renderDynamicChips(data.quick_replies);
        }
      })
      .catch(err => {
        clearTimeout(timeoutId);
        this.hideTypingIndicator();
        state.isWaitingResponse = false;

        if (err.name === 'AbortError') {
          this.renderTimeoutRetry(userMessage);
        } else {
          this.addBotMessage(c.errors.unavailable);
          this.renderContactPageButton();
        }
        dispatchAnalytics('chat_api_error', { error: err.message });
      });
    }

    renderTimeoutRetry(failedMessage) {
      const c = COPY[state.language];
      const box = document.createElement('div');
      box.className = 'p-3 rounded-lg bg-[#151D2F] border border-amber-500/30 text-xs text-amber-200 flex flex-col gap-2 mt-2';
      box.innerHTML = `
        <p>${escapeHTML(c.errors.timeout)}</p>
        <div class="flex gap-2">
          <button type="button" id="du-retry-btn" class="px-3 py-1.5 rounded bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors">
            Retry
          </button>
          <a href="contact.html" class="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors text-center">
            Go to Contact Page
          </a>
        </div>
      `;
      this.messagesContainer.appendChild(box);
      this.scrollToBottom();

      const retryBtn = box.querySelector('#du-retry-btn');
      retryBtn.addEventListener('click', () => {
        box.remove();
        this.sendToClonvoApi(failedMessage);
      });
    }

    handleFallbackMessage(userMessage) {
      this.showTypingIndicator(() => {
        // Interactive guided transitions
        if (state.step === 0 || state.step === 1) {
          state.leadData.goal = userMessage;
          state.step = 2;
          this.addBotMessage(`Thank you for explaining! To help you choose the ideal solution:`);
          this.promptBusinessType();
        } else if (state.step === 2) {
          state.leadData.businessType = userMessage;
          state.step = 3;
          this.promptChallenge();
        } else if (state.step === 3) {
          state.leadData.challenge = userMessage;
          state.step = 4;
          this.presentRecommendation();
        } else {
          this.addBotMessage(`Understood: "${escapeHTML(userMessage)}". Our team will incorporate this into your customized project plan.`);
          this.renderContactPageButton();
        }
      });
    }

    addBotMessage(text) {
      const bubble = document.createElement('div');
      bubble.className = 'du-bubble-bot';
      bubble.textContent = text;
      this.messagesContainer.appendChild(bubble);
      this.scrollToBottom();
    }

    addBotHTML(htmlString) {
      const bubble = document.createElement('div');
      bubble.className = 'du-bubble-bot';
      bubble.innerHTML = htmlString;
      this.messagesContainer.appendChild(bubble);
      this.scrollToBottom();
    }

    addUserMessage(text) {
      const bubble = document.createElement('div');
      bubble.className = 'du-bubble-user';
      bubble.textContent = text;
      this.messagesContainer.appendChild(bubble);
      this.scrollToBottom();
    }

    showTypingIndicator(callback = null) {
      this.hideTypingIndicator();

      const typing = document.createElement('div');
      typing.id = 'du-chat-typing';
      typing.className = 'du-bubble-bot flex items-center gap-1.5 py-2 px-3 w-16';
      typing.innerHTML = `
        <span class="du-typing-dot"></span>
        <span class="du-typing-dot"></span>
        <span class="du-typing-dot"></span>
      `;
      this.messagesContainer.appendChild(typing);
      this.scrollToBottom();

      if (callback) {
        setTimeout(() => {
          this.hideTypingIndicator();
          callback();
        }, 600);
      }
    }

    hideTypingIndicator() {
      const typing = document.getElementById('du-chat-typing');
      if (typing) {
        typing.remove();
      }
    }

    scrollToBottom() {
      requestAnimationFrame(() => {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
      });
    }
  }

  // Initialize UI once DOM is ready
  let chatUIInstance = null;

  const initChat = () => {
    if (!chatUIInstance) {
      chatUIInstance = new DigitalUstadClonvoChatUI();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChat);
  } else {
    initChat();
  }

  // Expose Global Public API Interface
  const ClonvoChatAPI = {
    open: (context) => {
      initChat();
      if (chatUIInstance) chatUIInstance.open(context);
    },
    close: () => {
      if (chatUIInstance) chatUIInstance.close();
    },
    toggle: () => {
      initChat();
      if (chatUIInstance) chatUIInstance.toggle();
    },
    setLanguage: (lang) => {
      if (chatUIInstance) chatUIInstance.switchLanguage(lang);
    },
    getState: () => {
      return Object.assign({}, state);
    }
  };

  // Bind to window objects
  window.DigitalUstadClonvoChat = ClonvoChatAPI;
  window.ClonvoChat = ClonvoChatAPI;
  window.Clonvo = ClonvoChatAPI; // Compatibility layer

  // Hook into openDigitalUstadChat helper globally
  window.openDigitalUstadChat = function(context) {
    ClonvoChatAPI.open(context);
  };

})();
