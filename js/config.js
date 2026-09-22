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
