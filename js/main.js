/**
 * Digital Ustad - Interactive Engine & Premium Animations
 * Configured for Pakistan SMB Market (WhatsApp-First, Mobile-Dominant)
 */

// Central Brand Configuration - Reads from js/config.js (Single Source of Truth)
const DU_ACTIVE_CONFIG = (typeof window !== 'undefined' && window.DU_CONFIG) ? window.DU_CONFIG : {
  businessName: 'Digital Ustad',
  websiteURL: 'https://digitalustad.co/',
  businessLocation: 'Lahore, Punjab, Pakistan',
  workingHours: 'Monday – Saturday: 10:00 AM – 7:00 PM PKT',
  businessEmail: 'contact@digitalustad.co',
  businessPhone: '',
  whatsappNumber: '', 
  telPhone: '',
  displayPhone: '',
  officialEmail: 'contact@digitalustad.co',
  officeLocation: 'Lahore, Punjab, Pakistan',
  verifiedWebsites: '10+',
  activePartnerships: '5+',
  yearsActive: '2+',
  supportLocation: 'Pakistan-Based Support'
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

  // 3. Mobile Navigation Drawer Toggle (Full ARIA + Focus Trap + Return Focus)
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuDrawer = document.getElementById('mobile-drawer');
  const closeMobileMenuBtns = document.querySelectorAll('#close-mobile-menu, #close-drawer-btn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenuDrawer) {
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.setAttribute('aria-controls', 'mobile-drawer');
    if (!mobileMenuBtn.getAttribute('aria-label')) {
      mobileMenuBtn.setAttribute('aria-label', 'Open navigation menu');
    }
    mobileMenuDrawer.setAttribute('role', 'dialog');
    mobileMenuDrawer.setAttribute('aria-modal', 'true');
    mobileMenuDrawer.setAttribute('aria-label', 'Mobile Navigation Menu');

    const handleDrawerKeyDown = (e) => {
      if (mobileMenuDrawer.classList.contains('hidden')) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        closeDrawer();
        return;
      }
      if (e.key === 'Tab') {
        const focusables = Array.from(mobileMenuDrawer.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )).filter(el => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    const openDrawer = () => {
      mobileMenuDrawer.classList.remove('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleDrawerKeyDown);

      setTimeout(() => {
        mobileMenuDrawer.classList.remove('opacity-0', 'pointer-events-none');
        const firstFocus = mobileMenuDrawer.querySelector('button, a');
        if (firstFocus) firstFocus.focus();
      }, 50);
    };

    const closeDrawer = () => {
      window.removeEventListener('keydown', handleDrawerKeyDown);
      mobileMenuDrawer.classList.add('opacity-0', 'pointer-events-none');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      setTimeout(() => {
        mobileMenuDrawer.classList.add('hidden');
        if (mobileMenuBtn && typeof mobileMenuBtn.focus === 'function') {
          mobileMenuBtn.focus();
        }
      }, 250);
    };

    mobileMenuBtn.addEventListener('click', openDrawer);
    closeMobileMenuBtns.forEach(btn => btn.addEventListener('click', closeDrawer));
    mobileNavLinks.forEach(link => link.addEventListener('click', closeDrawer));
  }

  // 4. Counter Animation on Scroll (Respects prefers-reduced-motion)
  const statNumbers = document.querySelectorAll('.stat-number');
  const userPrefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
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
    if (userPrefersReducedMotion) return; // Respect prefers-reduced-motion

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
  if (statsSection && !userPrefersReducedMotion) {
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

  // 5. 3D Subtle Tilt Effect on Hero Device Mockup (Disabled under prefers-reduced-motion)
  const heroMockupContainer = document.querySelector('.hero-mockup-wrapper');
  if (heroMockupContainer && window.innerWidth > 1024 && !userPrefersReducedMotion) {
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
        badge: '40/30/30 Milestones',
        note: 'Payment Milestones: 40% project kickoff, 30% after design/development approval milestone, 30% before final handover / deployment completion.',
        draftTerms: '40/30/30 Milestones (40% kickoff, 30% approval, 30% final handover)'
      };
    }
    if (text.includes('7-page') || text.includes('growth web') || text.includes('website growth')) {
      return termsMap.growthWeb || {
        badge: '40/30/30 Milestones',
        note: 'Payment Milestones: 40% project kickoff, 30% after design/development approval milestone, 30% before final handover / deployment completion.',
        draftTerms: '40/30/30 Milestones (40% kickoff, 30% approval, 30% final handover)'
      };
    }
    if (text.includes('custom web') || text.includes('e-commerce') || text.includes('custom e-commerce') || text.includes('web app') || text.includes('portal')) {
      return termsMap.customWeb || {
        badge: '40/30/30 Milestones',
        note: 'Payment Milestones: 40% project kickoff, 30% after design/development approval milestone, 30% before final handover / deployment completion.',
        draftTerms: '40/30/30 Milestones (40% kickoff, 30% staging demo, 30% at final deployment)'
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
        badge: '40/30/30 Milestones',
        note: 'Payment Milestones: 40% project kickoff, 30% after design/development approval milestone, 30% before final handover / deployment completion.',
        draftTerms: '40/30/30 Milestones (40% kickoff, 30% staging demo, 30% upon live deployment)'
      };
    }
    if (text.includes('growth') && (text.includes('bot') || text.includes('workflow') || text.includes('whatsapp'))) {
      return termsMap.growthBot || {
        badge: '40/30/30 Milestones',
        note: 'Payment Milestones: 40% project kickoff, 30% after design/development approval milestone, 30% before final handover / deployment completion.',
        draftTerms: '40/30/30 Milestones (40% kickoff, 30% staging demo, 30% at live launch)'
      };
    }
    if (text.includes('whatsapp') || text.includes('automation')) {
      // General bot inquiry default
      return termsMap.growthBot || {
        badge: '40/30/30 Milestones',
        note: 'Payment Milestones: 40% project kickoff, 30% after design/development approval milestone, 30% before final handover / deployment completion (Basic bot: 50/50).',
        draftTerms: 'Service-Specific Milestone Plan (40/30/30 or 50/50)'
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
      badge: '40/30/30 Milestones',
      note: 'Payment Milestones: 40% project kickoff, 30% after design/development approval milestone, 30% before final handover / deployment completion.',
      draftTerms: '40/30/30 Milestones'
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

  // Helper: Open Digital Ustad contextual chat (Thin adapter for future official Clonvo integration)
  const openDigitalUstadChat = (context) => {
    context = context || {};
    const pathname = (typeof window !== 'undefined' && window.location && window.location.pathname) 
      ? window.location.pathname 
      : '';

    const chatContext = {
      intent: (typeof context.intent === 'string' && context.intent.trim() !== '') ? context.intent : 'general_consultation',
      service: (typeof context.service === 'string' && context.service.trim() !== '') ? context.service : null,
      packageId: (typeof context.packageId === 'string' && context.packageId.trim() !== '') ? context.packageId : null,
      sourcePage: (typeof context.sourcePage === 'string' && context.sourcePage.trim() !== '') ? context.sourcePage : pathname,
      campaign: (typeof context.campaign === 'string' && context.campaign.trim() !== '') ? context.campaign : null,
      industry: (typeof context.industry === 'string' && context.industry.trim() !== '') ? context.industry : null,
      language: (typeof context.language === 'string' && context.language.trim() !== '') ? context.language : 'en'
    };

    if (typeof window !== 'undefined') {
      window.__DU_CHAT_CONTEXT__ = chatContext;
      try {
        window.dispatchEvent(new CustomEvent('digitalustad:chat:open', { detail: chatContext }));
      } catch (e) {}
    }

    if (typeof window !== 'undefined' && window.Clonvo && typeof window.Clonvo.open === 'function') {
      window.Clonvo.open(chatContext);
      return;
    }

    // Fallback: route to contact page with context parameters so visitor inquiry is seamlessly captured
    const params = new URLSearchParams();
    if (chatContext.service) params.set('service', chatContext.service);
    if (chatContext.packageId) params.set('package', chatContext.packageId);
    if (chatContext.intent) params.set('intent', chatContext.intent);
    if (chatContext.campaign) params.set('campaign', chatContext.campaign);
    if (chatContext.industry) params.set('industry', chatContext.industry);
    if (chatContext.language && chatContext.language !== 'en') params.set('lang', chatContext.language);

    const queryStr = params.toString() ? '?' + params.toString() : '';

    if (typeof window !== 'undefined') {
      const isContactPage = pathname.endsWith('contact.html') || pathname.endsWith('/contact') || pathname.endsWith('/contact/');
      if (isContactPage) {
        const serviceSelect = document.getElementById('client-service');
        if (serviceSelect && chatContext.service) {
          const matchTerm = chatContext.service.toLowerCase().replace(/[-_]/g, ' ');
          for (let i = 0; i < serviceSelect.options.length; i++) {
            if (serviceSelect.options[i].value.toLowerCase().includes(matchTerm)) {
              serviceSelect.selectedIndex = i;
              serviceSelect.dispatchEvent(new Event('change'));
              break;
            }
          }
        }
        const quoteForm = document.getElementById('quote-form');
        if (quoteForm) {
          quoteForm.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.location.href = 'contact.html' + queryStr;
      }
    }
  };

  // Expose helper globally
  if (typeof window !== 'undefined') {
    window.openDigitalUstadChat = openDigitalUstadChat;
  }

  // Pre-select service on contact page if passed via URL parameters
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const requestedService = urlParams.get('service') || urlParams.get('package');
    if (requestedService) {
      const matchTerm = requestedService.toLowerCase().replace(/[-_]/g, ' ');
      const serviceSelects = document.querySelectorAll('#client-service, select[name="service"]');
      serviceSelects.forEach(sel => {
        const matchIdx = Array.from(sel.options).findIndex(opt => 
          opt.value.toLowerCase().includes(matchTerm)
        );
        if (matchIdx !== -1) {
          sel.selectedIndex = matchIdx;
          sel.dispatchEvent(new Event('change'));
        }
      });
    }
  }

  // Helper: Sanitize text for HTML rendering
  const escapeHTML = (str) => {
    return String(str || '').replace(/[&<>"']/g, m => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[m]));
  };

  // 8A. Form Success State Renderer (Task 6: Multi-Step Roadmap & Action CTAs)
  const renderFormSuccessScreen = (form, info) => {
    const config = getActiveConfig();
    const cleanWa = (config.whatsappNumber || '').replace(/[^0-9]/g, '');
    const waLink = cleanWa ? `https://wa.me/${cleanWa}?text=${encodeURIComponent('Hi Digital Ustad, I just submitted a project brief on your website.')}` : 'contact.html';

    const successCard = document.createElement('div');
    successCard.className = 'du-form-success-screen p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-6 text-center animate-fade-in shadow-2xl';
    successCard.innerHTML = `
      <div class="w-16 h-16 mx-auto rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
        <i data-lucide="check-circle-2" class="w-8 h-8"></i>
      </div>
      
      <div class="space-y-2">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 text-xs font-bold font-mono">
          Ref #${escapeHTML(info.confirmationId || ('DU-' + Date.now().toString().slice(-6)))}
        </span>
        <h3 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Thank You — We've Received Your Project Brief.
        </h3>
        <p class="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
          Your requirements have been securely delivered to our project management desk in Lahore.
        </p>
      </div>

      <!-- 4-Step Process Roadmap -->
      <div class="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 text-left space-y-3.5">
        <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">What Happens Next:</div>
        
        <div class="flex items-start gap-3 text-xs text-slate-300">
          <span class="w-5 h-5 rounded-full bg-[#FF6600]/20 border border-[#FF6600]/40 text-[#FF6600] font-extrabold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
          <span><strong>Requirement Review:</strong> Our senior team reviews your business goals, target audience, and scope.</span>
        </div>

        <div class="flex items-start gap-3 text-xs text-slate-300">
          <span class="w-5 h-5 rounded-full bg-[#FF6600]/20 border border-[#FF6600]/40 text-[#FF6600] font-extrabold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
          <span><strong>Package & Scope Mapping:</strong> We identify the suitable service tier or tailor a milestone package.</span>
        </div>

        <div class="flex items-start gap-3 text-xs text-slate-300">
          <span class="w-5 h-5 rounded-full bg-[#FF6600]/20 border border-[#FF6600]/40 text-[#FF6600] font-extrabold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
          <span><strong>Direct Contact:</strong> We contact you directly on your provided phone / WhatsApp to discuss details.</span>
        </div>

        <div class="flex items-start gap-3 text-xs text-slate-300">
          <span class="w-5 h-5 rounded-full bg-[#FF6600]/20 border border-[#FF6600]/40 text-[#FF6600] font-extrabold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
          <span><strong>Proposal Shared:</strong> A formal, milestone-backed proposal (40/30/30) is shared where required.</span>
        </div>
      </div>

      <!-- Action Buttons (Task 6: Return Home, Start Web Chat, Optional WhatsApp) -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <a href="index.html" class="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-2">
          <i data-lucide="home" class="w-4 h-4 text-slate-400"></i>
          <span>Return Home</span>
        </a>
        <button type="button" id="du-success-chat-btn" class="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#FF6600] hover:bg-[#EA580C] text-white font-bold text-xs transition-all shadow-lg flex items-center justify-center gap-2" data-track="chatbot-open">
          <i data-lucide="message-square" class="w-4 h-4"></i>
          <span>Start Web Chat</span>
        </button>
        <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-emerald-700 text-slate-300 hover:text-white font-bold text-xs transition-all border border-slate-700 hover:border-emerald-600 flex items-center justify-center gap-2" data-track="whatsapp-click">
          <img src="assets/images/whatsapp-icon.png" alt="" width="16" height="16" class="w-4 h-4 object-contain">
          <span>Contact on WhatsApp</span>
        </a>
      </div>
    `;

    const modalBox = form.closest('.modal-box');
    if (modalBox) {
      const closeBtn = modalBox.querySelector('#close-quote-modal');
      modalBox.innerHTML = '';
      if (closeBtn) modalBox.appendChild(closeBtn);
      modalBox.appendChild(successCard);
    } else {
      form.parentNode.replaceChild(successCard, form);
    }

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }

    const chatBtn = successCard.querySelector('#du-success-chat-btn');
    if (chatBtn) {
      chatBtn.addEventListener('click', () => {
        if (typeof window.openDigitalUstadChat === 'function') {
          window.openDigitalUstadChat({ intent: 'submitted_brief', service: info.service });
        }
      });
    }
  };

  // 8. Lead Form Secure POST Delivery Engine & Delivery State Management
  const handleProposalSubmission = async (form) => {
    const nameInput = form.querySelector('[name="name"], [id*="name"]');
    const bizInput = form.querySelector('[name="business"], [name="businessName"], [id*="business"]');
    const phoneInput = form.querySelector('[name="phone"], [id*="phone"]');
    const emailInput = form.querySelector('[name="email"], [id*="email"]');
    const websiteInput = form.querySelector('[name="website"], [id*="website"]');
    const serviceSelect = form.querySelector('[name="service"], [id*="service"]');
    const budgetSelect = form.querySelector('[name="budget"], [id*="budget"]');
    const messageInput = form.querySelector('[name="message"], [id*="message"], textarea');
    const gotchaInput = form.querySelector('[name="_gotcha"]');
    const submitBtn = form.querySelector('button[type="submit"]');

    const name = nameInput?.value.trim() || '';
    const businessName = bizInput?.value.trim() || '';
    const phone = phoneInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';
    const website = websiteInput?.value.trim() || '';
    const service = serviceSelect?.value || 'Website Development';
    const budget = budgetSelect?.value || 'Standard Business Budget';
    const message = messageInput?.value.trim() || '';

    // Clear previous inline messages
    form.querySelectorAll('.du-form-error, .du-form-success, .du-form-failure').forEach(el => el.remove());
    [nameInput, bizInput, phoneInput, emailInput].forEach(inp => inp?.classList.remove('border-red-500', 'ring-2', 'ring-red-400'));

    // Spam honeypot detection
    if (gotchaInput && gotchaInput.value.trim() !== '') {
      return false;
    }

    let hasError = false;

    // Name validation
    if (!name || name.length < 2) {
      hasError = true;
      if (nameInput) {
        nameInput.classList.add('border-red-500', 'ring-2', 'ring-red-400');
        const err = document.createElement('p');
        err.className = 'du-form-error text-[11px] text-red-500 font-semibold mt-1';
        err.textContent = 'Please provide your full name (minimum 2 characters).';
        nameInput.parentNode.appendChild(err);
      }
    }

    // Business Name validation (if required or provided)
    if (bizInput && bizInput.hasAttribute('required') && (!businessName || businessName.length < 2)) {
      hasError = true;
      bizInput.classList.add('border-red-500', 'ring-2', 'ring-red-400');
      const err = document.createElement('p');
      err.className = 'du-form-error text-[11px] text-red-500 font-semibold mt-1';
      err.textContent = 'Please provide your business or brand name.';
      bizInput.parentNode.appendChild(err);
    }

    // Pakistan WhatsApp/Phone validation
    if (!phone || !isValidPakistanPhone(phone)) {
      hasError = true;
      if (phoneInput) {
        phoneInput.classList.add('border-red-500', 'ring-2', 'ring-red-400');
        const err = document.createElement('p');
        err.className = 'du-form-error text-[11px] text-red-500 font-semibold mt-1';
        err.textContent = 'Please enter a valid Pakistan WhatsApp number (e.g. 03XX XXXXXXX).';
        phoneInput.parentNode.appendChild(err);
      }
    }

    // Email validation (optional but validated if provided)
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      hasError = true;
      if (emailInput) {
        emailInput.classList.add('border-red-500', 'ring-2', 'ring-red-400');
        const err = document.createElement('p');
        err.className = 'du-form-error text-[11px] text-red-500 font-semibold mt-1';
        err.textContent = 'Please enter a valid email address.';
        emailInput.parentNode.appendChild(err);
      }
    }

    if (hasError) return false;

    // Prevent duplicate submissions using unique idempotency key & loading state
    let idempotencyKey = form.getAttribute('data-idempotency-key');
    if (!idempotencyKey) {
      idempotencyKey = 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
      form.setAttribute('data-idempotency-key', idempotencyKey);
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      if (!submitBtn.getAttribute('data-original-text')) {
        submitBtn.setAttribute('data-original-text', submitBtn.innerHTML);
      }
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Transmitting Project Brief...</span>
      `;
    }

    const leadPayload = {
      name,
      businessName,
      phone,
      email,
      website,
      service,
      budget,
      message: message.length > 500 ? (message.substring(0, 500) + '...') : message,
      sourcePage: window.location.pathname,
      leadSource: form.id === 'quote-modal-form' ? 'modal_proposal' : 'page_form',
      idempotencyKey,
      _gotcha: gotchaInput?.value || ''
    };

    const endpoint = form.getAttribute('action') || (window.DU_CONFIG && window.DU_CONFIG.leadEndpoint) || '/api/leads';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': idempotencyKey,
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(leadPayload)
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data && data.success) {
        // Track successful submission
        window.dispatchEvent(new CustomEvent('du:track', {
          detail: { event: 'contact-form-submit', service, budget, timestamp: Date.now() }
        }));

        // Render Professional Success Screen (Task 6)
        renderFormSuccessScreen(form, {
          confirmationId: data.confirmationId || idempotencyKey,
          service,
          name
        });

        return true;
      } else {
        throw new Error(data?.message || 'Server indicated unsuccessful submission.');
      }
    } catch (err) {
      // FAILURE STATE: Preserve user draft! Do not clear inputs.
      const failureAlert = document.createElement('div');
      failureAlert.className = 'du-form-failure p-4 mt-3 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-xs leading-relaxed space-y-2';
      failureAlert.innerHTML = `
        <div class="flex items-center gap-2 font-bold text-red-800 text-sm">
          <svg class="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          <span>Delivery Not Confirmed — Draft Preserved</span>
        </div>
        <p class="text-slate-600">Your brief could not be delivered to our backend at this moment. Your entered details have been preserved above so you do not have to retype them.</p>
        <div class="flex items-center gap-3 pt-1">
          <button type="button" class="du-retry-btn px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors">
            Retry Submission
          </button>
          <a href="contact.html" class="text-xs font-semibold text-slate-700 hover:text-[#C2410C] underline">
            Or Contact us directly via email &rarr;
          </a>
        </div>
      `;
      form.appendChild(failureAlert);

      const retryBtn = failureAlert.querySelector('.du-retry-btn');
      if (retryBtn) {
        retryBtn.addEventListener('click', () => {
          failureAlert.remove();
          handleProposalSubmission(form);
        });
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = submitBtn.getAttribute('data-original-text') || 'Submit Project Brief';
      }

      return false;
    }
  };

  // Attach submission handler & dynamic change listener to ALL proposal forms (modal and page-level)
  const allProposalForms = document.querySelectorAll('#quote-form, #quote-modal-form, form.proposal-form');
  allProposalForms.forEach(form => {
    // Dynamic payment milestone binding (QA-08)
    const serviceSelect = form.querySelector('[id*="service"]') || form.querySelector('select[name="service"]');
    if (serviceSelect) {
      serviceSelect.addEventListener('change', () => updateFormMilestoneDisplay(form));
      updateFormMilestoneDisplay(form);
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleProposalSubmission(form);
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
    let lastFocusedQuoteTrigger = null;

    quoteModal.setAttribute('role', 'dialog');
    quoteModal.setAttribute('aria-modal', 'true');
    quoteModal.setAttribute('aria-label', 'Project Consultation & Proposal Request');
    quoteModal.setAttribute('aria-hidden', 'true');
    quoteModal.setAttribute('inert', '');
    quoteModal.hidden = true;

    const handleQuoteModalKeyDown = (e) => {
      if (quoteModal.classList.contains('hidden')) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
        return;
      }

      if (e.key === 'Tab') {
        const focusables = Array.from(quoteModal.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )).filter(el => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    const prefillFormFields = (form, options = {}) => {
      if (!form) return;
      const { service, package: pkgName, budget, notes } = options;

      // 1. Service & Package matching
      const serviceSelect = form.querySelector('[id*="service"]') || form.querySelector('select[name="service"]');
      if (serviceSelect && (service || pkgName)) {
        const queryTerms = [pkgName, service].filter(Boolean).map(t => String(t).toLowerCase());
        const optionsList = Array.from(serviceSelect.options);
        
        let bestMatch = null;
        for (const term of queryTerms) {
          const found = optionsList.find(opt => {
            const val = opt.value.toLowerCase();
            const txt = opt.textContent.toLowerCase();
            return val.includes(term) || txt.includes(term);
          });
          if (found) {
            bestMatch = found;
            break;
          }
        }

        if (bestMatch) {
          serviceSelect.value = bestMatch.value;
          serviceSelect.dispatchEvent(new Event('change'));
        }
      }

      // 2. Budget matching
      const budgetSelect = form.querySelector('[id*="budget"]') || form.querySelector('select[name="budget"]');
      if (budgetSelect && budget) {
        const cleanBudget = String(budget).replace(/[^0-9]/g, '');
        const optionsList = Array.from(budgetSelect.options);
        
        let budgetMatch = optionsList.find(opt => {
          const optText = opt.textContent || opt.value;
          if (cleanBudget && optText.replace(/[^0-9]/g, '').includes(cleanBudget)) return true;
          return optText.toLowerCase().includes(String(budget).toLowerCase());
        });

        if (budgetMatch) {
          budgetSelect.value = budgetMatch.value;
          budgetSelect.dispatchEvent(new Event('change'));
        }
      }

      // 3. Message / Notes pre-filling
      const messageTextarea = form.querySelector('textarea');
      if (messageTextarea && (notes || pkgName)) {
        const prefillNote = notes || (pkgName ? `Selected Package: ${pkgName}` : '');
        if (prefillNote && (!messageTextarea.value.trim() || messageTextarea.value.startsWith('Selected Package:'))) {
          messageTextarea.value = prefillNote;
        }
      }

      updateFormMilestoneDisplay(form);
    };

    const openModal = (options = null, triggerEl = null) => {
      lastFocusedQuoteTrigger = triggerEl || document.activeElement;
      
      const modalForm = quoteModal.querySelector('form');
      let serviceType = null;
      let opts = {};

      if (typeof options === 'string') {
        serviceType = options;
        opts = { service: options };
      } else if (options && typeof options === 'object') {
        serviceType = options.service || null;
        opts = options;
      }

      if (serviceType) {
        configureModalForService(serviceType);
      }

      if (modalForm && Object.keys(opts).length > 0) {
        prefillFormFields(modalForm, opts);
      }

      quoteModal.removeAttribute('aria-hidden');
      quoteModal.removeAttribute('inert');
      quoteModal.hidden = false;
      quoteModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleQuoteModalKeyDown);

      setTimeout(() => {
        const modalContent = quoteModal.querySelector('.modal-box');
        if (modalContent) {
          modalContent.classList.remove('scale-95', 'opacity-0');
          modalContent.classList.add('scale-100', 'opacity-100');
        }
        // Focus first form input or close button
        const firstInput = quoteModal.querySelector('input:not([disabled]), select:not([disabled]), button');
        if (firstInput) firstInput.focus();
      }, 50);

      window.dispatchEvent(new CustomEvent('du:track', {
        detail: { event: 'proposal-cta', ...opts, timestamp: Date.now() }
      }));
    };

    const closeModal = () => {
      window.removeEventListener('keydown', handleQuoteModalKeyDown);
      const modalContent = quoteModal.querySelector('.modal-box');
      if (modalContent) {
        modalContent.classList.remove('scale-100', 'opacity-100');
        modalContent.classList.add('scale-95', 'opacity-0');
      }
      setTimeout(() => {
        quoteModal.setAttribute('aria-hidden', 'true');
        quoteModal.setAttribute('inert', '');
        quoteModal.hidden = true;
        quoteModal.classList.add('hidden');
        document.body.style.overflow = '';
        if (lastFocusedQuoteTrigger && typeof lastFocusedQuoteTrigger.focus === 'function') {
          lastFocusedQuoteTrigger.focus();
        }
      }, 200);
    };

    window.openProposalModal = (options = {}) => {
      openModal(options);
    };
    window.closeProposalModal = closeModal;

    getStartedBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const service = btn.getAttribute('data-service') || null;
        const pkg = btn.getAttribute('data-package') || null;
        const budget = btn.getAttribute('data-budget') || null;
        openModal({ service, package: pkg, budget }, btn);
      });
    });

    // Special WhatsApp Automation Bot Quote Triggers across pages
    const botQuoteBtns = document.querySelectorAll('.btn-whatsapp-bot-quote:not(.btn-get-started), [data-service="whatsapp-automation"]:not(.btn-get-started)');
    botQuoteBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal({ service: 'whatsapp-automation', package: 'Growth WhatsApp Workflow' }, btn);
      });
    });

    if (closeQuoteModalBtn) {
      if (!closeQuoteModalBtn.getAttribute('aria-label')) {
        closeQuoteModalBtn.setAttribute('aria-label', 'Close quotation request modal');
      }
      closeQuoteModalBtn.addEventListener('click', closeModal);
    }

    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) closeModal();
    });
  } else {
    // If quoteModal is NOT present on this page (e.g. /contact), scroll to page form
    window.openProposalModal = (options = {}) => {
      const pageForm = document.getElementById('quote-form') || document.querySelector('form.proposal-form');
      if (pageForm) {
        const { service, package: pkgName, budget, notes } = options;
        const serviceSelect = pageForm.querySelector('[id*="service"]') || pageForm.querySelector('select[name="service"]');
        if (serviceSelect && (service || pkgName)) {
          const matchTerm = (pkgName || service).toLowerCase();
          const matchOpt = Array.from(serviceSelect.options).find(o => o.value.toLowerCase().includes(matchTerm) || o.textContent.toLowerCase().includes(matchTerm));
          if (matchOpt) {
            serviceSelect.value = matchOpt.value;
            serviceSelect.dispatchEvent(new Event('change'));
          }
        }
        if (budget) {
          const budgetSelect = pageForm.querySelector('[id*="budget"]') || pageForm.querySelector('select[name="budget"]');
          if (budgetSelect) {
            const cleanBudget = String(budget).replace(/[^0-9]/g, '');
            const matchB = Array.from(budgetSelect.options).find(o => cleanBudget && o.textContent.replace(/[^0-9]/g, '').includes(cleanBudget));
            if (matchB) {
              budgetSelect.value = matchB.value;
              budgetSelect.dispatchEvent(new Event('change'));
            }
          }
        }
        pageForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const firstField = pageForm.querySelector('input:not([type="hidden"]), select');
        if (firstField) setTimeout(() => firstField.focus(), 400);
      }
      window.dispatchEvent(new CustomEvent('du:track', {
        detail: { event: 'proposal-cta', ...options, timestamp: Date.now() }
      }));
    };
  }

  // 8C. Global Trackable Event Delegation (Task 10)
  document.addEventListener('click', (e) => {
    const trackTarget = e.target.closest('[data-track]');
    if (!trackTarget) return;

    const trackType = trackTarget.getAttribute('data-track');
    const service = trackTarget.getAttribute('data-service') || null;
    const pkg = trackTarget.getAttribute('data-package') || null;
    const budget = trackTarget.getAttribute('data-budget') || null;

    // Track custom analytics event
    window.dispatchEvent(new CustomEvent('du:track', {
      detail: {
        event: trackType,
        service,
        package: pkg,
        budget,
        id: trackTarget.id || null,
        text: trackTarget.textContent.trim().slice(0, 60),
        href: trackTarget.getAttribute('href') || null,
        timestamp: Date.now()
      }
    }));

    if (trackType === 'chatbot-open') {
      if (typeof window.openDigitalUstadChat === 'function') {
        e.preventDefault();
        window.openDigitalUstadChat({ intent: 'direct_open', service, packageId: pkg });
      }
    } else if (trackType === 'pricing-cta') {
      // Pricing cards open proposal modal with pre-filled details (Task 8)
      if (typeof window.openProposalModal === 'function') {
        e.preventDefault();
        window.openProposalModal({ service, package: pkg, budget });
      }
    }
  });

  // 8B. Centralized Contact Links & Display Synchronizer (QA-01, QA-02)
  const syncContactLinks = () => {
    const config = getActiveConfig();
    const hasVerifiedPhone = Boolean(config && config.whatsappNumber && config.whatsappNumber.trim() !== '');
    const hasVerifiedTel = Boolean(config && ((config.telPhone && config.telPhone.trim() !== '') || (config.whatsappNumber && config.whatsappNumber.trim() !== '')));

    // 1. Synchronize wa.me links ONLY on the contact page
    const pathname = (typeof window !== 'undefined' && window.location.pathname) ? window.location.pathname.toLowerCase() : '';
    const isContactPage = pathname.endsWith('contact.html') || pathname.endsWith('/contact') || pathname.endsWith('/contact/');

    const waLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="api.whatsapp.com"], [data-du-contact="whatsapp"], [data-du-contact="whatsapp-btn"]');
    waLinks.forEach(link => {
      if (!isContactPage || !hasVerifiedPhone) {
        link.classList.add('hidden');
        link.removeAttribute('href');
        const container = link.closest('[data-du-whatsapp-wrapper]');
        if (container) container.classList.add('hidden');
      } else {
        link.classList.remove('hidden');
        const container = link.closest('[data-du-whatsapp-wrapper]');
        if (container) container.classList.remove('hidden');
        const cleanNumber = config.whatsappNumber.trim().replace(/[^0-9]/g, '');
        link.href = `https://wa.me/${cleanNumber}`;
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');

        if (config.displayPhone) {
          const phoneEl = link.querySelector('[data-du-phone]');
          if (phoneEl) phoneEl.textContent = config.displayPhone;
        }
      }
    });

    // 2. Synchronize all tel: links
    document.querySelectorAll('a[href^="tel:"], [data-du-tel]').forEach(link => {
      if (!hasVerifiedTel) {
        link.classList.add('hidden');
        link.removeAttribute('href');
        const container = link.closest('[data-du-phone-container]');
        if (container) container.classList.add('hidden');
      } else {
        link.classList.remove('hidden');
        const telValue = config.telPhone || ('+' + config.whatsappNumber.trim().replace(/[^0-9]/g, ''));
        link.href = `tel:${telValue}`;
        const container = link.closest('[data-du-phone-container]');
        if (container) container.classList.remove('hidden');
      }
    });

    // 3. Synchronize all display phone elements
    document.querySelectorAll('[data-du-phone], .du-phone-display').forEach(el => {
      const container = el.closest('[data-du-phone-container]');
      if (!hasVerifiedPhone && (!config || !config.displayPhone)) {
        el.classList.add('hidden');
        el.textContent = '';
        if (container) container.classList.add('hidden');
      } else {
        el.classList.remove('hidden');
        el.textContent = config.displayPhone;
        if (container) container.classList.remove('hidden');
      }
    });
  };

  // Run contact synchronization on load
  syncContactLinks();

  // 8C. Central Commercial Source Synchronization
  const syncCommercialData = () => {
    const config = getActiveConfig();
    const commercial = config?.commercial;
    if (!commercial || !commercial.packages) return;

    document.querySelectorAll('[data-commercial-package]').forEach(el => {
      const pkgKey = el.getAttribute('data-commercial-package');
      const pkg = commercial.packages[pkgKey];
      if (!pkg) return;

      const upfrontEl = el.querySelector('[data-commercial-upfront]');
      if (upfrontEl && pkg.upfrontDiscountText) {
        upfrontEl.textContent = pkg.upfrontDiscountText;
      }
    });
  };

  syncCommercialData();

  // 9. Portfolio Detailed Case Study Modal - Industry Demo Concepts
  const portfolioData = {
    'spice-bistro': {
      title: 'Spice Bistro — Lahore',
      category: 'Restaurant & Hospitality Website',
      typeBadge: 'Industry Demo Concept',
      industry: 'Food & Dining — Lahore, Pakistan',
      deliverables: '5-Page Custom Web Experience + Digital QR Menu + 1-Click WhatsApp Ordering Flow',
      description: 'This concept demonstrates how Digital Ustad can build a modern digital presence for businesses in this industry. Designed to eliminate third-party commission fees by routing customer reservations and takeout orders directly into WhatsApp.',
      features: [
        'Live Digital QR & Visual Food Menu',
        'Direct 1-Click WhatsApp Delivery & Takeout Flow',
        'Online Table Reservation Form',
        'Local SEO & Google Maps Sync Architecture',
        '100% Mobile Optimized for 360px+ Smartphones'
      ],
      stats: 'Typical Delivery: 7–10 Working Days • Fast WhatsApp Ordering Architecture',
      status: 'Industry Demo Concept',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
    },
    'glow-shine': {
      title: 'Glow & Shine Salon — Lahore',
      category: 'Beauty, Salon & Spa Booking Portal',
      typeBadge: 'Industry Demo Concept',
      industry: 'Aesthetics & Wellness — Lahore, Pakistan',
      deliverables: 'Custom Booking Portal + Service Menu + Stylist Portfolio Gallery + WhatsApp Flow',
      description: 'This concept demonstrates how Digital Ustad can build a modern digital presence for businesses in this industry. An elegant showcase designed to convert visitors into confirmed appointments, allowing clients to browse services and book directly.',
      features: [
        'Interactive Bridal & Party Service Catalog',
        'Direct WhatsApp Slot Booking System',
        'Stylist Work Gallery Showcase',
        'Google Business Profile Integration',
        'Fast Load Speed on Mobile Connections'
      ],
      stats: 'Typical Delivery: 7–10 Working Days • 360px Responsive Layout',
      status: 'Industry Demo Concept',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80'
    },
    'healthcare-clinic': {
      title: 'HealthCare Clinic — Lahore',
      category: 'Medical & Diagnostic Healthcare Portal',
      typeBadge: 'Industry Demo Concept',
      industry: 'Healthcare & Diagnostics — Lahore, Pakistan',
      deliverables: 'Patient Information Portal + Doctor OPD Timings + Online Appointment Inquiry',
      description: 'This concept demonstrates how Digital Ustad can build a modern digital presence for businesses in this industry. A clean, patient-centric layout featuring clear doctor specializations, clinic timings, and direct WhatsApp appointment inquiry.',
      features: [
        'Physician Profiles & Specialty Directory',
        'Interactive OPD Schedule & Timings Table',
        'Direct WhatsApp Doctor Appointment Booking',
        'Google Maps Direction & Contact Locator',
        'Emergency Helpline Quick-Tap Integration'
      ],
      stats: 'Typical Delivery: 7–10 Working Days • Clean Accessibility & Trust Architecture',
      status: 'Industry Demo Concept',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80'
    },
    'dream-homes': {
      title: 'Dream Homes Real Estate — Lahore',
      category: 'Real Estate & Property Consultancy',
      typeBadge: 'Industry Demo Concept',
      industry: 'Property & Investments — Lahore, Pakistan',
      deliverables: 'High-Converting Property Catalog + Virtual Video Showcase + WhatsApp Lead Funnel',
      description: 'This concept demonstrates how Digital Ustad can build a modern digital presence for businesses in this industry. Integrates image galleries, property filter tags, and direct lead routing to sales agents via WhatsApp.',
      features: [
        'Featured Residential & Commercial Listings',
        'Filter by Category, Price & Area',
        '1-Tap WhatsApp Lead Capture on Every Property',
        'Meta Ads Lead Funnel Integration',
        'Overseas Investor Direct Inquiry Form'
      ],
      stats: 'Typical Delivery: 7–10 Working Days • Fast Lead Capture Architecture',
      status: 'Industry Demo Concept',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    },
    'fitzone-gym': {
      title: 'FitZone Fitness Club — Lahore',
      category: 'Gym, Fitness & Membership Portal',
      typeBadge: 'Industry Demo Concept',
      industry: 'Health & Fitness — Lahore, Pakistan',
      deliverables: 'Modern Fitness Experience + Trainer Schedules + WhatsApp Membership Funnel',
      description: 'This concept demonstrates how Digital Ustad can build a modern digital presence for businesses in this industry. Engineered to showcase class timetables, membership pricing, and direct WhatsApp signups.',
      features: [
        'Weekly Class Timetable & Trainer Showcase',
        'Membership Tier Comparison Table',
        '1-Click WhatsApp Trial Class Booking',
        'Google Business Profile & Location Map Sync',
        'Mobile-Optimized Fast Architecture'
      ],
      stats: 'Typical Delivery: 7–10 Working Days • Membership Lead Funnel',
      status: 'Industry Demo Concept',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80'
    },
    'bright-future': {
      title: 'Bright Future Academy — Lahore',
      category: 'Education, School & Academy Portal',
      typeBadge: 'Industry Demo Concept',
      industry: 'Education & Academics — Lahore, Pakistan',
      deliverables: 'Academic Information Portal + Admission Inquiries + Fee Structure Guide',
      description: 'This concept demonstrates how Digital Ustad can build a modern digital presence for businesses in this industry. Built to streamline student admissions and provide transparent curriculum and fee details.',
      features: [
        'Curriculum Overview & Faculty Profiles',
        'Online Admission Inquiry Form',
        'Fee Structure & Academic Calendar',
        'Direct WhatsApp Guidance Line',
        'Fast Accessible Layout on Mobile'
      ],
      stats: 'Typical Delivery: 7–10 Working Days • Admissions Funnel',
      status: 'Industry Demo Concept',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80'
    }
  };

  const projectModal = document.getElementById('project-modal');
  const closeProjectModalBtn = document.getElementById('close-project-modal');
  const projectCards = document.querySelectorAll('.project-card');

  if (projectModal) {
    let lastFocusedProjectTrigger = null;

    projectModal.setAttribute('role', 'dialog');
    projectModal.setAttribute('aria-modal', 'true');
    projectModal.setAttribute('aria-label', 'Project Case Study Details');

    const handleProjectModalKeyDown = (e) => {
      if (projectModal.classList.contains('hidden')) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closeProjectModal();
        return;
      }

      if (e.key === 'Tab') {
        const focusables = Array.from(projectModal.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )).filter(el => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    const openProjectModal = (projectId, triggerEl = null) => {
      lastFocusedProjectTrigger = triggerEl || document.activeElement;
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
      if (imgEl) {
        imgEl.src = data.image;
        imgEl.alt = data.title + ' Project Preview';
      }
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
      window.addEventListener('keydown', handleProjectModalKeyDown);

      setTimeout(() => {
        const box = projectModal.querySelector('.modal-box');
        if (box) {
          box.classList.remove('scale-95', 'opacity-0');
          box.classList.add('scale-100', 'opacity-100');
        }
        if (closeProjectModalBtn) {
          closeProjectModalBtn.focus();
        }
      }, 50);
    };

    const closeProjectModal = () => {
      window.removeEventListener('keydown', handleProjectModalKeyDown);
      const box = projectModal.querySelector('.modal-box');
      if (box) {
        box.classList.remove('scale-100', 'opacity-100');
        box.classList.add('scale-95', 'opacity-0');
      }
      setTimeout(() => {
        projectModal.classList.add('hidden');
        document.body.style.overflow = '';
        if (lastFocusedProjectTrigger && typeof lastFocusedProjectTrigger.focus === 'function') {
          lastFocusedProjectTrigger.focus();
        }
      }, 200);
    };

    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-project-id');
        openProjectModal(id, card);
      });
      // Allow Enter/Space activation on project cards
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const id = card.getAttribute('data-project-id');
          openProjectModal(id, card);
        }
      });
      if (!card.getAttribute('tabindex')) {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-haspopup', 'dialog');
      }
    });

    if (closeProjectModalBtn) {
      if (!closeProjectModalBtn.getAttribute('aria-label')) {
        closeProjectModalBtn.setAttribute('aria-label', 'Close project details modal');
      }
      closeProjectModalBtn.addEventListener('click', closeProjectModal);
    }

    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  // 10. Interactive Pricing Category Tabs Switcher (Full A11y, Keyboard Roving Tabindex & Browser Navigation)
  const pricingTabBtns = document.querySelectorAll('.pricing-tab-btn');
  const pricingTabContents = document.querySelectorAll('.pricing-tab-content');
  const pricingTabsContainer = document.getElementById('pricing-tabs-container');

  if (pricingTabBtns.length > 0 && pricingTabContents.length > 0) {
    if (pricingTabsContainer) {
      pricingTabsContainer.setAttribute('role', 'tablist');
      pricingTabsContainer.setAttribute('aria-label', 'Pricing Categories');
    }

    const tabList = Array.from(pricingTabBtns);

    const activateTab = (targetId, updateUrl = false) => {
      const activeBtn = tabList.find(b => b.getAttribute('data-target') === targetId) || tabList[0];
      if (!activeBtn) return;
      const effectiveTargetId = activeBtn.getAttribute('data-target');

      tabList.forEach(b => {
        const isCurrent = b === activeBtn;
        b.setAttribute('role', 'tab');
        b.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
        b.setAttribute('tabindex', isCurrent ? '0' : '-1');
        const cId = b.getAttribute('data-target');
        b.setAttribute('aria-controls', cId);
        if (!b.id) b.id = 'tab-btn-' + cId;

        if (isCurrent) {
          b.classList.add('active', 'bg-[#FF6600]', 'text-white', 'shadow-md');
          b.classList.remove('bg-white', 'text-slate-700', 'hover:bg-slate-100', 'border', 'border-slate-200');
        } else {
          b.classList.remove('active', 'bg-[#FF6600]', 'text-white', 'shadow-md');
          b.classList.add('bg-white', 'text-slate-700', 'hover:bg-slate-100', 'border', 'border-slate-200');
        }
      });

      pricingTabContents.forEach(content => {
        const isMatch = content.id === effectiveTargetId;
        content.setAttribute('role', 'tabpanel');
        content.setAttribute('aria-labelledby', activeBtn.id || ('tab-btn-' + effectiveTargetId));
        content.setAttribute('tabindex', '0');
        if (isMatch) {
          content.classList.remove('hidden');
        } else {
          content.classList.add('hidden');
        }
      });

      if (updateUrl && window.history && window.history.pushState) {
        if (window.location.hash !== '#' + effectiveTargetId) {
          window.history.pushState(null, '', '#' + effectiveTargetId);
        }
      }

      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    };

    // Setup initial attributes and keyboard arrow listeners
    tabList.forEach((btn, index) => {
      const targetId = btn.getAttribute('data-target');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-controls', targetId);
      btn.id = 'tab-btn-' + targetId;
      const isInitialActive = btn.classList.contains('active') || index === 0;
      btn.setAttribute('aria-selected', isInitialActive ? 'true' : 'false');
      btn.setAttribute('tabindex', isInitialActive ? '0' : '-1');

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        activateTab(targetId, true);
      });

      btn.addEventListener('keydown', (e) => {
        let newIndex = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          newIndex = (index + 1) % tabList.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          newIndex = (index - 1 + tabList.length) % tabList.length;
        } else if (e.key === 'Home') {
          e.preventDefault();
          newIndex = 0;
        } else if (e.key === 'End') {
          e.preventDefault();
          newIndex = tabList.length - 1;
        }

        if (newIndex !== null) {
          const nextBtn = tabList[newIndex];
          nextBtn.focus();
          const nextTarget = nextBtn.getAttribute('data-target');
          if (nextTarget) {
            activateTab(nextTarget, true);
          }
        }
      });
    });

    // Support browser Back/Forward navigation
    window.addEventListener('popstate', () => {
      if (window.location.hash) {
        const hashId = window.location.hash.replace('#', '');
        activateTab(hashId, false);
      } else if (tabList.length > 0) {
        const defaultTarget = tabList[0].getAttribute('data-target');
        activateTab(defaultTarget, false);
      }
    });

    window.addEventListener('hashchange', () => {
      if (window.location.hash) {
        const hashId = window.location.hash.replace('#', '');
        activateTab(hashId, false);
      }
    });

    if (window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      activateTab(hashId, false);
    } else if (tabList.length > 0) {
      const defaultTarget = tabList[0].getAttribute('data-target');
      activateTab(defaultTarget, false);
    }
  }
});
