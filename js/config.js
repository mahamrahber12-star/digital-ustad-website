/**
 * Digital Ustad - Central Brand Configuration & Source of Truth
 * 
 * COMMERCIAL & CONTACT SOURCE OF TRUTH:
 * - Production contact number requires explicit business owner verification.
 * - When unverified, contact channels are left empty so the UI safely hides them.
 * - Once supplied, inserting the verified number here activates contact elements site-wide.
 */

const DU_CONFIG = {
  // ============================================================================
  // SINGLE SOURCE OF TRUTH — GLOBAL BUSINESS CONFIGURATION
  // ============================================================================
  businessName: 'Digital Ustad',
  businessEmail: 'contact@digitalustad.co',
  // Insert verified business number here once supplied by owner (e.g. '+92 300 0000000')
  businessPhone: '', 
  // Operational WhatsApp Business Number in E.164 format without + (e.g. '923XXXXXXXXX')
  whatsappNumber: '', 
  businessLocation: 'Lahore, Punjab, Pakistan',
  workingHours: 'Monday – Saturday: 9:00 AM – 9:00 PM (PKT)',
  websiteURL: 'https://digitalustad.co/',

  // Backwards-compatibility aliases
  telPhone: '',
  displayPhone: '',
  officialEmail: 'contact@digitalustad.co',
  officeLocation: 'Lahore, Punjab, Pakistan',

  // Conservative Business Metrics (Task 6)
  verifiedWebsites: '10+',
  verifiedWebsitesText: '10+ Websites Delivered',
  activePartnerships: '5+',
  activePartnershipsText: '5+ Active Growth Partnerships',
  verifiedClients: '5+',
  yearsActive: '2+',
  yearsExperienceText: '2+ Years Experience',
  supportLocation: 'Pakistan-Based Support',

  // Service payment terms mapping for forms and modal workflows
  paymentTerms: {
    // 1. Web Development Packages
    'lite': {
      serviceKey: 'lite',
      title: '3-Page Website Lite',
      badge: '100% Upfront (5% Off)',
      badgeClass: 'bg-emerald-100 text-emerald-800',
      note: 'Payment Milestones: 100% advance on kickoff. Single-batch delivery within 5–7 days. 5% early-payment discount applies: PKR 17,099 payable upfront.',
      draftTerms: '100% Upfront Advance (PKR 17,099 with 5% discount)'
    },
    'starter': {
      serviceKey: 'starter',
      title: '5-Page Website Starter',
      badge: '40/30/30 Milestones',
      badgeClass: 'bg-orange-100 text-orange-800',
      note: 'Payment Milestones: 40% project kickoff (PKR 12,000), 30% after design/development approval milestone (PKR 9,000), 30% before final handover / deployment completion (PKR 9,000). 5% discount for 100% upfront (PKR 28,500).',
      draftTerms: '40/30/30 Milestone Plan (PKR 12,000 / 9,000 / 9,000)'
    },
    'growthWeb': {
      serviceKey: 'growthWeb',
      title: '7-Page Website Growth',
      badge: '40/30/30 Milestones',
      badgeClass: 'bg-orange-100 text-orange-800',
      note: 'Payment Milestones: 40% project kickoff (PKR 17,200), 30% after design/development approval milestone (PKR 12,900), 30% before final handover / deployment completion (PKR 12,899). 5% discount for 100% upfront (PKR 40,849).',
      draftTerms: '40/30/30 Milestone Plan (PKR 17,200 / 12,900 / 12,899)'
    },
    'customWeb': {
      serviceKey: 'customWeb',
      title: 'Custom Web / E-Commerce / Web App',
      badge: '40/30/30 Milestones (Deployment Final)',
      badgeClass: 'bg-blue-100 text-blue-800',
      note: 'Payment Milestones: 40% project kickoff, 30% after design/development approval milestone, 30% before final handover / deployment completion.',
      draftTerms: '40/30/30 Milestone Plan (40% kickoff, 30% approval milestone, 30% final handover/deployment)'
    },

    // 2. WhatsApp Automation Packages
    'basicBot': {
      serviceKey: 'basicBot',
      title: 'Basic WhatsApp Bot',
      badge: '40/30/30 Milestones',
      badgeClass: 'bg-purple-100 text-purple-800',
      note: 'Payment Milestones: 40% kickoff, 30% staging demo/approval, 30% upon live signoff & handover.',
      draftTerms: '40/30/30 Milestone Plan (40% kickoff, 30% approval, 30% handover)'
    },
    'growthBot': {
      serviceKey: 'growthBot',
      title: 'Growth WhatsApp Workflow',
      badge: '40/30/30 Milestones (Live Final)',
      badgeClass: 'bg-orange-100 text-orange-800',
      note: 'Payment Milestones: 40% project kickoff, 30% staging demo/approval, 30% at final live launch.',
      draftTerms: '40/30/30 Milestone Plan (40% kickoff, 30% staging demo, 30% at live launch)'
    },
    'advancedBot': {
      serviceKey: 'advancedBot',
      title: 'Advanced AI & Custom API Bot',
      badge: '40/30/30 Milestones (Live Final)',
      badgeClass: 'bg-indigo-100 text-indigo-800',
      note: 'Payment Milestones: 40% project kickoff, 30% staging demo/approval, 30% upon final live deployment.',
      draftTerms: '40/30/30 Milestone Plan (40% kickoff, 30% staging demo, 30% upon live deployment)'
    },

    // 3. Digital Marketing Retainers
    'seoRetainer': {
      serviceKey: 'seoRetainer',
      title: 'SEO & Google Business',
      badge: 'Advance Monthly Retainer',
      badgeClass: 'bg-emerald-100 text-emerald-800',
      note: 'Payment Milestones: Advance monthly retainer (100% at start of each monthly cycle). 3-month recommended horizon, no lock-in contract. Cancellation: at least 7 days before the next billing date.',
      draftTerms: 'Advance Monthly Retainer (3-Month Recommended Horizon, No Lock-In)'
    },
    'socialRetainer': {
      serviceKey: 'socialRetainer',
      title: 'Social Media Management',
      badge: 'Advance Monthly Retainer',
      badgeClass: 'bg-emerald-100 text-emerald-800',
      note: 'Payment Milestones: Advance monthly retainer (100% at start of each monthly cycle). Cancellation: at least 7 days before the next billing date.',
      draftTerms: 'Advance Monthly Retainer (100% at start of monthly cycle)'
    },
    'adsRetainer': {
      serviceKey: 'adsRetainer',
      title: 'Meta & Google Ads Management',
      badge: 'Advance Monthly Retainer',
      badgeClass: 'bg-emerald-100 text-emerald-800',
      note: 'Payment Milestones: Advance management fee only. Ad spend billed directly to client debit/credit card. Cancellation: at least 7 days before the next billing date.',
      draftTerms: 'Advance Monthly Retainer (Ad spend direct to client card)'
    },
    'allInOneBundle': {
      serviceKey: 'allInOneBundle',
      title: 'All-in-One Growth Bundle',
      badge: 'Advance Monthly Retainer',
      badgeClass: 'bg-amber-100 text-amber-800',
      note: 'Payment Milestones: Advance monthly billing (100% at start of each 30-day growth cycle). Cancellation: at least 7 days before the next billing date.',
      draftTerms: 'Advance Monthly Retainer (100% at cycle start)'
    },

    // 4. Graphic Design
    'designRetainer': {
      serviceKey: 'designRetainer',
      title: 'Graphic Design Retainer',
      badge: 'Advance Monthly Retainer',
      badgeClass: 'bg-emerald-100 text-emerald-800',
      note: 'Payment Milestones: Advance monthly creative retainer for continuous design assets. Cancellation: at least 7 days before the next billing date.',
      draftTerms: 'Advance Monthly Creative Retainer'
    },
    'designProject': {
      serviceKey: 'designProject',
      title: 'Per-Project Graphic Design / Branding',
      badge: '40/30/30 Milestones',
      badgeClass: 'bg-purple-100 text-purple-800',
      note: 'Payment Milestones: 40% kickoff deposit, 30% design review & approval milestone, 30% upon final creative delivery.',
      draftTerms: '40/30/30 Milestone Plan (40% kickoff deposit, 30% approval milestone, 30% upon final delivery)'
    }
  },

  // Webchat Integration Configuration Layer ("Digital Ustad Assistant")
  clonvo: {
    // Inactive until verified production credentials & embed documentation are provided by business owner
    enabled: false,
    assistantName: 'Digital Ustad Assistant',
    attribution: 'Powered by Clonvo.chat',
    privacyUrl: 'privacy.html',
    contactUrl: 'contact.html',

    // Strict Allowed Origins
    allowedOrigins: [
      'https://digitalustad.co',
      'https://www.digitalustad.co'
    ],

    // Client Configuration Boundary (No secrets in browser JS):
    apiUrl: (typeof window !== 'undefined' && window.CLONVO_API_URL) || '',
    tenantId: (typeof window !== 'undefined' && window.CLONVO_TENANT_ID) || '',
    assistantId: (typeof window !== 'undefined' && window.CLONVO_ASSISTANT_ID) || '',
    publicKey: (typeof window !== 'undefined' && window.CLONVO_PUBLIC_KEY) || '',
    embedUrl: (typeof window !== 'undefined' && window.CLONVO_EMBED_URL) || '',

    // Verification helper
    isConfigured: function() {
      return Boolean(this.enabled && (this.embedUrl || (this.apiUrl && this.tenantId && this.assistantId)));
    }
  },

  // ============================================================================
  // CENTRAL COMMERCIAL SOURCE OF TRUTH
  // Canonical reference for prices, installments, upfront prices,
  // delivery timelines, cancellation wording, SEO horizon, and discount rules.
  // ============================================================================
  commercial: {
    // 1. Core Policies & Ground Rules
    policies: {
      retainerCancellation: {
        rule: 'At least 7 days before the next billing date',
        fullNotice: 'You may cancel or pause your retainer at any time by providing written notice at least 7 days before the next billing date.',
        lockIn: false
      },
      seo: {
        recommendedHorizon: '3-month recommended horizon',
        lockIn: false,
        noticeRule: 'At least 7 days before the next billing date',
        description: 'For organic SEO campaigns, a 3-month recommended horizon is advised because search engine indexing requires progressive authority accumulation. Operates with zero lock-in contracts.'
      },
      discountRules: {
        upfrontStandardDiscountPercent: 5,
        roundingRule: 'whole-rupee rounding',
        description: '5% upfront early-payment discount applies with whole-rupee rounding.'
      },
      deliveryTimelines: {
        lite: '7–10 working days',
        starter: '7–10 working days',
        growth: '7–10 working days',
        custom: '15–20 working days'
      },
      websiteCare: {
        monthlyFee: 3000,
        currency: 'PKR',
        title: 'Website Care & Managed Cloud Hosting',
        scope: 'Cloud hosting, proactive uptime monitoring, SSL certificate, weekly automated backups, and 2 minor monthly edits.',
        flexCondition: 'Available as optional ongoing maintenance post-launch.'
      },
      adSpend: {
        policy: 'Excluded from Digital Ustad management fees. Client pays media ad spend directly to Meta or Google via client debit/credit card.',
        setupFees: {
          meta: 5000,
          google: 6000,
          waiverCondition: 'Waived with 3 months upfront retainer.'
        }
      },
      whatsappMetaFees: {
        policy: 'Official Meta Cloud API conversation charges are paid directly to Meta via credit card linked to client Meta Business Manager account.',
        serverMaintenance: 'Cloud hosting & bot webhook maintenance available at PKR 3,000 – 5,000 / month (or client self-hosted).'
      }
    },

    // 2. Canonical Packages Catalog
    packages: {
      // --- Web Development ---
      'web-lite': {
        id: 'web-lite',
        name: '3-Page Website Lite',
        category: 'Web Development',
        price: 17999,
        priceFormatted: 'PKR 17,999',
        discountPercent: 5,
        upfrontPrice: 17099,
        upfrontPriceFormatted: 'PKR 17,099',
        upfrontDiscountText: '5% Early-Payment Discount: PKR 17,099 payable upfront',
        billingType: '100% Upfront Advance',
        deliveryTimeline: '7–10 working days',
        revisions: '2 revision rounds',
        supportWarranty: '7 days post-launch support',
        installments: null,
        mandatoryCare: false
      },
      'web-starter': {
        id: 'web-starter',
        name: '5-Page Website Starter',
        category: 'Web Development',
        price: 30000,
        priceFormatted: 'PKR 30,000',
        discountPercent: 5,
        upfrontPrice: 28500,
        upfrontPriceFormatted: 'PKR 28,500',
        upfrontDiscountText: '5% Discount for 100% Upfront (PKR 28,500)',
        billingType: '40/30/30 Milestone Plan',
        deliveryTimeline: '7–10 working days',
        revisions: '3 revision rounds',
        supportWarranty: '14 days post-launch support',
        installments: [
          { phase: 'Kickoff (40%)', amount: 12000, amountFormatted: 'PKR 12,000' },
          { phase: 'Approval Milestone (30%)', amount: 9000, amountFormatted: 'PKR 9,000' },
          { phase: 'Final Handover (30%)', amount: 9000, amountFormatted: 'PKR 9,000' }
        ],
        installmentTotal: 30000,
        mandatoryCare: false,
        careFee: 3000,
        careCondition: 'Optional ongoing Website Care available.'
      },
      'web-growth': {
        id: 'web-growth',
        name: '7-Page Website Growth',
        category: 'Web Development',
        price: 42999,
        priceFormatted: 'PKR 42,999',
        discountPercent: 5,
        upfrontPrice: 40849,
        upfrontPriceFormatted: 'PKR 40,849',
        upfrontDiscountText: '5% Discount for 100% Upfront: PKR 40,849',
        billingType: '40/30/30 Milestone Plan',
        deliveryTimeline: '7–10 working days',
        revisions: '4 revision rounds',
        supportWarranty: '30 days post-launch support',
        installments: [
          { phase: 'Kickoff (40%)', amount: 17200, amountFormatted: 'PKR 17,200' },
          { phase: 'Approval Milestone (30%)', amount: 12900, amountFormatted: 'PKR 12,900' },
          { phase: 'Final Handover (30%)', amount: 12899, amountFormatted: 'PKR 12,899' }
        ],
        installmentTotal: 42999,
        mandatoryCare: false,
        careFee: 3000,
        careCondition: 'Optional ongoing Website Care available.'
      },
      'web-custom': {
        id: 'web-custom',
        name: 'Custom Web / E-Commerce / Web App',
        category: 'Web Development',
        price: 75000,
        priceFormatted: 'PKR 75,000+',
        billingType: '40/30/30 Milestones (Deployment Final)',
        deliveryTimeline: '15–20 working days',
        revisions: 'Quoted per proposal (typically 4–6 rounds)',
        supportWarranty: '30 days post-launch support',
        installments: [
          { phase: 'Kickoff (40%)', amount: '40%' },
          { phase: 'Approval Milestone (30%)', amount: '30%' },
          { phase: 'Final Live Deployment (30%)', amount: '30%' }
        ]
      },

      // --- WhatsApp Automation ---
      'whatsapp-basic': {
        id: 'whatsapp-basic',
        name: 'Basic WhatsApp Bot',
        category: 'WhatsApp Automation',
        priceRange: 'PKR 25,000 – 35,000',
        billingType: '40/30/30 Milestones',
        deliveryTimeline: '7–10 working days',
        revisions: '2 rounds flow adjustments',
        supportWarranty: '14 days post-launch support',
        installments: [
          { phase: 'Kickoff (40%)', amount: '40%' },
          { phase: 'Approval Milestone (30%)', amount: '30%' },
          { phase: 'Live Signoff & Handover (30%)', amount: '30%' }
        ],
        operationalNote: 'Hosting PKR 3k–5k/mo; Meta API conversation charges direct to Meta.'
      },
      'whatsapp-growth': {
        id: 'whatsapp-growth',
        name: 'Growth WhatsApp Workflow',
        category: 'WhatsApp Automation',
        priceRange: 'PKR 45,000 – 65,000',
        billingType: '40/30/30 Milestones',
        deliveryTimeline: '7–10 working days',
        revisions: '3 rounds conversational flow adjustments',
        supportWarranty: '30 days post-launch support',
        installments: [
          { phase: 'Kickoff (40%)', amount: '40%' },
          { phase: 'Approval Milestone (30%)', amount: '30%' },
          { phase: 'Live Launch (30%)', amount: '30%' }
        ],
        operationalNote: 'Hosting PKR 3k–5k/mo; Meta API conversation charges direct to Meta.'
      },
      'whatsapp-advanced': {
        id: 'whatsapp-advanced',
        name: 'Advanced AI & Custom API Bot',
        category: 'WhatsApp Automation',
        price: 75000,
        priceFormatted: 'PKR 75,000+',
        billingType: '40/30/30 Milestones',
        deliveryTimeline: '2–3 weeks',
        revisions: 'Defined per technical specification',
        supportWarranty: '30 days post-launch support',
        installments: [
          { phase: 'Kickoff (40%)', amount: '40%' },
          { phase: 'Approval Milestone (30%)', amount: '30%' },
          { phase: 'Final Live Deployment (30%)', amount: '30%' }
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
        horizon: '3-month recommended horizon',
        lockIn: false,
        cancellation: 'At least 7 days before the next billing date'
      },
      'seo-growth': {
        id: 'seo-growth',
        name: 'Growth SEO',
        category: 'SEO & Local Search',
        price: 25000,
        priceFormatted: 'PKR 25,000/mo',
        billingType: 'Advance Monthly Retainer',
        horizon: '3-month recommended horizon',
        lockIn: false,
        cancellation: 'At least 7 days before the next billing date'
      },
      'seo-authority': {
        id: 'seo-authority',
        name: 'Authority SEO',
        category: 'SEO & Local Search',
        price: 40000,
        priceFormatted: 'PKR 40,000/mo',
        billingType: 'Advance Monthly Retainer',
        horizon: '3-month recommended horizon',
        lockIn: false,
        cancellation: 'At least 7 days before the next billing date'
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
        billingType: 'Advance Monthly Retainer',
        cancellation: 'At least 7 days before the next billing date'
      },
      'social-basic': {
        id: 'social-basic',
        name: 'Basic Social Media',
        category: 'Social Media Management',
        price: 18000,
        priceFormatted: 'PKR 18,000/mo',
        billingType: 'Advance Monthly Retainer',
        lockIn: false,
        cancellation: 'At least 7 days before the next billing date'
      },
      'social-growth': {
        id: 'social-growth',
        name: 'Growth Social Media',
        category: 'Social Media Management',
        price: 32000,
        priceFormatted: 'PKR 32,000/mo',
        billingType: 'Advance Monthly Retainer',
        lockIn: false,
        cancellation: 'At least 7 days before the next billing date'
      },
      'social-pro': {
        id: 'social-pro',
        name: 'Pro Social Media',
        category: 'Social Media Management',
        price: 50000,
        priceFormatted: 'PKR 50,000/mo',
        billingType: 'Advance Monthly Retainer',
        lockIn: false,
        cancellation: 'At least 7 days before the next billing date'
      },
      'ads-starter': {
        id: 'ads-starter',
        name: 'Starter Meta & Google Ads',
        category: 'Paid Advertising',
        price: 15000,
        priceFormatted: 'PKR 15,000/mo',
        billingType: 'Advance Monthly Management Fee',
        lockIn: false,
        cancellation: 'At least 7 days before the next billing date',
        adSpendRule: 'Media spend paid directly to ad networks via client card'
      },
      'ads-growth': {
        id: 'ads-growth',
        name: 'Growth Meta & Google Ads',
        category: 'Paid Advertising',
        price: 28000,
        priceFormatted: 'PKR 28,000/mo',
        billingType: 'Advance Monthly Management Fee',
        lockIn: false,
        cancellation: 'At least 7 days before the next billing date',
        adSpendRule: 'Media spend paid directly to ad networks via client card'
      },
      'ads-scale': {
        id: 'ads-scale',
        name: 'Scale Meta & Google Ads',
        category: 'Paid Advertising',
        price: 45000,
        priceFormatted: 'PKR 45,000/mo',
        billingType: 'Advance Monthly Management Fee',
        lockIn: false,
        cancellation: 'At least 7 days before the next billing date',
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
        billingType: 'Advance Monthly Retainer',
        lockIn: false,
        cancellation: 'At least 7 days before the next billing date'
      },

      // --- Website Care & Hosting ---
      'website-care': {
        id: 'website-care',
        name: 'Website Care & Managed Cloud Hosting',
        category: 'Infrastructure & Care',
        price: 3000,
        priceFormatted: 'PKR 3,000/mo',
        billingType: 'Monthly Advance',
        scope: 'Cloud hosting, proactive uptime monitoring, SSL certificate, weekly automated cloud backups, 2 minor monthly edits.',
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
