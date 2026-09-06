/**
 * Digital Ustad - Interactive Engine & Premium Animations
 */

document.addEventListener('DOMContentLoaded', () => {
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

  // 3. Mobile Navigation Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuDrawer = document.getElementById('mobile-drawer');
  const closeMobileMenuBtn = document.getElementById('close-mobile-menu');
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

    if (closeMobileMenuBtn) closeMobileMenuBtn.addEventListener('click', closeDrawer);
    mobileNavLinks.forEach(link => link.addEventListener('click', closeDrawer));
  }

  // 4. Counter Animation on Scroll
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const suffix = stat.getAttribute('data-suffix') || '';
      const duration = 2000;
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        const currentVal = Math.floor(ease * target);
        
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
    }, { threshold: 0.25 });

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
        // Close all
        document.querySelectorAll('.faq-answer').forEach(a => a.classList.add('hidden'));
        document.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');

        if (!isOpen) {
          answer.classList.remove('hidden');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    }
  });

  // 8. Quotation / Get Started Modal
  const getStartedBtns = document.querySelectorAll('.btn-get-started');
  const quoteModal = document.getElementById('quote-modal');
  const closeQuoteModalBtn = document.getElementById('close-quote-modal');
  const quoteForm = document.getElementById('quote-form');

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

    if (quoteForm) {
      quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('client-name')?.value || 'Valued Client';
        const phone = document.getElementById('client-phone')?.value || '';
        const service = document.getElementById('client-service')?.value || 'Website Development';
        const budget = document.getElementById('client-budget')?.value || 'PKR 30,000+';
        const message = document.getElementById('client-message')?.value || '';

        const whatsappNumber = '923001234567';
        const text = encodeURIComponent(
          `Hello Digital Ustad! 🚀\n\nI want to discuss a new project.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Service Interested:* ${service}\n*Budget:* ${budget}\n*Details:* ${message}\n\nPlease share proposal & timeline.`
        );

        window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
        closeModal();
      });
    }
  }

  // 9. Portfolio Project Details Lightbox Modal
  const portfolioData = {
    'spice-bistro': {
      title: 'Spice Bistro',
      category: 'Restaurant & Fine Dining Website',
      description: 'A complete digital presence for a premium restaurant featuring modern online menu exploration, table reservations, live WhatsApp ordering integration, and high-speed mobile UX.',
      features: ['Digital QR & Online Menu', 'Table Booking Management', 'WhatsApp 1-Click Ordering', 'Local SEO & Google Maps Sync'],
      stats: '340% increase in online reservations in 60 days',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
    },
    'glow-shine': {
      title: 'Glow & Shine Salon',
      category: 'Luxury Salon & Spa Website',
      description: 'Elegant, pastel-themed booking portal for an upscale salon. Customers can choose stylists, view bridal/party packages, and book appointment slots easily.',
      features: ['Real-time Appointment Calendar', 'Service Package Catalog', 'Stylist Portfolio Gallery', 'SMS & WhatsApp Reminders'],
      stats: '500+ monthly appointments booked online',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80'
    },
    'healthcare-clinic': {
      title: 'HealthCare Clinic',
      category: 'Medical & Diagnostic Clinic',
      description: 'A clean, patient-friendly medical portal designed to build trust. Features doctor profiles, appointment scheduling, timings, and location navigation.',
      features: ['Doctor Profiles & Specialties', 'Online Appointment Request', 'Clinic Timings & Branch Info', 'Patient Testimonials & Reviews'],
      stats: '2.5x increase in new patient appointments',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80'
    },
    'dream-homes': {
      title: 'Dream Homes Real Estate',
      category: 'Real Estate & Property Portal',
      description: 'High-converting real estate showcase with property listings, HD photo galleries, virtual tour links, and WhatsApp lead capture for interested buyers and investors.',
      features: ['Interactive Property Listings', 'WhatsApp Direct Inquiry Buttons', 'Filter by Location & Price', 'Lead Generation Meta Ads Integration'],
      stats: 'Over PKR 45M+ worth of property leads generated',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    },
    'fitzone-gym': {
      title: 'FitZone Gym & Fitness',
      category: 'Fitness Center & Gym Website',
      description: 'High-energy, dynamic website built for a top-tier gym. Promotes membership packages, personal training schedules, and free trial workout signups.',
      features: ['Membership Tier Pricing Tables', 'Free Trial Pass Lead Funnel', 'Trainer Bios & Workout Schedule', 'Instagram Feed Auto-Sync'],
      stats: '85+ new active gym memberships in month one',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80'
    },
    'bright-future': {
      title: 'Bright Future Academy',
      category: 'Education & Training Institute',
      description: 'Comprehensive academic portal for an institute offering professional courses and coaching. Features course catalogs, syllabus downloads, and student admission forms.',
      features: ['Course Curriculum & Syllabus', 'Online Admission Application', 'Student Portal Login Gateway', 'Fee Calculator & Inquiry Form'],
      stats: '1,200+ course inquiries and admissions collected',
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

      document.getElementById('project-modal-title').textContent = data.title;
      document.getElementById('project-modal-category').textContent = data.category;
      document.getElementById('project-modal-desc').textContent = data.description;
      document.getElementById('project-modal-stats').textContent = data.stats;
      document.getElementById('project-modal-img').src = data.image;

      const featuresList = document.getElementById('project-modal-features');
      if (featuresList) {
        featuresList.innerHTML = data.features.map(f => `
          <li class="flex items-center text-slate-700 text-sm">
            <span class="w-2 h-2 rounded-full bg-[#FF6600] mr-2 flex-shrink-0"></span>
            ${f}
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
});
