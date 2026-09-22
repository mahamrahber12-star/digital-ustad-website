/**
 * Digital Ustad - Interactive Engine & Premium Animations
 * Configured for Pakistan SMB Market (WhatsApp-First, Mobile-Dominant)
 */

// Central Brand Configuration - Reads from js/config.js (Single Source of Truth)
const DU_ACTIVE_CONFIG = (typeof window !== 'undefined' && window.DU_CONFIG) ? window.DU_CONFIG : {
  whatsappNumber: '923000000000', 
  telPhone: '+923000000000',
  displayPhone: '+92 300 0000000',
  officialEmail: 'contact@digitalustad.co',
  officeLocation: 'Lahore, Pakistan',
  verifiedWebsites: '10+',
  verifiedClients: '5+',
  yearsActive: '2+'
};
if (typeof window !== 'undefined' && !window.DU_CONFIG) {
  window.DU_CONFIG = DU_ACTIVE_CONFIG;
}

document.addEventListener('DOMContentLoaded', () => {
  // 0. Theme Toggle & Persistence Engine
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');

  const updateTheme = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  };

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isCurrentlyDark = document.documentElement.classList.contains('dark');
      const newDark = !isCurrentlyDark;
      localStorage.setItem('du_theme', newDark ? 'dark' : 'light');
      updateTheme(newDark);
    });
  });

  // Listen for OS system theme changes if user hasn't explicitly set a preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('du_theme')) {
      updateTheme(e.matches);
    }
  });

  // 1. Scroll Progress Bar & Back To Top Button
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  const updateScrollProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progressPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    if (scrollProgress) {
      scrollProgress.style.width = `${progressPercent}%`;
    }

    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-4');
        backToTopBtn.classList.add('opacity-100', 'visible', 'translate-y-0');
      } else {
        backToTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-4');
        backToTopBtn.classList.remove('opacity-100', 'visible', 'translate-y-0');
      }
    }
  };

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 2. Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. Mobile Navigation Drawer Toggle (Handles both IDs for cross-page consistency)
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuDrawer = document.getElementById('mobile-drawer');
  const closeMobileMenuBtns = document.querySelectorAll('#close-mobile-menu, #close-drawer-btn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenuDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuDrawer.classList.remove('hidden');
      setTimeout(() => {
        mobileMenuDrawer.classList.remove('opacity-0', 'pointer-events-none');
      }, 10);
    });

    const closeDrawer = () => {
      mobileMenuDrawer.classList.add('opacity-0', 'pointer-events-none');
      setTimeout(() => {
        mobileMenuDrawer.classList.add('hidden');
      }, 300);
    };

    closeMobileMenuBtns.forEach(btn => btn.addEventListener('click', closeDrawer));
    mobileNavLinks.forEach(link => link.addEventListener('click', closeDrawer));
  }

  // 4. Counter Animation on Scroll (DU-HOME-001 Fix: Instant fallback + smooth animation)
  const statNumbers = document.querySelectorAll('.stat-number');
  
  // Immediately initialize with target value so counters NEVER sit at "0+"
  statNumbers.forEach(stat => {
    const target = stat.getAttribute('data-target');
    const suffix = stat.getAttribute('data-suffix') || '';
    if (target) {
      stat.textContent = target + suffix;
    }
  });

  let statsAnimated = false;
  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const suffix = stat.getAttribute('data-suffix') || '';
      if (isNaN(target)) return;

      const duration = 1600;
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        const currentVal = Math.max(1, Math.floor(ease * target));
        
        stat.textContent = currentVal + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = target + suffix;
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  const statsSection = document.getElementById('stats-section');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          animateCounters();
        }
      });
    }, { threshold: 0.15 });

    statsObserver.observe(statsSection);
  }

  // 5. 3D Subtle Tilt Effect on Hero Device Mockup
  const heroMockupContainer = document.querySelector('.hero-mockup-wrapper');
  if (heroMockupContainer && window.innerWidth > 1024) {
    heroMockupContainer.addEventListener('mousemove', (e) => {
      const rect = heroMockupContainer.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const tiltX = (y / (rect.height / 2)) * -6;
      const tiltY = (x / (rect.width / 2)) * 6;

      heroMockupContainer.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    heroMockupContainer.addEventListener('mouseleave', () => {
      heroMockupContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      heroMockupContainer.style.transition = 'transform 0.5s ease';
    });

    heroMockupContainer.addEventListener('mouseenter', () => {
      heroMockupContainer.style.transition = 'none';
    });
  }

  // 6. Interactive Spotlight Glow on Cards
  const interactiveCards = document.querySelectorAll('.bento-card');
  interactiveCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 7. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-btn');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (btn && answer) {
      btn.addEventListener('click', () => {
        const isOpen = !answer.classList.contains('hidden');
        document.querySelectorAll('.faq-answer').forEach(a => a.classList.add('hidden'));
        document.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');

        if (!isOpen) {
          answer.classList.remove('hidden');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    }
  });

  // 8. Phone Validation & Unified WhatsApp Proposal Flow (QA-01, QA-08, FORM-01 to FORM-10)
  const getActiveConfig = () => window.DU_CONFIG || DU_ACTIVE_CONFIG;

  const isValidPakistanPhone = (phone) => {
    if (!phone) return false;
    const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
    // Accepts 03XXXXXXXXX, +923XXXXXXXXX, 00923XXXXXXXXX, 923XXXXXXXXX (JazzCash, EasyPaisa, Mobile)
    const pkRegex = /^((\+92)|(0092)|(92)|(0))?3[0-9]{9}$/;
    return pkRegex.test(cleaned);
  };

  // Helper: Map service name string to authoritative payment milestone schedule (QA-08)
  const getPaymentTermsForService = (serviceText) => {
    const config = getActiveConfig();
    const termsMap = config.paymentTerms || {};
    const text = (serviceText || '').toLowerCase();

    if (text.includes('lite') || text.includes('3-page')) {
      return termsMap.lite || {
        badge: '100% Upfront (5% Off)',
        note: 'Payment Milestones: 100% advance on kickoff. Single-batch delivery within 5–7 days. (5% early-payment discount applies).',
        draftTerms: '100% Upfront Advance (with 5% early discount)'
      };
    }
    if (text.includes('starter') || text.includes('5-page')) {
      return termsMap.starter || {
        badge: '25/50/25 Flex Installments',
        note: 'Payment Milestones: 25% kickoff, 50% approval on staging, 25% within 30 days of launch.',
        draftTerms: '25/50/25 Flex Installments (25% kickoff, 50% staging approval, 25% in 30 days)'
      };
    }
    if (text.includes('7-page') || text.includes('growth web') || text.includes('website growth')) {
      return termsMap.growthWeb || {
        badge: '25/50/25 Flex Installments',
        note: 'Payment Milestones: 25% kickoff, 50% approval on staging, 25% within 30 days of launch.',
        draftTerms: '25/50/25 Flex Installments (25% kickoff, 50% staging approval, 25% in 30 days)'
      };
    }
    if (text.includes('custom web') || text.includes('e-commerce') || text.includes('custom e-commerce') || text.includes('web app') || text.includes('portal')) {
      return termsMap.customWeb || {
        badge: '25/50/25 Milestones (Deployment Final)',
        note: 'Payment Milestones: 25% kickoff, 50% staging demo approval, 25% at final launch & deployment.',
        draftTerms: '25/50/25 Milestone Plan (25% kickoff, 50% staging demo, 25% at final launch/deployment)'
      };
    }
    if (text.includes('basic') && (text.includes('bot') || text.includes('whatsapp') || text.includes('automation'))) {
      return termsMap.basicBot || {
        badge: '50/50 Milestones',
        note: 'Payment Milestones: 50% kickoff, 50% upon live signoff & handover.',
        draftTerms: '50/50 Milestone Plan (50% kickoff, 50% upon live signoff/handover)'
      };
    }
    if (text.includes('advanced') && (text.includes('bot') || text.includes('ai') || text.includes('api'))) {
      return termsMap.advancedBot || {
        badge: '25/50/25 Milestones (Live Final)',
        note: 'Payment Milestones: 25% kickoff, 50% staging demo, 25% upon final live deployment.',
        draftTerms: '25/50/25 Milestone Plan (25% kickoff, 50% staging demo, 25% upon live deployment)'
      };
    }
    if (text.includes('growth') && (text.includes('bot') || text.includes('workflow') || text.includes('whatsapp'))) {
      return termsMap.growthBot || {
        badge: '25/50/25 Milestones (Live Final)',
        note: 'Payment Milestones: 25% kickoff, 50% staging demo, 25% at final live launch.',
        draftTerms: '25/50/25 Milestone Plan (25% kickoff, 50% staging demo, 25% at live launch)'
      };
    }
    if (text.includes('whatsapp') || text.includes('automation')) {
      // General bot inquiry default
      return termsMap.growthBot || {
        badge: '25/50/25 Milestones (Live Final)',
        note: 'Payment Milestones: 25% kickoff, 50% staging demo, 25% at final live launch (Basic bot: 50/50).',
        draftTerms: 'Service-Specific Milestone Plan (25/50/25 or 50/50)'
      };
    }
    if (text.includes('seo') || text.includes('google maps') || text.includes('google business')) {
      return termsMap.seoRetainer || {
        badge: 'Advance Monthly Retainer',
        note: 'Payment Milestones: Advance monthly retainer (100% at start of each monthly cycle). No lock-in contract.',
        draftTerms: 'Advance Monthly Retainer (100% at start of monthly cycle)'
      };
    }
    if (text.includes('social media') || text.includes('social')) {
      return termsMap.socialRetainer || {
        badge: 'Advance Monthly Retainer',
        note: 'Payment Milestones: Advance monthly retainer (100% at start of each monthly cycle).',
        draftTerms: 'Advance Monthly Retainer (100% at start of monthly cycle)'
      };
    }
    if (text.includes('ads') || text.includes('meta') || text.includes('google ads')) {
      return termsMap.adsRetainer || {
        badge: 'Advance Monthly Retainer',
        note: 'Payment Milestones: Advance management fee only. Ad spend billed directly to client debit/credit card.',
        draftTerms: 'Advance Monthly Retainer (Ad spend direct to client card)'
      };
    }
    if (text.includes('all-in-one') || text.includes('bundle') || text.includes('suite')) {
      return termsMap.allInOneBundle || {
        badge: 'Advance Monthly Retainer',
        note: 'Payment Milestones: Advance monthly billing (100% at start of each 30-day growth cycle).',
        draftTerms: 'Advance Monthly Retainer (100% at cycle start)'
      };
    }
    if (text.includes('graphic') && text.includes('retainer') || text.includes('design') && text.includes('retainer')) {
      return termsMap.designRetainer || {
        badge: 'Advance Monthly Retainer',
        note: 'Payment Milestones: Advance monthly creative retainer for continuous design assets.',
        draftTerms: 'Advance Monthly Creative Retainer'
      };
    }
    if (text.includes('graphic') || text.includes('design') || text.includes('brand') || text.includes('logo')) {
      return termsMap.designProject || {
        badge: '50/50 Milestones',
        note: 'Payment Milestones: 50% deposit on kickoff, 50% upon final creative delivery.',
        draftTerms: '50/50 Milestone Plan (50% kickoff deposit, 50% upon final delivery)'
      };
    }

    // Default fallback
    return termsMap.starter || {
      badge: '25/50/25 Flex Installments',
      note: 'Payment Milestones: 25% kickoff, 50% approval on staging, 25% within 30 days.',
      draftTerms: '25/50/25 Flex Installments'
    };
  };

  // Helper: Dynamically update milestone badge & text bound to selected service (QA-08)
  const updateFormMilestoneDisplay = (form) => {
    if (!form) return;
    const serviceSelect = form.querySelector('[id*="service"]') || form.querySelector('select[name="service"]');
    if (!serviceSelect) return;

    const terms = getPaymentTermsForService(serviceSelect.value);

    // Update milestone badge container
    const badgeEl = form.querySelector('#payment-milestone-badge') || 
                    form.closest('.p-8, .p-10, section, div')?.querySelector('#payment-milestone-badge') || 
                    document.querySelector('#payment-milestone-badge') || 
                    form.querySelector('.milestone-badge');
    if (badgeEl) {
      badgeEl.textContent = terms.badge;
      if (terms.badgeClass) {
        badgeEl.className = `text-[11px] font-bold px-3 py-1 rounded-full transition-colors ${terms.badgeClass}`;
      }
    }

    // Update milestone text note
    const noteEl = form.querySelector('#payment-milestone-text') || 
                   form.closest('.p-8, .p-10, section, div')?.querySelector('#payment-milestone-text') || 
                   document.querySelector('#payment-milestone-text') || 
                   form.querySelector('.milestone-note');
    if (noteEl) {
      noteEl.innerHTML = `🔒 Privacy guaranteed. Zero spam. <strong>${terms.note}</strong>`;
    }
  };

  const handleProposalSubmission = (form) => {
    const nameInput = form.querySelector('[id*="name"]') || form.querySelector('input[name="name"]');
    const phoneInput = form.querySelector('[id*="phone"]') || form.querySelector('input[name="phone"]');
    const serviceSelect = form.querySelector('[id*="service"]') || form.querySelector('select[name="service"]');
    const budgetSelect = form.querySelector('[id*="budget"]') || form.querySelector('select[name="budget"]');
    const messageInput = form.querySelector('[id*="message"]') || form.querySelector('textarea');
    const submitBtn = form.querySelector('button[type="submit"]');

    const name = nameInput?.value.trim() || '';
    const phone = phoneInput?.value.trim() || '';
    const service = serviceSelect?.value || 'Website Development';
    const budget = budgetSelect?.value || 'Standard Business Budget';
    let message = messageInput?.value.trim() || '';

    // Clear previous inline errors
    form.querySelectorAll('.du-form-error').forEach(el => el.remove());
    [nameInput, phoneInput].forEach(inp => inp?.classList.remove('border-red-500', 'ring-2', 'ring-red-400'));

    let hasError = false;

    // FORM-01: Name validation
    if (!name || name.length < 2) {
      hasError = true;
      if (nameInput) {
        nameInput.classList.add('border-red-500', 'ring-2', 'ring-red-400');
        const err = document.createElement('p');
        err.className = 'du-form-error text-[11px] text-red-500 font-semibold mt-1';
        err.textContent = 'Please provide your full name.';
        nameInput.parentNode.appendChild(err);
      }
    }

    // FORM-02 & FORM-10: Phone validation (Accepts JazzCash, EasyPaisa, 03xx, +92)
    if (!phone || !isValidPakistanPhone(phone)) {
      hasError = true;
      if (phoneInput) {
        phoneInput.classList.add('border-red-500', 'ring-2', 'ring-red-400');
        const err = document.createElement('p');
        err.className = 'du-form-error text-[11px] text-red-500 font-semibold mt-1';
        err.textContent = 'Please enter a valid Pakistan WhatsApp number (e.g. 0300 1122334).';
        phoneInput.parentNode.appendChild(err);
      }
    }

    if (hasError) return false;

    // FORM-06: Long description safeguard (Clean truncation if > 500 chars)
    if (message.length > 500) {
      message = message.substring(0, 500) + '... [details continue in chat]';
    }

    // FORM-09: Double submit prevention
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute('data-original-text', submitBtn.innerHTML);
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Connecting to WhatsApp...</span>
      `;
    }

    const config = getActiveConfig();
    const serviceTerms = getPaymentTermsForService(service);

    // FORM-03, 04, 05, 08: Full formatted WhatsApp message with UTF-8 Urdu & package-specific terms (QA-08)
    const whatsappText = encodeURIComponent(
      `Assalam-o-Alaikum Digital Ustad! 🚀\n\nI would like to discuss a project inquiry for my business.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Service Interested:* ${service}\n*Budget:* ${budget}\n*Payment Schedule:* ${serviceTerms.draftTerms}\n*Project Details:* ${message || 'No additional details provided'}\n\nPlease share your proposal and estimated delivery timeline.`
    );

    const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${whatsappText}`;

    // FORM-07: Open WhatsApp (wa.me natively opens app on mobile)
    window.open(whatsappUrl, '_blank');

    // Reset button after 3.5s
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        const originalText = submitBtn.getAttribute('data-original-text');
        if (originalText) submitBtn.innerHTML = originalText;
      }
    }, 3500);

    return true;
  };

  // Attach submission handler & dynamic change listener to ALL proposal forms (modal and page-level)
  const allProposalForms = document.querySelectorAll('#quote-form, form.proposal-form');
  allProposalForms.forEach(form => {
    // Dynamic payment milestone binding (QA-08)
    const serviceSelect = form.querySelector('[id*="service"]') || form.querySelector('select[name="service"]');
    if (serviceSelect) {
      serviceSelect.addEventListener('change', () => updateFormMilestoneDisplay(form));
      // Initialize milestone display on page load
      updateFormMilestoneDisplay(form);
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = handleProposalSubmission(form);
      if (success) {
        // If inside modal, close it cleanly
        const modal = form.closest('#quote-modal');
        if (modal) {
          setTimeout(() => {
            const closeBtn = document.getElementById('close-quote-modal');
            if (closeBtn) closeBtn.click();
          }, 600);
        }
      }
    });
  });

  // Modal Open/Close Controls & WhatsApp Automation CTA Integration
  const getStartedBtns = document.querySelectorAll('.btn-get-started, [data-open-quote]');
  const quoteModal = document.getElementById('quote-modal');
  const closeQuoteModalBtn = document.getElementById('close-quote-modal');

  // Bot packages list for WhatsApp Automation CTA
  const BOT_PACKAGES_OPTIONS = `
    <option value="Growth WhatsApp Workflow (PKR 45K-65K)">Growth WhatsApp Workflow (PKR 45K-65K) ⭐</option>
    <option value="Basic WhatsApp Bot (PKR 25K-35K)">Basic WhatsApp Bot (PKR 25K-35K)</option>
    <option value="Advanced AI & Custom API Bot (PKR 75K+)">Advanced AI & Custom API Bot (PKR 75K+)</option>
  `;

  const configureModalForService = (serviceType) => {
    if (!quoteModal) return;
    const modalForm = quoteModal.querySelector('form');
    const serviceSelect = quoteModal.querySelector('#client-service') || quoteModal.querySelector('select[name="service"]');
    if (!serviceSelect) return;

    if (serviceType === 'whatsapp-automation' || serviceType === 'bot') {
      // If modal doesn't already have bot packages only, populate or select
      const hasBotOption = Array.from(serviceSelect.options).some(o => o.value.includes('Growth WhatsApp'));
      if (!hasBotOption) {
        serviceSelect.setAttribute('data-original-options', serviceSelect.innerHTML);
        serviceSelect.innerHTML = BOT_PACKAGES_OPTIONS;
      }
      serviceSelect.value = "Growth WhatsApp Workflow (PKR 45K-65K)";
    } else if (serviceSelect.hasAttribute('data-original-options')) {
      serviceSelect.innerHTML = serviceSelect.getAttribute('data-original-options');
    }

    if (modalForm) {
      updateFormMilestoneDisplay(modalForm);
    }
  };

  if (quoteModal) {
    const openModal = (serviceType = null) => {
      if (serviceType) {
        configureModalForService(serviceType);
      }
      quoteModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        const modalContent = quoteModal.querySelector('.modal-box');
        if (modalContent) {
          modalContent.classList.remove('scale-95', 'opacity-0');
          modalContent.classList.add('scale-100', 'opacity-100');
        }
      }, 10);
    };

    const closeModal = () => {
      const modalContent = quoteModal.querySelector('.modal-box');
      if (modalContent) {
        modalContent.classList.remove('scale-100', 'opacity-100');
        modalContent.classList.add('scale-95', 'opacity-0');
      }
      setTimeout(() => {
        quoteModal.classList.add('hidden');
        document.body.style.overflow = '';
      }, 200);
    };

    getStartedBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const serviceType = btn.getAttribute('data-service') || null;
        openModal(serviceType);
      });
    });

    // Special WhatsApp Automation Bot Quote Triggers across pages
    const botQuoteBtns = document.querySelectorAll('.btn-whatsapp-bot-quote, [data-service="whatsapp-automation"]');
    botQuoteBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('whatsapp-automation');
      });
    });

    if (closeQuoteModalBtn) closeQuoteModalBtn.addEventListener('click', closeModal);

    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) closeModal();
    });
  }

  // 8B. Centralized Contact Links & Display Synchronizer (QA-01)
  const syncContactLinks = () => {
    const config = getActiveConfig();
    if (!config || !config.whatsappNumber) return;

    // 1. Synchronize all wa.me links preserving query params (prefilled draft text & context)
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
      const rawHref = link.getAttribute('href') || '';
      try {
        // Extract query parameter ?text= if present
        const queryIndex = rawHref.indexOf('?');
        const queryPart = queryIndex !== -1 ? rawHref.substring(queryIndex) : '';
        link.href = `https://wa.me/${config.whatsappNumber}${queryPart}`;
      } catch (err) {
        link.href = rawHref.replace(/wa\.me\/[0-9]+/, `wa.me/${config.whatsappNumber}`);
      }

      // If the link text itself displays a phone number, update to displayPhone
      const textTrim = link.textContent.trim();
      if (textTrim.startsWith('+92') || textTrim.startsWith('0300')) {
        link.textContent = config.displayPhone;
      }
    });

    // 2. Synchronize all tel: links
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
      link.href = `tel:${config.telPhone || ('+' + config.whatsappNumber)}`;
    });

    // 3. Synchronize all display phone elements
    document.querySelectorAll('[data-du-phone], .du-phone-display').forEach(el => {
      el.textContent = config.displayPhone;
    });
  };

  // Run contact synchronization on load
  syncContactLinks();

  // 9. Portfolio Detailed Case Study Modal (DU-PORT-001 & DU-PORT-002 Fix)
  // Kept strictly to 4 relevant sample concept industries (Restaurants, Salons, Clinics, Real Estate)
  const portfolioData = {
    'spice-bistro': {
      title: 'Spice Bistro — Lahore',
      category: 'Restaurant & Hospitality Website',
      typeBadge: 'Sample Website Concept',
      industry: 'Food & Dining — Lahore, Pakistan',
      deliverables: '5-Page Custom Web Experience + Digital QR Menu + 1-Click WhatsApp Ordering Flow',
      description: 'A complete digital presence engineered for high-end dining. Designed to eliminate expensive third-party delivery commission fees by routing customer reservations and takeout orders directly into WhatsApp.',
      features: [
        'Live Digital QR & Visual Food Menu',
        'Direct 1-Click WhatsApp Delivery & Takeout Flow',
        'Online Table Reservation Form',
        'Local SEO & Google Maps Sync Architecture',
        '100% Mobile Optimized for 360px+ Smartphones'
      ],
      stats: 'Designed in 8 Working Days • Fast WhatsApp Ordering Architecture',
      status: 'Sample Concept Showcase',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
    },
    'glow-shine': {
      title: 'Glow & Shine Salon — Lahore',
      category: 'Beauty, Salon & Spa Booking Portal',
      typeBadge: 'Sample Website Concept',
      industry: 'Aesthetics & Wellness — Lahore, Pakistan',
      deliverables: 'Custom Booking Portal + Service Menu + Stylist Portfolio Gallery + WhatsApp Bot',
      description: 'An elegant pastel-toned showcase designed to convert casual Instagram visitors into confirmed appointments. Enables clients to browse bridal tiers, facial treatments, and select stylist availability.',
      features: [
        'Interactive Bridal & Party Service Catalog',
        'Direct WhatsApp Slot Booking System',
        'Stylist Work Gallery with Before/After Showcase',
        'Google Business Profile Integration',
        'Fast 0.9s Load Speed on Mobile Connections'
      ],
      stats: 'Designed in 7 Working Days • 360px Responsive Layout',
      status: 'Sample Concept Showcase',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80'
    },
    'healthcare-clinic': {
      title: 'HealthCare Clinic — Lahore',
      category: 'Medical & Diagnostic Healthcare Portal',
      typeBadge: 'Sample Website Concept',
      industry: 'Healthcare & Diagnostics — Lahore, Pakistan',
      deliverables: 'Patient Information Portal + Doctor OPD Timings + Online Appointment Inquiry',
      description: 'A clean, patient-centric medical website engineered to establish patient trust. Features clear doctor specializations, clinic timings, branch locations, and instant appointment booking.',
      features: [
        'Physician Profiles & Specialty Directory',
        'Interactive OPD Schedule & Timings Table',
        'Direct WhatsApp Doctor Appointment Booking',
        'Google Maps Direction & Contact Locator',
        'Emergency Helpline Quick-Tap Integration'
      ],
      stats: 'Designed in 9 Working Days • Clean Accessibility & Trust Architecture',
      status: 'Sample Concept Showcase',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80'
    },
    'dream-homes': {
      title: 'Dream Homes Real Estate — Lahore',
      category: 'Real Estate & Property Consultancy',
      typeBadge: 'Sample Website Concept',
      industry: 'Property & Investments — Lahore, Pakistan',
      deliverables: 'High-Converting Property Catalog + Virtual Video Showcase + WhatsApp Lead Funnel',
      description: 'A high-converting real estate showcase designed for local and overseas Pakistani property investors. Integrates high-res image galleries, location filter tags, and direct lead routing to sales agents.',
      features: [
        'Featured Residential & Commercial Listings',
        'Filter by Category, Price & Area',
        '1-Tap WhatsApp Lead Capture on Every Property',
        'Meta Ads Lead Funnel Integration',
        'Overseas Investor Direct Inquiry Form'
      ],
      stats: 'Designed in 10 Working Days • Fast Lead Capture Architecture',
      status: 'Sample Concept Showcase',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    }
  };

  const projectModal = document.getElementById('project-modal');
  const closeProjectModalBtn = document.getElementById('close-project-modal');
  const projectCards = document.querySelectorAll('.project-card');

  if (projectModal) {
    const openProjectModal = (projectId) => {
      const data = portfolioData[projectId];
      if (!data) return;

      const titleEl = document.getElementById('project-modal-title');
      const catEl = document.getElementById('project-modal-category');
      const descEl = document.getElementById('project-modal-desc');
      const statsEl = document.getElementById('project-modal-stats');
      const imgEl = document.getElementById('project-modal-img');
      const badgeEl = document.getElementById('project-modal-badge');
      const deliverablesEl = document.getElementById('project-modal-deliverables');

      if (titleEl) titleEl.textContent = data.title;
      if (catEl) catEl.textContent = data.category;
      if (descEl) descEl.textContent = data.description;
      if (statsEl) statsEl.textContent = data.stats;
      if (imgEl) imgEl.src = data.image;
      if (badgeEl) badgeEl.textContent = data.typeBadge;
      if (deliverablesEl) deliverablesEl.textContent = data.deliverables;

      const featuresList = document.getElementById('project-modal-features');
      if (featuresList) {
        featuresList.innerHTML = data.features.map(f => `
          <li class="flex items-start text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
            <span class="w-2 h-2 rounded-full bg-[#FF6600] mr-2.5 mt-1.5 flex-shrink-0"></span>
            <span>${f}</span>
          </li>
        `).join('');
      }

      projectModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        const box = projectModal.querySelector('.modal-box');
        if (box) {
          box.classList.remove('scale-95', 'opacity-0');
          box.classList.add('scale-100', 'opacity-100');
        }
      }, 10);
    };

    const closeProjectModal = () => {
      const box = projectModal.querySelector('.modal-box');
      if (box) {
        box.classList.remove('scale-100', 'opacity-100');
        box.classList.add('scale-95', 'opacity-0');
      }
      setTimeout(() => {
        projectModal.classList.add('hidden');
        document.body.style.overflow = '';
      }, 200);
    };

    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-project-id');
        openProjectModal(id);
      });
    });

    if (closeProjectModalBtn) closeProjectModalBtn.addEventListener('click', closeProjectModal);
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  // 10. Interactive Pricing Category Tabs Switcher
  const pricingTabBtns = document.querySelectorAll('.pricing-tab-btn');
  const pricingTabContents = document.querySelectorAll('.pricing-tab-content');

  if (pricingTabBtns.length > 0 && pricingTabContents.length > 0) {
    const activateTab = (targetId) => {
      const btn = Array.from(pricingTabBtns).find(b => b.getAttribute('data-target') === targetId);
      if (!btn) return;

      pricingTabBtns.forEach(b => {
        b.classList.remove('active', 'bg-[#FF6600]', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'text-slate-700', 'hover:bg-slate-100', 'border', 'border-slate-200');
      });

      btn.classList.add('active', 'bg-[#FF6600]', 'text-white', 'shadow-md');
      btn.classList.remove('bg-white', 'text-slate-700', 'hover:bg-slate-100', 'border', 'border-slate-200');

      pricingTabContents.forEach(content => {
        if (content.id === targetId) {
          content.classList.remove('hidden');
        } else {
          content.classList.add('hidden');
        }
      });

      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    };

    pricingTabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('data-target');
        if (targetId) {
          activateTab(targetId);
          if (window.history && window.history.replaceState) {
            window.history.replaceState(null, null, '#' + targetId);
          }
        }
      });
    });

    if (window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      activateTab(hashId);
    }
  }
});
