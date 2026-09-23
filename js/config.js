/**
 * Digital Ustad - Central Brand Configuration & Source of Truth
 * 
 * IMPORTANT COMPLIANCE NOTICE (QA-01):
 * Production contact number requires explicit business owner verification.
 * Do NOT invent or guess replacement phone numbers.
 * 
 * This file is the SINGLE SOURCE OF TRUTH for all contact channels:
 * Updating this configuration automatically regenerates every WhatsApp link,
 * telephone link, and public contact display reference across the entire website.
 */

const DU_CONFIG = {
  // Operational Digital Ustad WhatsApp Business Number (E.164 format without +)
  // Owner-verified number to be placed here. Default maintained until owner confirmation:
  whatsappNumber: '923000000000',

  // Formatted telephone number for tel: links
  telPhone: '+923000000000',

  // Human-readable formatted phone for public display
  displayPhone: '+92 300 0000000',

  // Official communications
  officialEmail: 'contact@digitalustad.co',
  officeLocation: 'Lahore, Punjab, Pakistan',

  // Verified baseline credentials
  verifiedWebsites: '10+',
  verifiedClients: '5+',
  yearsActive: '2+',

  // Service payment terms mapping for forms and WhatsApp draft messages (QA-08)
  paymentTerms: {
    // 1. Web Development Packages
    'lite': {
      serviceKey: 'lite',
      title: '3-Page Website Lite',
      badge: '100% Upfront (5% Off)',
      badgeClass: 'bg-emerald-100 text-emerald-800',
      note: 'Payment Milestones: 100% advance on kickoff. Single-batch delivery within 5–7 days. (5% early-payment discount applies).',
      draftTerms: '100% Upfront Advance (with 5% early discount)'
    },
    'starter': {
      serviceKey: 'starter',
      title: '5-Page Website Starter',
      badge: '25/50/25 Flex Installments',
      badgeClass: 'bg-orange-100 text-orange-800',
      note: 'Payment Milestones: 25% kickoff, 50% approval on staging, 25% within 30 days of launch.',
      draftTerms: '25/50/25 Flex Installments (25% kickoff, 50% staging approval, 25% in 30 days)'
    },
    'growthWeb': {
      serviceKey: 'growthWeb',
      title: '7-Page Website Growth',
      badge: '25/50/25 Flex Installments',
      badgeClass: 'bg-orange-100 text-orange-800',
      note: 'Payment Milestones: 25% kickoff, 50% approval on staging, 25% within 30 days of launch.',
      draftTerms: '25/50/25 Flex Installments (25% kickoff, 50% staging approval, 25% in 30 days)'
    },
    'customWeb': {
      serviceKey: 'customWeb',
      title: 'Custom Web / E-Commerce / Web App',
      badge: '25/50/25 Milestones (Deployment Final)',
      badgeClass: 'bg-blue-100 text-blue-800',
      note: 'Payment Milestones: 25% kickoff, 50% staging demo approval, 25% at final launch & deployment.',
      draftTerms: '25/50/25 Milestone Plan (25% kickoff, 50% staging demo, 25% at final launch/deployment)'
    },

    // 2. WhatsApp Automation Packages
    'basicBot': {
      serviceKey: 'basicBot',
      title: 'Basic WhatsApp Bot',
      badge: '50/50 Milestones',
      badgeClass: 'bg-purple-100 text-purple-800',
      note: 'Payment Milestones: 50% kickoff, 50% upon live signoff & handover.',
      draftTerms: '50/50 Milestone Plan (50% kickoff, 50% upon live signoff/handover)'
    },
    'growthBot': {
      serviceKey: 'growthBot',
      title: 'Growth WhatsApp Workflow',
      badge: '25/50/25 Milestones (Live Final)',
      badgeClass: 'bg-orange-100 text-orange-800',
      note: 'Payment Milestones: 25% kickoff, 50% staging demo, 25% at final live launch.',
      draftTerms: '25/50/25 Milestone Plan (25% kickoff, 50% staging demo, 25% at live launch)'
    },
    'advancedBot': {
      serviceKey: 'advancedBot',
      title: 'Advanced AI & Custom API Bot',
      badge: '25/50/25 Milestones (Live Final)',
      badgeClass: 'bg-indigo-100 text-indigo-800',
      note: 'Payment Milestones: 25% kickoff, 50% staging demo, 25% upon final live deployment.',
      draftTerms: '25/50/25 Milestone Plan (25% kickoff, 50% staging demo, 25% upon live deployment)'
    },

    // 3. Digital Marketing Retainers
    'seoRetainer': {
      serviceKey: 'seoRetainer',
      title: 'SEO & Google Business',
      badge: 'Advance Monthly Retainer',
      badgeClass: 'bg-emerald-100 text-emerald-800',
      note: 'Payment Milestones: Advance monthly retainer (100% at start of each monthly cycle). No lock-in contract.',
      draftTerms: 'Advance Monthly Retainer (100% at start of monthly cycle)'
    },
    'socialRetainer': {
      serviceKey: 'socialRetainer',
      title: 'Social Media Management',
      badge: 'Advance Monthly Retainer',
      badgeClass: 'bg-emerald-100 text-emerald-800',
      note: 'Payment Milestones: Advance monthly retainer (100% at start of each monthly cycle).',
      draftTerms: 'Advance Monthly Retainer (100% at start of monthly cycle)'
    },
    'adsRetainer': {
      serviceKey: 'adsRetainer',
      title: 'Meta & Google Ads Management',
      badge: 'Advance Monthly Retainer',
      badgeClass: 'bg-emerald-100 text-emerald-800',
      note: 'Payment Milestones: Advance management fee only. Ad spend billed directly to client debit/credit card.',
      draftTerms: 'Advance Monthly Retainer (Ad spend direct to client card)'
    },
    'allInOneBundle': {
      serviceKey: 'allInOneBundle',
      title: 'All-in-One Growth Bundle',
      badge: 'Advance Monthly Retainer',
      badgeClass: 'bg-amber-100 text-amber-800',
      note: 'Payment Milestones: Advance monthly billing (100% at start of each 30-day growth cycle).',
      draftTerms: 'Advance Monthly Retainer (100% at cycle start)'
    },

    // 4. Graphic Design
    'designRetainer': {
      serviceKey: 'designRetainer',
      title: 'Graphic Design Retainer',
      badge: 'Advance Monthly Retainer',
      badgeClass: 'bg-emerald-100 text-emerald-800',
      note: 'Payment Milestones: Advance monthly creative retainer for continuous design assets.',
      draftTerms: 'Advance Monthly Creative Retainer'
    },
    'designProject': {
      serviceKey: 'designProject',
      title: 'Per-Project Graphic Design / Branding',
      badge: '50/50 Milestones',
      badgeClass: 'bg-purple-100 text-purple-800',
      note: 'Payment Milestones: 50% deposit on kickoff, 50% upon final creative delivery.',
      draftTerms: '50/50 Milestone Plan (50% kickoff deposit, 50% upon final delivery)'
    }
  },

  // Clonvo.chat Webchat Integration Layer (QA-05)
  // Exclusive website chat layer ("Digital Ustad Assistant")
  clonvo: {
    enabled: true,
    assistantName: 'Digital Ustad Assistant',
    attribution: 'Powered by Clonvo.chat',
    privacyUrl: 'privacy.html',
    contactUrl: 'contact.html',

    // Security & Client Configuration Boundary:
    // Production credentials must be supplied by the business owner.
    // Read from window variables or build environment. Secret API keys are strictly disallowed.
    apiUrl: (typeof window !== 'undefined' && window.CLONVO_API_URL) || '',
    tenantId: (typeof window !== 'undefined' && window.CLONVO_TENANT_ID) || '',
    assistantId: (typeof window !== 'undefined' && window.CLONVO_ASSISTANT_ID) || '',
    publicKey: (typeof window !== 'undefined' && window.CLONVO_PUBLIC_KEY) || '',
    embedUrl: (typeof window !== 'undefined' && window.CLONVO_EMBED_URL) || '',
    leadEndpoint: (typeof window !== 'undefined' && window.CLONVO_LEAD_ENDPOINT) || '',

    // Rate Limiting & Reliability Parameters
    rateLimit: {
      maxRequests: 5,
      windowMs: 10000 // 5 messages per 10 seconds
    },
    inputMaxChars: 500,
    timeoutMs: 15000,
    retryAttempts: 2,
    defaultLanguage: 'en', // 'en' (English) or 'ur' (Roman Urdu)

    // Configuration status check helper
    isConfigured: function() {
      return Boolean(this.apiUrl && this.tenantId && this.assistantId);
    }
  },

  // ============================================================================
  // CANONICAL COMMERCIAL SOURCE OF TRUTH (QA-COMMERCIAL-01)
  // Single Source of Truth for Prices, Installments, Timelines, Revisions,
  // Support Terms, Care Requirements, and Unresolved Business Decisions.
  // ============================================================================
  commercial: {
    // --------------------------------------------------------------------------
    // 1. OWNER DECISIONS REQUIRED CATALOG
    // Every conflicting policy or ambiguous value is cataloged here.
    // When the owner approves a decision, updating this source updates all logic.
    // --------------------------------------------------------------------------
    ownerDecisionsRequired: {
      growthPriceArithmetic: {
        id: 'DECISION_GROWTH_PRICE',
        title: '7-Page Growth Package Arithmetic Discrepancy',
        issue: 'Advertised headline price is PKR 42,999, while the visible 25/50/25 installments (PKR 10,750 + 21,500 + 10,750) sum to PKR 43,000.',
        advertisedPrice: 42999,
        installmentSum: 43000,
        installments: { kickoff: 10750, approval: 21500, final30Day: 10750 },
        status: 'OWNER DECISION REQUIRED',
        options: [
          'Option A: Set advertised total to PKR 43,000 (aligns perfectly with 10,750 + 21,500 + 10,750)',
          'Option B: Keep advertised total at PKR 42,999 and adjust installment rounding (e.g., 10,750 + 21,499 + 10,750 = 42,999)'
        ]
      },
      growthDeliveryTimeline: {
        id: 'DECISION_GROWTH_TIMELINE',
        title: '7-Page Growth Package Delivery Timeline Conflict',
        issue: 'Pricing page states 12–15 working days; Terms of Service states 10–14 working days.',
        pricingPageTimeline: '12–15 working days',
        termsPageTimeline: '10–14 working days',
        currentCanonical: '10–14 working days', // Primary baseline pending approval
        status: 'OWNER DECISION REQUIRED',
        options: ['10–14 working days', '12–15 working days']
      },
      retainerCancellation: {
        id: 'DECISION_RETAINER_CANCELLATION',
        title: 'Monthly Retainer Cancellation & Commitment Term Conflicts',
        issue: 'Social Media mentions 15-day exit flexibility; Refund Policy says 7 days notice prior to billing date with no lock-in; SEO specifies 3-month commitment; Terms states advance monthly with no lock-in.',
        socialMediaNotice: '15-day exit flexibility',
        refundPolicyNotice: '7 days written notice prior to next monthly billing',
        seoCommitment: '3-month commitment',
        status: 'OWNER DECISION REQUIRED',
        options: [
          'Option A: Standardize all retainers to advance monthly billing with 7 days written notice prior to renewal; clarify SEO 3-month as recommended minimum duration for organic results.',
          'Option B: Tiered policies: SEO requires strict 3-month lock-in; Social Media requires 15-day notice; Ads/GBP require 7-day notice.'
        ]
      },
      liteUpfrontDiscount: {
        id: 'DECISION_LITE_DISCOUNT',
        title: '3-Page Lite 5% Upfront Early Discount Discrepancy',
        issue: 'Terms states 5% upfront discount applies to Lite package; Pricing card displays PKR 17,999 as full kickoff amount without showing calculated discounted payable.',
        advertisedPrice: 17999,
        discountPercent: 5,
        calculatedDiscountedPrice: 17099, // 17,999 * 0.95 = 17,099.05 rounded
        status: 'OWNER DECISION REQUIRED',
        options: [
          'Option A: PKR 17,999 is standard gross price; payable with 5% early discount is PKR 17,099',
          'Option B: PKR 17,999 is already the net discounted price'
        ]
      },
      taxTreatment: {
        id: 'DECISION_TAX_TREATMENT',
        title: 'Provincial Sales Tax (PRA / SRB / WHT) Policy',
        issue: 'Tax inclusion or exclusion is not defined across any public page or contract.',
        status: 'OWNER DECISION REQUIRED',
        options: [
          'All quoted prices are exclusive of provincial sales tax (PRA) where applicable',
          'All quoted prices are net payable'
        ]
      },
      domainRegistration: {
        id: 'DECISION_DOMAIN_REGISTRATION',
        title: 'Domain Registration Ownership Policy',
        issue: 'Package cards do not explicitly specify whether .com / .pk domain purchase is included or client-provided.',
        status: 'OWNER DECISION REQUIRED',
        options: [
          'Domain registration is client-owned and excluded (client provides or pays registrar cost)',
          'First year standard .com domain included in multi-page packages'
        ]
      }
    },

    // --------------------------------------------------------------------------
    // 2. CANONICAL COMMERCIAL RULES & DISCLOSURES
    // --------------------------------------------------------------------------
    rules: {
      websiteCare: {
        monthlyFee: 3000,
        currency: 'PKR',
        title: 'Website Care & Managed Cloud Hosting',
        scope: 'Ultra-fast cloud hosting, 99.9% uptime monitoring, SSL certificate, weekly automated backups, and 2 minor monthly edits.',
        flexCondition: 'Mandatory during active Flex installment window (until 30-day final balance is settled). Optional thereafter.'
      },
      adSpend: {
        policy: 'Excluded from Digital Ustad management fees. Client pays media ad spend directly to Meta or Google via client debit/credit card.',
        setupFees: {
          meta: 5000,
          google: 6000,
          waiverCondition: 'Waived with 3-month upfront commitment.'
        }
      },
      whatsappMetaFees: {
        policy: 'Official Meta Cloud API conversation charges are paid directly to Meta via credit card linked to client Meta Business Manager account.',
        serverMaintenance: 'Cloud hosting & bot webhook maintenance available at PKR 3,000 – 5,000 / month (or client self-hosted).'
      },
      revisions: {
        lite: '2 revision rounds included',
        starter: '3 revision rounds included',
        growth: '4 revision rounds included',
        scope: 'Text adjustments, image swaps, layout tweaks, and color styling. Substantial scope additions quoted separately.'
      },
      supportWarranty: {
        lite: '7 days launch technical bugfix support',
        starter: '14 days handover support & minor adjustments',
        growth: '30 days full technical support included'
      }
    },

    // --------------------------------------------------------------------------
    // 3. CANONICAL PACKAGE CATALOG
    // --------------------------------------------------------------------------
    packages: {
      // --- Web Development ---
      'web-lite': {
        id: 'web-lite',
        name: '3-Page Website Lite',
        category: 'Web Development',
        price: 17999,
        priceFormatted: 'PKR 17,999',
        billingType: '100% Upfront Advance',
        deliveryTimeline: '5–7 working days',
        revisions: '2 revision rounds',
        supportWarranty: '7 days post-launch bugfix support',
        installments: null,
        upfrontDiscount: '5% early-payment discount applies (Decision pending whether 17,999 is gross or net)',
        mandatoryCare: false,
        careFee: 3000
      },
      'web-starter': {
        id: 'web-starter',
        name: '5-Page Website Starter',
        category: 'Web Development',
        price: 30000,
        priceFormatted: 'PKR 30,000',
        billingType: '25/50/25 Flex Installments',
        deliveryTimeline: '7–10 working days',
        revisions: '3 revision rounds',
        supportWarranty: '14 days post-launch support',
        installments: [
          { phase: 'Kickoff (25%)', amount: 7500, amountFormatted: 'PKR 7,500' },
          { phase: 'Staging Approval (50%)', amount: 15000, amountFormatted: 'PKR 15,000' },
          { phase: '30-Day Post-Launch (25%)', amount: 7500, amountFormatted: 'PKR 7,500' }
        ],
        upfrontDiscount: '5% Discount for 100% Upfront (PKR 28,500)',
        mandatoryCare: true,
        careFee: 3000,
        careCondition: 'Mandatory during active Flex installment window. Optional thereafter.'
      },
      'web-growth': {
        id: 'web-growth',
        name: '7-Page Website Growth',
        category: 'Web Development',
        price: 42999,
        priceFormatted: 'PKR 42,999',
        priceNote: 'Pending owner approval on 42,999 vs 43,000 arithmetic alignment',
        billingType: '25/50/25 Flex Installments',
        deliveryTimeline: '10–14 working days',
        deliveryTimelineNote: 'Pending owner approval on 10–14 vs 12–15 working days',
        revisions: '4 revision rounds',
        supportWarranty: '30 days full technical support',
        installments: [
          { phase: 'Kickoff (25%)', amount: 10750, amountFormatted: 'PKR 10,750' },
          { phase: 'Staging Approval (50%)', amount: 21500, amountFormatted: 'PKR 21,500' },
          { phase: '30-Day Post-Launch (25%)', amount: 10750, amountFormatted: 'PKR 10,750' }
        ],
        upfrontDiscount: '5% Discount for 100% Upfront (PKR 40,850 calculated from 43k)',
        mandatoryCare: true,
        careFee: 3000,
        careCondition: 'Mandatory during active Flex installment window. Optional thereafter.'
      },
      'web-custom': {
        id: 'web-custom',
        name: 'Custom Web / E-Commerce / Web App',
        category: 'Web Development',
        price: 75000,
        priceFormatted: 'PKR 75,000+',
        billingType: '25/50/25 Milestones (Deployment Final)',
        deliveryTimeline: '15–20 working days (3–4 weeks)',
        revisions: 'Quoted per proposal (typically 4–6 rounds)',
        supportWarranty: '30–60 days post-launch warranty',
        installments: [
          { phase: 'Kickoff (25%)', amount: '25%' },
          { phase: 'Staging Demo Approval (50%)', amount: '50%' },
          { phase: 'Final Live Deployment (25%)', amount: '25%' }
        ]
      },

      // --- WhatsApp Automation ---
      'whatsapp-basic': {
        id: 'whatsapp-basic',
        name: 'Basic WhatsApp Bot',
        category: 'WhatsApp Automation',
        priceRange: 'PKR 25,000 – 35,000',
        billingType: '50/50 Milestones',
        deliveryTimeline: '5–7 working days',
        revisions: '2 rounds flow adjustments',
        supportWarranty: '14 days handover support',
        installments: [
          { phase: 'Kickoff (50%)', amount: '50%' },
          { phase: 'Live Signoff & Handover (50%)', amount: '50%' }
        ],
        operationalNote: 'Hosting PKR 3k–5k/mo; Meta API conversation charges direct to Meta.'
      },
      'whatsapp-growth': {
        id: 'whatsapp-growth',
        name: 'Growth WhatsApp Workflow',
        category: 'WhatsApp Automation',
        priceRange: 'PKR 45,000 – 65,000',
        billingType: '25/50/25 Milestones',
        deliveryTimeline: '10–14 working days',
        revisions: '3 rounds conversational flow adjustments',
        supportWarranty: '30 days post-launch support',
        installments: [
          { phase: 'Kickoff (25%)', amount: '25%' },
          { phase: 'Staging Demo (50%)', amount: '50%' },
          { phase: 'Live Launch (25%)', amount: '25%' }
        ],
        operationalNote: 'Hosting PKR 3k–5k/mo; Meta API conversation charges direct to Meta.'
      },
      'whatsapp-advanced': {
        id: 'whatsapp-advanced',
        name: 'Advanced AI & Custom API Bot',
        category: 'WhatsApp Automation',
        price: 75000,
        priceFormatted: 'PKR 75,000+',
        billingType: '25/50/25 Milestones',
        deliveryTimeline: '2–3 weeks',
        revisions: 'Defined per technical specification',
        supportWarranty: '30 days full warranty',
        installments: [
          { phase: 'Kickoff (25%)', amount: '25%' },
          { phase: 'Staging Demo (50%)', amount: '50%' },
          { phase: 'Final Live Deployment (25%)', amount: '25%' }
        ],
        operationalNote: 'Hosting PKR 3k–5k/mo; Meta API conversation charges direct to Meta.'
      },

      // --- Digital Marketing Retainers ---
      'seo-local': {
        id: 'seo-local',
        name: 'Local SEO',
        category: 'SEO & Local Search',
        price: 15000,
        priceFormatted: 'PKR 15,000/mo',
        billingType: 'Advance Monthly Retainer',
        commitment: '3-Month Recommended / Minimum (Pending policy harmonization)',
        cancellation: '7 days written notice prior to monthly renewal (No lock-in contracts)'
      },
      'seo-growth': {
        id: 'seo-growth',
        name: 'Growth SEO',
        category: 'SEO & Local Search',
        price: 25000,
        priceFormatted: 'PKR 25,000/mo',
        billingType: 'Advance Monthly Retainer',
        commitment: '3-Month Recommended / Minimum (Pending policy harmonization)',
        cancellation: '7 days written notice prior to monthly renewal'
      },
      'seo-authority': {
        id: 'seo-authority',
        name: 'Authority SEO',
        category: 'SEO & Local Search',
        price: 40000,
        priceFormatted: 'PKR 40,000/mo',
        billingType: 'Advance Monthly Retainer',
        commitment: '3-Month Recommended / Minimum (Pending policy harmonization)',
        cancellation: '7 days written notice prior to monthly renewal'
      },
      'gbp-setup': {
        id: 'gbp-setup',
        name: 'Google Business Profile Setup & Audit',
        category: 'SEO & Local Search',
        price: 8000,
        priceFormatted: 'PKR 8,000',
        billingType: 'One-Time 100% Upfront'
      },
      'gbp-management': {
        id: 'gbp-management',
        name: 'Google Business Profile Monthly Management',
        category: 'SEO & Local Search',
        price: 4000,
        priceFormatted: 'PKR 4,000/mo',
        billingType: 'Advance Monthly Retainer'
      },
      'social-basic': {
        id: 'social-basic',
        name: 'Basic Social Media',
        category: 'Social Media Management',
        price: 18000,
        priceFormatted: 'PKR 18,000/mo',
        billingType: 'Advance Monthly Retainer',
        cancellation: '7 days written notice prior to renewal (15-day exit flexibility mentioned on service page)'
      },
      'social-growth': {
        id: 'social-growth',
        name: 'Growth Social Media',
        category: 'Social Media Management',
        price: 32000,
        priceFormatted: 'PKR 32,000/mo',
        billingType: 'Advance Monthly Retainer',
        cancellation: '7 days written notice prior to renewal'
      },
      'social-pro': {
        id: 'social-pro',
        name: 'Pro Social Media',
        category: 'Social Media Management',
        price: 50000,
        priceFormatted: 'PKR 50,000/mo',
        billingType: 'Advance Monthly Retainer',
        cancellation: '7 days written notice prior to renewal'
      },
      'ads-starter': {
        id: 'ads-starter',
        name: 'Starter Meta & Google Ads',
        category: 'Paid Advertising',
        price: 15000,
        priceFormatted: 'PKR 15,000/mo',
        billingType: 'Advance Monthly Management Fee',
        adSpendRule: 'Media spend paid directly to ad networks via client card'
      },
      'ads-growth': {
        id: 'ads-growth',
        name: 'Growth Meta & Google Ads',
        category: 'Paid Advertising',
        price: 28000,
        priceFormatted: 'PKR 28,000/mo',
        billingType: 'Advance Monthly Management Fee',
        adSpendRule: 'Media spend paid directly to ad networks via client card'
      },
      'ads-scale': {
        id: 'ads-scale',
        name: 'Scale Meta & Google Ads',
        category: 'Paid Advertising',
        price: 45000,
        priceFormatted: 'PKR 45,000/mo',
        billingType: 'Advance Monthly Management Fee',
        adSpendRule: 'Media spend paid directly to ad networks via client card'
      },

      // --- Graphic Design & Brand Identity ---
      'design-starter': {
        id: 'design-starter',
        name: 'Starter Brand Identity',
        category: 'Graphic Design',
        price: 12000,
        priceFormatted: 'PKR 12,000',
        billingType: '50% Deposit / 50% Final Delivery'
      },
      'design-standard': {
        id: 'design-standard',
        name: 'Standard Brand Identity',
        category: 'Graphic Design',
        price: 22000,
        priceFormatted: 'PKR 22,000',
        billingType: '50% Deposit / 50% Final Delivery'
      },
      'design-suite': {
        id: 'design-suite',
        name: 'Full Brand Suite',
        category: 'Graphic Design',
        price: 38000,
        priceFormatted: 'PKR 38,000',
        billingType: '50% Deposit / 50% Final Delivery'
      },
      'design-retainer': {
        id: 'design-retainer',
        name: 'Monthly Graphic Design Retainer',
        category: 'Graphic Design',
        price: 25000,
        priceFormatted: 'PKR 25,000/mo',
        billingType: 'Advance Monthly Retainer'
      },

      // --- Website Care & Hosting ---
      'website-care': {
        id: 'website-care',
        name: 'Website Care & Managed Cloud Hosting',
        category: 'Infrastructure & Care',
        price: 3000,
        priceFormatted: 'PKR 3,000/mo',
        billingType: 'Monthly Advance',
        scope: 'Ultra-fast cloud hosting, 99.9% uptime monitoring, SSL certificate, weekly automated cloud backups, 2 minor monthly edits.',
        flexRequirement: 'Mandatory during active Flex installment window (PKR 3,000/mo). Optional thereafter.'
      }
    }
  }
};

// Global export for browser environment
if (typeof window !== 'undefined') {
  window.DU_CONFIG = DU_CONFIG;
}

// Module export if consumed in Node.js tooling/tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DU_CONFIG;
}
