/**
 * Digital Ustad - Interactive Engine & Premium Animations
 * Configured for Pakistan SMB Market (WhatsApp-First, Mobile-Dominant)
 */

// Central Brand Configuration
const DU_CONFIG = {
  whatsappNumber: '923001234567', // Replace with live WhatsApp (E.164 without +)
  displayPhone: '+92 300 1234567',
  officialEmail: 'contact@digitalustad.com',
  officeLocation: 'Lahore, Pakistan',
  verifiedWebsites: '10+',
  verifiedClients: '5+',
  yearsActive: '2+'
};

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

  // 8. Phone Validation & Unified WhatsApp Proposal Flow (FORM-01 to FORM-10)
  const isValidPakistanPhone = (phone) => {
    if (!phone) return false;
    const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
    // Accepts 03XXXXXXXXX, +923XXXXXXXXX, 00923XXXXXXXXX, 923XXXXXXXXX (JazzCash, EasyPaisa, Mobile)
    const pkRegex = /^((\+92)|(0092)|(92)|(0))?3[0-9]{9}$/;
    return pkRegex.test(cleaned);
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
        err.textContent = 'Please enter a valid Pakistan WhatsApp number (e.g. 0300 1234567).';
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

    // FORM-03, 04, 05, 08: Full formatted WhatsApp message with UTF-8 Urdu & emoji preservation
    const whatsappText = encodeURIComponent(
      `Assalam-o-Alaikum Digital Ustad! 🚀\n\nI would like to discuss a project inquiry for my business.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Service Interested:* ${service}\n*Budget:* ${budget}\n*Project Details:* ${message || 'No additional details provided'}\n\nPlease share your proposal, payment terms (Installments / Full), and estimated timeline.`
    );

    const whatsappUrl = `https://wa.me/${DU_CONFIG.whatsappNumber}?text=${whatsappText}`;

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

  // Attach submission handler to ALL proposal forms (modal and page-level)
  const allProposalForms = document.querySelectorAll('#quote-form, form.proposal-form');
  allProposalForms.forEach(form => {
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

  // Modal Open/Close Controls
  const getStartedBtns = document.querySelectorAll('.btn-get-started');
  const quoteModal = document.getElementById('quote-modal');
  const closeQuoteModalBtn = document.getElementById('close-quote-modal');

  if (quoteModal) {
    const openModal = () => {
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

    getStartedBtns.forEach(btn => btn.addEventListener('click', openModal));
    if (closeQuoteModalBtn) closeQuoteModalBtn.addEventListener('click', closeModal);

    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) closeModal();
    });
  }

  // 9. Portfolio Detailed Case Study Modal (DU-PORT-001 & DU-PORT-002 Fix)
  const portfolioData = {
    'spice-bistro': {
      title: 'Spice Bistro — Lahore',
      category: 'Restaurant & Hospitality Website',
      typeBadge: 'Sample Website Concept',
      industry: 'Food & Dining (Gulberg, Lahore)',
      deliverables: '5-Page Custom Web Experience + Digital QR Menu + 1-Click WhatsApp Ordering Flow',
      description: 'A complete digital presence engineered for high-end dining. Designed to eliminate expensive third-party delivery commission fees by routing customer reservations and takeout orders directly into WhatsApp.',
      features: [
        'Live Digital QR & Visual Food Menu',
        'Direct 1-Click WhatsApp Delivery & Takeout Flow',
        'Online Table Reservation Form',
        'Local SEO & Google Maps Sync Architecture',
        '100% Mobile Optimized for 360px+ Smartphones'
      ],
      stats: 'Delivered in 8 Working Days • Direct WhatsApp Orders Active',
      status: 'Live Concept Showcase',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
    },
    'glow-shine': {
      title: 'Glow & Shine Salon — Karachi',
      category: 'Beauty, Salon & Spa Booking Portal',
      typeBadge: 'Sample Website Concept',
      industry: 'Aesthetics & Wellness (DHA, Karachi)',
      deliverables: 'Custom Booking Portal + Service Menu + Stylist Portfolio Gallery + WhatsApp Bot',
      description: 'An elegant pastel-toned showcase designed to convert casual Instagram visitors into confirmed appointments. Enables clients to browse bridal tiers, facial treatments, and select stylist availability.',
      features: [
        'Interactive Bridal & Party Service Catalog',
        'Direct WhatsApp Slot Booking System',
        'Stylist Work Gallery with Before/After Showcase',
        'Google Business Profile Integration',
        'Fast 0.9s Load Speed on Mobile Connections'
      ],
      stats: 'Delivered in 7 Working Days • 360px Responsive Layout',
      status: 'Live Concept Showcase',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80'
    },
    'healthcare-clinic': {
      title: 'HealthCare Clinic — Islamabad',
      category: 'Medical & Diagnostic Healthcare Portal',
      typeBadge: 'Sample Website Concept',
      industry: 'Healthcare (Blue Area, Islamabad)',
      deliverables: 'Patient Information Portal + Doctor OPD Timings + Online Appointment Inquiry',
      description: 'A clean, HIPAA-conscious medical website engineered to establish patient trust. Features clear doctor specializations, clinic timings, branch locations, and instant appointment booking.',
      features: [
        'Physician Profiles & Specialty Directory',
        'Interactive OPD Schedule & Timings Table',
        'Direct WhatsApp Doctor Appointment Booking',
        'Google Maps Direction & Contact Locator',
        'Emergency 24/7 Helpline Quick-Tap Integration'
      ],
      stats: 'Delivered in 9 Working Days • Clean Accessibility & Trust Architecture',
      status: 'Live Concept Showcase',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80'
    },
    'dream-homes': {
      title: 'Dream Homes Real Estate — Lahore',
      category: 'Real Estate & Property Consultancy',
      typeBadge: 'Sample Website Concept',
      industry: 'Property & Investments (DHA & Bahria Town)',
      deliverables: 'High-Converting Property Catalog + Virtual Video Showcase + WhatsApp Lead Funnel',
      description: 'A high-converting real estate showcase designed for local and overseas Pakistani property investors. Integrates high-res image galleries, location filter tags, and direct lead routing to sales agents.',
      features: [
        'Featured Residential & Commercial Listings',
        'Filter by Sector, Price & Category',
        '1-Tap WhatsApp Lead Capture on Every Property',
        'Meta Ads Lead Funnel Integration',
        'Overseas Investor Direct Inquiry Form'
      ],
      stats: 'Delivered in 10 Working Days • Fast Lead Capture Architecture',
      status: 'Live Concept Showcase',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    },
    'fitzone-gym': {
      title: 'FitZone Gym & Fitness — Lahore',
      category: 'Fitness Center & Club Website',
      typeBadge: 'Sample Website Concept',
      industry: 'Health & Fitness (Johar Town, Lahore)',
      deliverables: 'Dynamic Club Website + Membership Tier Tables + Free Trial Funnel',
      description: 'A high-impact, dark-mode fitness portal built to convert local neighborhood foot traffic into paying members. Highlights equipment, personal training packages, and class timetables.',
      features: [
        'Transparent Membership Pricing Comparison',
        'Free 1-Day Trial Pass WhatsApp Lead Magnet',
        'Trainer Bios & Specialty Coaching Badges',
        'Class Schedule & Gym Facility Virtual Tour',
        'Integrated Instagram Social Proof Reel'
      ],
      stats: 'Delivered in 8 Working Days • Optimized for Mobile Inquiries',
      status: 'Live Concept Showcase',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80'
    },
    'bright-future': {
      title: 'Bright Future Academy — Islamabad',
      category: 'Education & Professional Training Institute',
      typeBadge: 'Sample Website Concept',
      industry: 'Education & Skills (Islamabad / Rawalpindi)',
      deliverables: 'Academic Course Catalog + Syllabus PDF Downloads + Online Admission Forms',
      description: 'An educational portal for a professional training institute. Provides comprehensive syllabus guides, batch schedules, certification credentials, and online enrollment forms.',
      features: [
        'Course Syllabus & Curriculum Directory',
        'Direct WhatsApp Course Advisor Consultation',
        'Online Admission & Batch Registration Form',
        'Faculty Credentials & Certification Badges',
        'Student Testimonials & Career Outcomes'
      ],
      stats: 'Delivered in 9 Working Days • Complete Lead Funnel Integrated',
      status: 'Live Concept Showcase',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80'
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
