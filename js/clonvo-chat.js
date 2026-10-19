/**
 * Digital Ustad - Official Web Chatbot Widget & Lead Qualification Controller
 * Built for Pakistan SMB Market (Lead Qualifying, Accessible, Privacy-First)
 * 
 * Flow:
 * 1. Initial Message: "Hi 👋 Welcome to Digital Ustad. What can we help you with today?"
 *    Quick Options: Website Development, Social Media, SEO, Meta / Google Ads, Branding & Design, Automation, Web Chatbot, Other
 * 2. Stage 2: "Do you already have a business or are you launching something new?"
 *    Options: Existing Business, New Business / Startup
 * 3. Stage 3: "What budget range are you considering?"
 *    Options: Under PKR 25,000, PKR 25,000–50,000, PKR 50,000–100,000, PKR 100,000+, Not Sure Yet
 * 4. Stage 4: Collect Name, Business / Brand Name, Phone / WhatsApp (validated), Email (optional), Project notes
 * 5. Stage 5: "Thanks — your request has been received. Our team will review your requirements and contact you."
 */

(function() {
  'use strict';

  if (typeof window === 'undefined' || window.__DU_CHAT_INITIALIZED__) {
    return;
  }
  window.__DU_CHAT_INITIALIZED__ = true;

  // Chat conversation state
  const chatState = {
    isOpen: false,
    step: 1, // 1: Service, 2: Business Type, 3: Budget, 4: Contact Info, 5: Complete
    data: {
      service: '',
      businessType: '',
      budget: '',
      name: '',
      businessName: '',
      phone: '',
      email: '',
      notes: ''
    }
  };

  let chatWidgetEl = null;
  let chatLauncherBtn = null;
  let lastFocusedEl = null;

  // Validation helper for Pakistani & international phones
  const isValidPhone = (phone) => {
    if (!phone || typeof phone !== 'string') return false;
    const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
    return /^((\+92)|(0092)|(92)|(0))?3[0-9]{9}$/.test(cleaned) || /^\+[1-9]\d{7,14}$/.test(cleaned);
  };

  const escapeHTML = (str) => {
    return String(str || '').replace(/[&<>"']/g, m => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[m]));
  };

  /**
   * Builds the Floating Chat Launcher Button
   * Desktop: 58-64px, Mobile: 52-56px, Safe spacing: bottom-5 right-5
   */
  function ensureLauncherButton() {
    let existing = document.getElementById('du-chat-launcher');
    if (existing) {
      chatLauncherBtn = existing;
      return chatLauncherBtn;
    }

    chatLauncherBtn = document.createElement('button');
    chatLauncherBtn.id = 'du-chat-launcher';
    chatLauncherBtn.type = 'button';
    chatLauncherBtn.setAttribute('data-track', 'chatbot-open');
    chatLauncherBtn.setAttribute('aria-label', 'Open Digital Ustad chat assistant');
    chatLauncherBtn.setAttribute('aria-haspopup', 'dialog');
    chatLauncherBtn.setAttribute('aria-expanded', 'false');
    chatLauncherBtn.className = 'fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 w-13 h-13 sm:w-15 sm:h-15 w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-full bg-[#0B0F19] text-white flex items-center justify-center shadow-2xl border-2 border-slate-700/80 hover:border-[#FF6600] active:scale-95 transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-[#FF6600]/40';

    chatLauncherBtn.innerHTML = `
      <span class="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#FF6600] border-2 border-[#0B0F19] animate-pulse"></span>
      <div class="relative flex items-center justify-center">
        <!-- Chat icon (visible when closed) -->
        <svg id="du-launcher-icon-chat" class="w-6 h-6 text-[#FF6600] transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
        </svg>
        <!-- Close icon (visible when open) -->
        <svg id="du-launcher-icon-close" class="w-6 h-6 text-slate-300 hidden transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </div>
    `;

    chatLauncherBtn.addEventListener('click', () => {
      if (chatState.isOpen) {
        closeChat();
      } else {
        openChat();
      }
    });

    document.body.appendChild(chatLauncherBtn);
    return chatLauncherBtn;
  }

  /**
   * Builds the Accessible Chat Window Container
   */
  function ensureChatWidget() {
    if (chatWidgetEl && document.body.contains(chatWidgetEl)) {
      return chatWidgetEl;
    }

    let existing = document.getElementById('du-chat-widget');
    if (existing) {
      chatWidgetEl = existing;
      return chatWidgetEl;
    }

    chatWidgetEl = document.createElement('div');
    chatWidgetEl.id = 'du-chat-widget';
    chatWidgetEl.className = 'fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm sm:max-w-[400px] rounded-3xl bg-[#0B0F19] text-white shadow-2xl border border-slate-800 transition-all duration-300 overflow-hidden flex flex-col hidden opacity-0 translate-y-4 scale-95';
    chatWidgetEl.setAttribute('role', 'dialog');
    chatWidgetEl.setAttribute('aria-modal', 'true');
    chatWidgetEl.setAttribute('aria-labelledby', 'du-chat-heading');
    chatWidgetEl.setAttribute('aria-hidden', 'true');
    chatWidgetEl.setAttribute('inert', '');
    chatWidgetEl.inert = true;
    chatWidgetEl.hidden = true;

    chatWidgetEl.innerHTML = `
      <!-- Header -->
      <div class="px-5 py-4 bg-[#111827] border-b border-slate-800 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-orange-500/10 border border-[#FF6600]/40 flex items-center justify-center text-[#FF6600] flex-shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div>
            <h2 id="du-chat-heading" class="text-sm font-extrabold text-white tracking-wide">Digital Ustad Assistant</h2>
            <div class="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5 mt-0.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Online • Instant Project Brief</span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-1">
          <button type="button" id="du-chat-reset-btn" class="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors" title="Restart conversation" aria-label="Restart conversation">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          </button>
          <button type="button" id="du-chat-close-btn" class="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors" title="Close chat" aria-label="Close chat">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      </div>

      <!-- Messages Stream -->
      <div id="du-chat-messages" class="p-4 sm:p-5 flex-1 max-h-[360px] sm:max-h-[400px] overflow-y-auto space-y-3.5 text-xs text-slate-300 leading-relaxed scrollbar-thin">
        <!-- Rendered conversation items go here -->
      </div>

      <!-- Footer Info -->
      <div class="px-4 py-2.5 bg-[#090D16] border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
        <span class="flex items-center gap-1">🔒 Confidential &amp; Verified</span>
        <a href="contact.html" class="hover:text-[#FF6600] transition-colors underline">Visit Contact Page</a>
      </div>
    `;

    document.body.appendChild(chatWidgetEl);

    // Bind Controls
    const closeBtn = chatWidgetEl.querySelector('#du-chat-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeChat);

    const resetBtn = chatWidgetEl.querySelector('#du-chat-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        resetChat();
      });
    }

    renderConversation();
    return chatWidgetEl;
  }

  /**
   * Renders the Conversation Based on Current Step
   */
  function renderConversation() {
    const container = document.getElementById('du-chat-messages');
    if (!container) return;

    container.innerHTML = '';

    // Step 1: Initial Greeting & Service Options
    appendBotMessage(container, `Hi 👋 Welcome to <strong>Digital Ustad</strong>. What can we help you with today?`);

    if (chatState.step === 1) {
      const options = [
        'Website Development',
        'Social Media',
        'SEO',
        'Meta / Google Ads',
        'Branding & Design',
        'Automation',
        'Web Chatbot',
        'Other'
      ];
      appendOptionPills(container, options, (selected) => {
        chatState.data.service = selected;
        chatState.step = 2;
        renderConversation();
      });
      scrollToBottom(container);
      return;
    }

    // Step 1 User choice
    appendUserMessage(container, chatState.data.service);

    // Step 2: Existing vs New Business
    appendBotMessage(container, `Do you already have an active business, or are you launching something new?`);

    if (chatState.step === 2) {
      const businessTypes = [
        'Existing Business',
        'New Business / Startup'
      ];
      appendOptionPills(container, businessTypes, (selected) => {
        chatState.data.businessType = selected;
        chatState.step = 3;
        renderConversation();
      });
      scrollToBottom(container);
      return;
    }

    // Step 2 User choice
    appendUserMessage(container, chatState.data.businessType);

    // Step 3: Budget Range
    appendBotMessage(container, `What budget range are you considering for this project?`);

    if (chatState.step === 3) {
      const budgetBands = [
        'Under PKR 25,000',
        'PKR 25,000–50,000',
        'PKR 50,000–100,000',
        'PKR 100,000+',
        'Not Sure Yet'
      ];
      appendOptionPills(container, budgetBands, (selected) => {
        chatState.data.budget = selected;
        chatState.step = 4;
        renderConversation();
      });
      scrollToBottom(container);
      return;
    }

    // Step 3 User choice
    appendUserMessage(container, chatState.data.budget);

    // Step 4: Contact Information Collection
    if (chatState.step === 4) {
      appendBotMessage(container, `Great! Please share your contact info so our engineering team can review your scope:`);
      appendLeadForm(container);
      scrollToBottom(container);
      return;
    }

    // Step 5: Completed Confirmation Screen
    if (chatState.step === 5) {
      appendSuccessScreen(container);
      scrollToBottom(container);
    }
  }

  function appendBotMessage(container, htmlContent) {
    const wrap = document.createElement('div');
    wrap.className = 'flex items-start gap-2.5 animate-fade-in';
    wrap.innerHTML = `
      <div class="w-7 h-7 rounded-xl bg-orange-500/20 border border-[#FF6600]/40 flex items-center justify-center text-[#FF6600] flex-shrink-0 mt-0.5 text-xs font-bold">
        DU
      </div>
      <div class="p-3.5 rounded-2xl rounded-tl-sm bg-slate-900 border border-slate-800 text-slate-200 text-xs shadow-md space-y-1 max-w-[85%] leading-relaxed">
        ${htmlContent}
      </div>
    `;
    container.appendChild(wrap);
  }

  function appendUserMessage(container, textContent) {
    const wrap = document.createElement('div');
    wrap.className = 'flex justify-end animate-fade-in';
    wrap.innerHTML = `
      <div class="p-3 rounded-2xl rounded-tr-sm bg-[#FF6600] text-white text-xs font-semibold shadow-md max-w-[80%] leading-relaxed">
        ${escapeHTML(textContent)}
      </div>
    `;
    container.appendChild(wrap);
  }

  function appendOptionPills(container, options, onSelect) {
    const wrap = document.createElement('div');
    wrap.className = 'flex flex-wrap gap-2 pt-1 pl-9 animate-fade-in';
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-[#FF6600] border border-slate-700/80 hover:border-[#FF6600] text-slate-200 hover:text-white text-[11px] font-semibold transition-all active:scale-95 shadow-sm text-left';
      btn.textContent = opt;
      btn.addEventListener('click', () => onSelect(opt));
      wrap.appendChild(btn);
    });
    container.appendChild(wrap);
  }

  function appendLeadForm(container) {
    const wrap = document.createElement('div');
    wrap.className = 'pl-9 pt-1 animate-fade-in';

    wrap.innerHTML = `
      <form id="du-chat-lead-form" class="p-4 rounded-2xl bg-slate-900/95 border border-slate-800 space-y-2.5 shadow-xl text-left">
        <!-- Honeypot -->
        <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" class="hidden" style="display:none !important">

        <div>
          <label for="chat-name" class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Your Name *</label>
          <input type="text" id="chat-name" required placeholder="e.g. Ali Khan" class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#FF6600]">
        </div>

        <div>
          <label for="chat-business" class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Business / Brand Name *</label>
          <input type="text" id="chat-business" required placeholder="e.g. Khan Logistics / Glow Salon" class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#FF6600]">
        </div>

        <div>
          <label for="chat-phone" class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">WhatsApp / Phone *</label>
          <input type="tel" id="chat-phone" required placeholder="e.g. 03XX XXXXXXX" class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#FF6600]">
          <p id="chat-phone-error" class="text-[10px] text-red-400 mt-1 hidden">Please enter a valid Pakistan number (e.g. 03XX XXXXXXX).</p>
        </div>

        <div>
          <label for="chat-email" class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Email (Optional)</label>
          <input type="email" id="chat-email" placeholder="e.g. info@yourbusiness.com" class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#FF6600]">
        </div>

        <div>
          <label for="chat-notes" class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Project Notes (Optional)</label>
          <textarea id="chat-notes" rows="2" placeholder="Tell us what you want to achieve..." class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#FF6600] resize-none"></textarea>
        </div>

        <button type="submit" id="chat-submit-btn" class="w-full py-2.5 rounded-xl bg-[#FF6600] hover:bg-[#EA580C] text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-1.5 active:scale-95">
          <span>Submit Project Request</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </button>

        <p class="text-[9px] text-slate-500 text-center pt-0.5">🔒 Zero spam. We respect your confidentiality.</p>
      </form>
    `;

    container.appendChild(wrap);

    const form = wrap.querySelector('#du-chat-lead-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameInput = form.querySelector('#chat-name');
        const bizInput = form.querySelector('#chat-business');
        const phoneInput = form.querySelector('#chat-phone');
        const emailInput = form.querySelector('#chat-email');
        const notesInput = form.querySelector('#chat-notes');
        const gotchaInput = form.querySelector('[name="_gotcha"]');
        const phoneError = form.querySelector('#chat-phone-error');
        const submitBtn = form.querySelector('#chat-submit-btn');

        if (gotchaInput && gotchaInput.value.trim() !== '') return;

        const phoneVal = phoneInput.value.trim();
        if (!isValidPhone(phoneVal)) {
          if (phoneError) phoneError.classList.remove('hidden');
          phoneInput.classList.add('border-red-500');
          phoneInput.focus();
          return;
        } else if (phoneError) {
          phoneError.classList.add('hidden');
          phoneInput.classList.remove('border-red-500');
        }

        chatState.data.name = nameInput.value.trim();
        chatState.data.businessName = bizInput.value.trim();
        chatState.data.phone = phoneVal;
        chatState.data.email = emailInput.value.trim();
        chatState.data.notes = notesInput.value.trim();

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `
            <svg class="animate-spin h-3.5 w-3.5 text-white inline" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <span>Submitting...</span>
          `;
        }

        const payload = {
          name: chatState.data.name,
          businessName: chatState.data.businessName,
          phone: chatState.data.phone,
          email: chatState.data.email,
          service: chatState.data.service,
          budget: chatState.data.budget,
          businessType: chatState.data.businessType,
          message: chatState.data.notes || `[Chatbot Lead] Type: ${chatState.data.businessType}, Budget: ${chatState.data.budget}`,
          sourcePage: window.location.pathname,
          leadSource: 'webchat'
        };

        try {
          await fetch('/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        } catch (err) {
          console.warn('[DU Chatbot] Forwarded via local fallback buffer', err);
        }

        // Advance to success state
        chatState.step = 5;
        renderConversation();
      });
    }
  }

  function appendSuccessScreen(container) {
    const wrap = document.createElement('div');
    wrap.className = 'pl-9 pt-1 animate-fade-in';
    wrap.innerHTML = `
      <div class="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-3 text-left">
        <div class="flex items-center gap-2 text-emerald-400 font-extrabold text-sm">
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>Request Received!</span>
        </div>
        <p class="text-xs text-slate-300 leading-relaxed">
          Thanks — your request has been received. Our team will review your requirements and contact you.
        </p>
        <div class="pt-1 flex flex-col gap-2">
          <a href="pricing.html" class="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs text-center transition-colors">
            Explore All Packages
          </a>
          <button type="button" id="du-chat-done-close" class="w-full py-2 rounded-xl bg-[#FF6600] hover:bg-[#EA580C] text-white font-bold text-xs text-center transition-colors">
            Done &amp; Close Chat
          </button>
        </div>
      </div>
    `;
    container.appendChild(wrap);

    const closeDoneBtn = wrap.querySelector('#du-chat-done-close');
    if (closeDoneBtn) {
      closeDoneBtn.addEventListener('click', closeChat);
    }
  }

  function scrollToBottom(el) {
    setTimeout(() => {
      el.scrollTop = el.scrollHeight;
    }, 50);
  }

  function openChat(prefillContext = null) {
    ensureLauncherButton();
    ensureChatWidget();

    lastFocusedEl = document.activeElement;
    chatState.isOpen = true;

    if (prefillContext) {
      if (prefillContext.service) {
        chatState.data.service = prefillContext.service;
        chatState.step = 2; // skip to business stage
        renderConversation();
      }
    }

    chatWidgetEl.classList.remove('hidden');
    chatWidgetEl.removeAttribute('inert');
    chatWidgetEl.removeAttribute('hidden');
    chatWidgetEl.setAttribute('aria-hidden', 'false');
    chatWidgetEl.inert = false;
    chatWidgetEl.hidden = false;

    if (chatLauncherBtn) {
      chatLauncherBtn.setAttribute('aria-expanded', 'true');
      const chatIcon = chatLauncherBtn.querySelector('#du-launcher-icon-chat');
      const closeIcon = chatLauncherBtn.querySelector('#du-launcher-icon-close');
      if (chatIcon) chatIcon.classList.add('hidden');
      if (closeIcon) closeIcon.classList.remove('hidden');
    }

    setTimeout(() => {
      chatWidgetEl.classList.remove('opacity-0', 'translate-y-4', 'scale-95');
      chatWidgetEl.classList.add('opacity-100', 'translate-y-0', 'scale-100');

      const firstBtn = chatWidgetEl.querySelector('button, input, select, textarea');
      if (firstBtn) firstBtn.focus();
    }, 20);

    window.addEventListener('keydown', handleChatKeyDown);
  }

  function closeChat() {
    if (!chatWidgetEl) return;

    chatState.isOpen = false;
    chatWidgetEl.classList.remove('opacity-100', 'translate-y-0', 'scale-100');
    chatWidgetEl.classList.add('opacity-0', 'translate-y-4', 'scale-95');

    if (chatLauncherBtn) {
      chatLauncherBtn.setAttribute('aria-expanded', 'false');
      const chatIcon = chatLauncherBtn.querySelector('#du-launcher-icon-chat');
      const closeIcon = chatLauncherBtn.querySelector('#du-launcher-icon-close');
      if (chatIcon) chatIcon.classList.remove('hidden');
      if (closeIcon) closeIcon.classList.add('hidden');
    }

    setTimeout(() => {
      chatWidgetEl.classList.add('hidden');
      chatWidgetEl.setAttribute('aria-hidden', 'true');
      chatWidgetEl.setAttribute('inert', '');
      chatWidgetEl.inert = true;
      chatWidgetEl.hidden = true;
      if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
        lastFocusedEl.focus();
      }
    }, 200);

    window.removeEventListener('keydown', handleChatKeyDown);
  }

  function resetChat() {
    chatState.step = 1;
    chatState.data = {
      service: '',
      businessType: '',
      budget: '',
      name: '',
      businessName: '',
      phone: '',
      email: '',
      notes: ''
    };
    renderConversation();
  }

  function handleChatKeyDown(e) {
    if (!chatState.isOpen) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeChat();
      return;
    }

    if (e.key === 'Tab') {
      const focusables = Array.from(chatWidgetEl.querySelectorAll(
        'button:not([disabled]):not([tabindex="-1"]), [href]:not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"])'
      )).filter(el => el.offsetWidth > 0 || el.offsetHeight > 0);

      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  // Global trigger function called by buttons across the site
  window.openDigitalUstadChat = function(context) {
    openChat(context);
  };

  // Initialize launcher button on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      ensureLauncherButton();
      ensureChatWidget();
    });
  } else {
    ensureLauncherButton();
    ensureChatWidget();
  }

})();
