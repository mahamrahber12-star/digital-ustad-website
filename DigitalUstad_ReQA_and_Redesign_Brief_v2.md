# Digital Ustad - Re-QA and Website Redesign Brief v2

**Website:** https://digitalustad.co/  
**Review date:** 22 September 2026 (UTC)  
**Purpose:** Current-state QA, WhatsApp-to-webchat migration, Pakistani-market positioning, visual refresh, and developer acceptance criteria.

## 1. Executive decision

Digital Ustad has a usable foundation and a consistent navy/orange identity, but the current website feels closer to a package-heavy freelance agency site than a mature digital solutions provider. The redesign should position Digital Ustad as one accountable growth partner for Pakistani small and medium businesses.

The conversion model should be changed as follows:

- **WhatsApp will exist only on the Contact page.**
- **Every other public page will use the web chatbot, a normal Contact link, or a website lead form.**
- The floating green WhatsApp widget must be removed globally and replaced by the **Clonvo.chat** webchat widget.
- Service names and content about **WhatsApp Automation** remain on the website because it is a service. Only direct `wa.me` actions are restricted.
- Pricing, scope, payment, support, delivery and cancellation terms must be reconciled before the visual redesign is promoted.

## 2. Current live-site findings

The following was directly observed across 17 public routes.

| Finding | Current result | Required result |
|---|---:|---:|
| Direct `wa.me` links across the 17 reviewed routes | 91 | Contact page only |
| Direct `wa.me` links outside `/contact` | 87 | 0 |
| Direct `wa.me` links on `/pricing` | 29 | 0 |
| Clonvo.chat widgets detected | 0 | 1 shared widget on every business page |
| Pages with canonical tags | 0 of 17 | All indexable pages |
| Pages with Open Graph metadata | 0 of 17 | All indexable pages |
| Pages with JSON-LD | 0 of 17 | Relevant pages only, using truthful data |
| Pages with a `<main>` landmark | 4 of 17 | All content pages |

### High-priority issues still present

1. **The public WhatsApp number is still `+92 300 0000000`.** The business owner must verify the actual controlled number before any WhatsApp link is published.
2. **Growth package arithmetic is inconsistent.** The advertised price is PKR 42,999, while the visible installments are PKR 10,750 + 21,500 + 10,750 = PKR 43,000.
3. **Growth delivery timing conflicts.** Pricing says 12-15 working days; Terms says 10-14 working days.
4. **Retainer cancellation conflicts.** Social Media says 15-day exit flexibility; Refund Policy says seven days and calls retainers no-lock-in. SEO simultaneously states a three-month commitment.
5. **Lite upfront discount remains unclear.** Terms says the five percent upfront discount applies to Lite, while the Lite card still presents PKR 17,999 as the full kickoff amount.
6. **The site has strong claims but weak public proof.** The website claims 10+ delivered websites and active SEO/ads clients, while the visible portfolio is still composed of sample concepts.
7. **The current homepage is visually busy.** Multiple badges, ticker messages, floating WhatsApp, package cards, demo UI and repeated CTAs compete for attention.
8. **SEO and accessibility structure remains incomplete.** Canonicals, social metadata, structured data and most main landmarks are missing. The proposal modal and portfolio controls require proper keyboard behavior.

## 3. Mandatory WhatsApp rule

### Allowed

- A normal **Contact** navigation link on every page that routes to `/contact`.
- On `/contact`, one primary button labeled **Chat on WhatsApp** using the owner-approved business number.
- On `/contact`, the verified number can also appear as text inside the contact-information card.
- Content describing WhatsApp Automation as a service.

### Remove

- Every floating WhatsApp icon outside `/contact`.
- Every `wa.me` or `api.whatsapp.com` link outside `/contact`.
- Footer WhatsApp icons/links outside `/contact`.
- Package buttons that open WhatsApp drafts.
- Service-page buttons labeled WhatsApp Us.
- Forms outside `/contact` that turn form data into a WhatsApp draft.
- Generic labels such as **Chat with us** when the destination is WhatsApp.

### Recommended Contact-page behavior

The Contact page should provide three clear options:

1. **Submit Project Brief** - sends the lead to the website backend, email or CRM.
2. **Chat on WhatsApp** - the only direct WhatsApp action on the site.
3. **Book a Discovery Call** - optional scheduling link if a booking system is added.

The WhatsApp button should not be the form submission mechanism. The form must show an on-page success or error state and should retain the service and package selected by the visitor.

## 4. CTA replacement matrix

| Current control | New behavior | New label |
|---|---|---|
| Floating WhatsApp widget | Open the API webchat | Ask Digital Ustad |
| Header Get Started | Route to `/contact` | Get a Free Consultation |
| Homepage WhatsApp Quick Chat | Open webchat with `intent=general_consultation` | Ask Our Digital Assistant |
| Package CTA on Home/Pricing | Open webchat with package context | Discuss This Plan |
| Service-page WhatsApp Us | Open webchat with service context | Discuss This Service |
| Industry solution CTA | Open webchat with industry context | Explore This Solution |
| Footer WhatsApp link | Route to `/contact` | Contact Our Team |
| Send Proposal Request via WhatsApp | Submit normal web form | Submit Project Brief |
| Contact-page WhatsApp button | Keep as the only direct WhatsApp CTA | Chat on WhatsApp |

Every chatbot-opening CTA must pass context, for example:

```js
openDigitalUstadChat({
  intent: "package_consultation",
  service: "web-development",
  packageId: "starter-5-page",
  sourcePage: window.location.pathname
});
```

## 5. Clonvo.chat webchat specification

### Platform decision

- Use **Clonvo.chat**, Digital Ustad's own SaaS platform, as the exclusive website chat layer.
- Do not add a second third-party chatbot, generic live-chat plugin or separate floating support widget.
- Present the visitor-facing assistant as **Digital Ustad Assistant**. A small **Powered by Clonvo.chat** attribution may appear in the footer of the chat panel.
- Keep the Clonvo tenant, assistant configuration, knowledge base, conversation data and lead-routing destinations under business-controlled accounts.
- Use Clonvo's supported embed/SDK for the widget and its API or webhook layer for secure lead and conversation events.

### Widget placement

- Fixed to the bottom-right on desktop.
- Respect safe-area spacing and mobile navigation on small screens.
- Use one instance per page. It must not overlap cookie notices, forms or primary CTAs.
- Use a navy launcher with an orange accent. Do not style it as a green WhatsApp clone.
- Launcher label on desktop: **Ask Digital Ustad**.
- Icon-only mobile launcher must have `aria-label="Open Digital Ustad assistant"`.
- Load Clonvo.chat asynchronously so the page remains usable if the service is slow or temporarily unavailable.

### Welcome copy

**English:**  
Welcome to Digital Ustad. I can help you compare website, marketing, SEO, branding and automation solutions. What would you like to improve?

**Roman Urdu:**  
Assalam-o-Alaikum! Main Digital Ustad assistant hoon. Aap website, digital marketing, SEO, branding ya automation mein kis cheez ki help chahte hain?

### Quick actions

- Website Packages
- Digital Marketing
- SEO & Google Business
- Branding & Design
- Automation Solutions
- Talk to the Team

### Core conversation flow

1. Identify the visitor's goal.
2. Ask the business type: restaurant, clinic, salon, real estate, education, retail, ecommerce, professional service, or other.
3. Ask the current challenge: no website, weak leads, low Google visibility, inconsistent social content, manual customer handling, or custom need.
4. Suggest one or two relevant services and explain why.
5. Ask the budget band and desired timeline.
6. Offer a short summary.
7. Ask consent before collecting name, email or phone.
8. Submit the qualified lead to the configured backend/CRM.
9. Show **Continue on Contact Page**. Only on the Contact page may the visitor choose WhatsApp.

### Clonvo configuration

- Create a dedicated Digital Ustad workspace/tenant and production assistant in Clonvo.chat.
- Train the assistant only on the approved services, packages, prices, delivery timelines, FAQs, policies and case studies.
- Apply a Digital Ustad system prompt that prevents invented prices, guarantees and delivery claims.
- Attach page, service, package, campaign and language context when the Clonvo session starts.
- Route qualified leads to the approved email, CRM or automation webhook with source-page attribution.
- Configure human-handoff intent to open the Contact page; WhatsApp must never be exposed by the widget on non-contact pages.
- Separate staging and production assistant IDs so testing conversations do not pollute production analytics.

### Recommended request contract

```json
{
  "session_id": "generated-browser-session-id",
  "message": "I need a website for my clinic",
  "language": "en",
  "context": {
    "page_url": "/solutions",
    "service": "web-development",
    "package_id": null,
    "industry": "healthcare"
  },
  "lead": null
}
```

### Recommended response contract

```json
{
  "reply": "A clinic website should focus on doctor profiles, OPD schedules and appointment requests.",
  "quick_replies": ["See Website Plans", "Discuss Appointment Automation"],
  "suggested_action": {
    "type": "open_contact",
    "label": "Continue on Contact Page",
    "url": "/contact"
  }
}
```

### Integration and security rules

- The Clonvo.chat API/base URL, tenant ID and assistant ID must come from environment configuration.
- A secret API key must never be exposed in browser JavaScript. Use a server-side proxy or short-lived token.
- Send only the minimum page context needed to improve the answer.
- Do not send the visitor's complete browsing history.
- Obtain consent before transmitting a phone number, email or project details.
- Apply rate limiting, abuse protection, input length limits and output sanitization.
- Set a practical timeout and show a retry state.
- Do not render model output as unsanitized HTML.
- Log technical errors without logging full private conversations by default.
- Add a concise privacy link inside the chat.
- Verify Clonvo webhook signatures before accepting lead or conversation events.
- Use idempotency keys for lead submission so retries do not create duplicate leads.

### Failure states

| Situation | Visitor message | Action |
|---|---|---|
| API timeout | The assistant is taking longer than expected. | Retry button and Contact link |
| API unavailable | The assistant is temporarily unavailable. | Open Contact page |
| Empty response | I could not generate a useful answer. | Show quick actions again |
| User requests human | Our team can continue from here. | Route to Contact page |
| Connection lost | You appear to be offline. | Preserve the draft locally |

### Analytics events

Track events without storing conversation content in analytics:

- `chat_opened`
- `chat_quick_action_selected`
- `chat_service_recommended`
- `chat_lead_consent_given`
- `chat_lead_submitted`
- `chat_contact_page_opened`
- `chat_api_error`

## 6. Positioning for the Pakistani market

### Recommended brand position

**Digital Ustad is an accountable digital growth partner for Pakistani businesses, combining websites, marketing, local visibility, creative and automation in one team.**

The website should sell confidence, clarity and business outcomes. It should avoid appearing like a cheap freelancer marketplace or an unverified performance-claims page.

### Primary audiences

- Growing local businesses in Lahore, Karachi, Islamabad and other Pakistani cities.
- Clinics, salons, restaurants, retail stores, academies and real-estate businesses.
- Ecommerce and service businesses that already spend on Meta or Google.
- Early-stage companies that need an outsourced digital team.

### Local trust signals

Show only facts that can be verified:

- Lahore-based operating team and Pakistan-wide delivery.
- PKT support hours and expected response time.
- Transparent PKR pricing.
- Raast, bank transfer, EasyPaisa and JazzCash availability.
- Written scope, invoices, milestone plan and handover process.
- Client-owned domains, analytics and advertising accounts.
- Real client names, logos and results only with permission.
- NTN/company registration or physical office information only if accurate and approved.

### Language strategy

- Keep primary website copy in simple professional English.
- Use Roman Urdu in the chatbot and selected FAQ explanations.
- Avoid slang in headings and commercial policies.
- Avoid absolute claims such as guaranteed rankings, perfect results, lowest acquisition cost or instant growth.

## 7. New visual direction

### Overall feel

Premium, credible, modern and practical. The brand should look like a digital solutions company that can handle a serious business account.

### Keep

- Dark navy foundation.
- Orange brand accent.
- Strong typography and clean card layouts.
- Transparent PKR pricing and local-business categories.

### Improve

- Reduce glowing effects, moving tickers, emoji-led labels and decorative badges.
- Use more whitespace and shorter sections.
- Use one clear primary CTA per section.
- Replace stock-like demo imagery with real work, UI screens and approved client results.
- Separate sample concepts from delivered client work.
- Standardize card heights, icon style, border radius and spacing.
- Use restrained animation and support reduced-motion preferences.

### Recommended design system

| Token | Direction |
|---|---|
| Primary navy | `#0B1220` |
| Accessible dark orange button | `#C2410C` with white text |
| Warm accent | `#F97316` for icons, highlights and large text |
| Trust teal | `#0F766E` |
| Light surface | `#F8FAFC` |
| Card surface | `#FFFFFF` |
| Primary text | `#0F172A` |
| Muted text | `#64748B` |
| Headings | Manrope or Plus Jakarta Sans |
| Body/UI | Inter |
| Grid | 12 columns desktop, 4 columns mobile |
| Spacing | Consistent 8px scale |
| Card radius | 16px maximum for main cards |

Use dark text on bright orange when the orange is lighter. The current small white text on `#FF6600` was previously measured below the normal-text WCAG AA contrast target.

## 8. Recommended information architecture

### Navigation

- Home
- Services
- Solutions
- Case Studies
- Pricing
- About
- Contact

Rename **Portfolio** to **Case Studies** once verified client work is available. Until then, use **Work & Concepts**, with filters for Delivered Work and Sample Concepts.

### Homepage structure

1. Hero with one value proposition and two CTAs.
2. Local trust strip.
3. Four solution pillars: Build, Grow, Brand, Automate.
4. Industries served.
5. Verified case studies/results.
6. How engagement works.
7. Selected packages or starting prices.
8. Client assurances: ownership, payments, reporting, handover.
9. FAQ.
10. Final Contact CTA.

### Services structure

Group individual services into four pillars:

- **Build:** Business websites, ecommerce, portals.
- **Grow:** Meta Ads, Google Ads, SEO, Google Business, social media.
- **Brand:** Identity, social creatives, company profiles and print assets.
- **Automate:** AI webchat, WhatsApp automation, CRM and workflow integrations.

Each service card should show the business outcome, typical use case, starting price or quote rule, delivery model and one **Discuss This Service** action.

### Pricing structure

- Keep category tabs but reduce the number of competing cards shown at one time.
- Replace every WhatsApp package link with contextual webchat.
- State whether tax, domain, hosting, ad spend and third-party fees are included.
- Show mandatory Website Care beside every affected Flex offer.
- Reconcile prices, installments, delivery time, revisions and cancellation rules from one source of truth.
- Add **Compare Plans** and **Help Me Choose**. The latter opens the webchat.

### Solutions structure

Create anchored or dedicated industry pages for:

- Restaurants and cafes
- Clinics and healthcare
- Salons and beauty
- Real estate
- Education and academies
- Ecommerce and retail
- Professional services

Every solution must show the business problem, recommended stack, example journey, relevant proof and an industry-aware chat CTA.

### Case Studies structure

For each delivered project, show:

- Client and industry.
- Starting situation.
- Scope delivered.
- Screenshots or live link.
- Delivery period.
- Measured result with timeframe and data source.
- Client quote with permission.

Sample concepts must remain visibly labeled and must not use wording that implies a real client result.

### About page

Replace generic agency language with:

- Founding story and leadership.
- Team roles and delivery model.
- Lahore base and Pakistan-wide operations.
- Working standards, tools and account ownership.
- Verifiable experience and partnerships.

### Contact page

Keep the page simple and conversion-focused:

- Short heading.
- Contact form.
- One WhatsApp button.
- Email and working hours.
- Lahore/Pakistan location statement.
- Optional booking calendar.
- Privacy reassurance and expected response time.

Remove the floating WhatsApp icon even on the Contact page if the primary WhatsApp button is already visible. This prevents duplicate actions.

## 9. Proposed homepage copy

### Hero

**Eyebrow:** DIGITAL SOLUTIONS FOR PAKISTANI BUSINESSES

**Heading:** Build a Stronger Digital Presence. Generate Better Leads.

**Supporting text:** Digital Ustad helps growing businesses across Pakistan with high-performance websites, performance marketing, local SEO, branding and business automation - delivered by one accountable team.

**Primary CTA:** Get a Free Consultation  
**Secondary CTA:** Explore Our Solutions

**Trust strip:** Lahore-based team | Pakistan-wide delivery | Transparent PKR pricing | Milestone-based execution

### Service pillars

**Build**  
Fast, conversion-focused websites and ecommerce experiences built for Pakistani customers.

**Grow**  
Meta Ads, Google Ads, SEO and social media programs tied to clear business goals.

**Brand**  
Professional identity and creative systems that make your business look established and consistent.

**Automate**  
AI chat, customer workflows and integrations that reduce repetitive work and improve response time.

### Final CTA

**Heading:** Ready to improve how your business shows up and sells online?

**Text:** Tell us what you are trying to achieve. We will recommend the right starting point, scope and investment range.

**CTA:** Start Your Project Brief

## 10. Content rules

- Use one approved service catalog as the source for all repeated prices and deliverables.
- Maintain one commercial-policy matrix for payment, cancellation, revision, support and ownership terms.
- Do not display an unverified speed badge or performance number.
- Do not use customer counts, revenue outcomes or ranking claims without evidence.
- Clearly mark demonstrations, sample dashboards and concepts.
- Keep headings outcome-focused and body copy concrete.
- Write for a business owner who wants clarity, trust, quick communication and predictable cost.

## 11. Technical and SEO requirements

- Compile Tailwind CSS during the build; do not use the development CDN in production.
- Add a `<main>` landmark and skip link to every content page.
- Use one H1 per page and logical heading order.
- Add canonical URL, page-specific Open Graph and Twitter metadata.
- Add Organization/ProfessionalService, Service, Breadcrumb and FAQ structured data only where the visible content supports it.
- Add descriptive alt text and explicit image dimensions.
- Lazy-load suitable below-the-fold imagery while keeping the hero asset prioritized.
- Generate a correct sitemap and robots file.
- Provide a real 404 page and correct HTTP status.
- Preserve pricing tabs in the URL and make them keyboard-accessible.
- Make dialogs keyboard-safe: initial focus, trapped focus, Escape close, named close button and focus return.
- Meet WCAG AA contrast, focus visibility and form-label requirements.
- Respect `prefers-reduced-motion`.

## 12. Acceptance criteria

### WhatsApp and CTA migration

- Project-wide search finds zero `wa.me` or `api.whatsapp.com` links outside the Contact page.
- Contact page has only the approved WhatsApp button(s) and verified E.164 number.
- No global WhatsApp floating widget is present.
- All package and service CTAs either open webchat with correct context or route to Contact.
- The WhatsApp Automation service remains visible and understandable.

### Webchat

- One Clonvo.chat widget loads on every business page without duplicates.
- The production page loads only the approved Digital Ustad Clonvo tenant and assistant IDs.
- API secrets are not visible in page source or browser network requests.
- Page/service/package context reaches the API correctly.
- English and Roman Urdu flows work.
- Loading, retry, offline and unavailable states work.
- Lead details are requested only after consent.
- The widget works at 320, 360, 390, 414, 768, 1024 and desktop widths.
- Keyboard and screen-reader users can open, use and close it.
- The widget does not cause page layout shift or block important mobile controls.

### Commercial content

- Every repeated price, quantity, timeline and revision allowance matches.
- Growth installments total exactly PKR 42,999 or the advertised total is changed through an approved business decision.
- Social, SEO and general cancellation rules no longer conflict.
- Lite discount wording shows the exact payable amount and eligibility.
- Mandatory hosting/care costs appear before the visitor selects a Flex plan.

### Visual and content quality

- Homepage has one dominant message and no competing floating conversion controls.
- Real proof is visually separated from sample concepts.
- No unsupported claim is published.
- Button, form, dialog, navigation and footer styles are consistent.
- Light and dark states pass contrast review.

### Release checks

- Test Chrome, Safari, Edge and Firefox on current desktop versions.
- Test Android Chrome and iOS Safari on real devices.
- Submit a staging lead and confirm it arrives in the intended email/CRM.
- Test the one Contact-page WhatsApp button with owner authorization.
- Run performance testing on a representative mobile connection.
- Validate structured data, sitemap, canonical URLs and social previews.

## 13. Recommended delivery phases

### Phase 1 - Business rules and conversion architecture

Approve the real number, service catalog, prices, required fees, payment schedules, delivery times, cancellation terms and support hours. Remove WhatsApp links outside Contact and replace their behavior.

### Phase 2 - Webchat integration

Configure and embed Clonvo.chat, connect its API/webhooks through a secure backend layer, add context-aware flows, lead consent, lead routing, failure states and analytics.

### Phase 3 - Visual and content redesign

Implement the new homepage hierarchy, service pillars, Pakistani-market proof, simplified visual system and page-level copy.

### Phase 4 - Proof, SEO and accessibility

Publish verified case studies, fix metadata and structured data, complete keyboard/screen-reader QA and validate forms across real devices.

## 14. Master implementation instruction

> Redesign DigitalUstad.co as a professional digital solutions provider for Pakistani small and medium businesses. Preserve the core navy/orange identity but reduce decorative noise, glows, tickers, excessive badges and repeated CTAs. Use stronger whitespace, clearer hierarchy, real business proof and consistent service cards. Remove every direct WhatsApp link and floating WhatsApp widget from all pages except the Contact page. Keep WhatsApp Automation as a service offering. Replace non-contact WhatsApp actions with the Clonvo.chat widget or a normal Contact-page route. Configure Clonvo.chat as the exclusive website chat layer, branded as Digital Ustad Assistant with optional Powered by Clonvo.chat attribution. The assistant must support English and Roman Urdu, carry page/service/package context, protect API secrets through a server-side layer, request consent before collecting lead data, route qualified leads to the approved destination, and provide safe failure states. Reconcile all prices, installments, timelines, deliverables and cancellation terms from a single approved source. Position the brand around accountability, transparent PKR pricing, Lahore-based support, Pakistan-wide delivery, client-owned accounts and measurable work. Meet mobile, accessibility, SEO, performance and lead-delivery acceptance criteria before release.

## 15. Review limits

This is a public desktop black-box review. No source repository, admin dashboard, backend, analytics account or API was provided. No form or WhatsApp message was submitted. Mobile-device behavior, CRM/email delivery, security headers, server-side validation, real-user performance and chatbot responses must be tested during implementation or staging. The direct-link counts describe the reviewed live state on the review date and may change after deployment.
