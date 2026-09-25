/* ==========================================================================
   site-chrome.js — shared nav + footer for every page.
   Plain script, no modules, no fetch (must work over file:// where fetch()
   of local files is blocked by CORS). Injects markup via innerHTML into two
   slot elements every page must include:
     <div id="site-nav-slot"></div>      — right after <body> opens
     <div id="site-footer-slot"></div>   — right before </body>
   Load this script immediately after EACH slot div so it can run
   synchronously and fill that specific slot as soon as it's parsed.

   Root pages (index.html, pedigree.html, downloads.html) include it as:
     <script src="assets/js/site-chrome.js"></script>
   Nested pages (projects/*.html) include it as:
     <script src="../assets/js/site-chrome.js"></script>

   Round 2: pedigree-completed.html / pedigree-upcoming.html were merged
   into pedigree.html and deleted. Downloads was removed from the header
   nav (still linked from the footer) and replaced in the nav order by
   Digital Presence, which points at index.html#digital-presence.

   To mark the current nav item active, set on <body>:
     <body data-nav-active="offering|pedigree|history|process|impact|digital-presence">
   Pages with no matching nav item (hero/contact-only sections, project
   pages, downloads.html) simply omit the attribute and no link gets
   marked active.
   ========================================================================== */
(function(){
  "use strict";

  /* ---- figure out if this page is nested under /projects/ ---- */
  var thisScript = document.currentScript;
  var src = thisScript ? (thisScript.getAttribute('src') || '') : '';
  var nested = src.indexOf('../') === 0;
  var p = nested ? '../' : ''; // path prefix to prepend to every root-relative link

  var navActive = (document.body.getAttribute('data-nav-active') || '').trim();

  /* full-site polish pass (via /impeccable critique, P1): The Process
     had an #process anchor and was the single strongest section on the
     page by Assessment A's own read ("the one most likely to convince a
     skeptical buyer"), yet had no way to reach it except scrolling past
     everything before it — no direct link, no shareable in-page URL.
     Added as a 6th item, one past the cognitive-load guideline's ≤5
     top-level-nav rule (see DESIGN.md's Layout section) but a deliberate
     exception for the page's own best section rather than adding both
     #process and #make and drifting further past it; What We Make sits
     immediately after the hero already, so it's reached within the
     first scroll or two regardless of a nav entry. */
  var NAV_ITEMS = [
    { key: 'offering',         label: 'Offering',         href: p + 'offering.html' },
    { key: 'pedigree',         label: 'Pedigree',         href: p + 'pedigree.html' },
    { key: 'history',          label: 'History',          href: p + 'index.html#history' },
    { key: 'process',          label: 'The Process',      href: p + 'index.html#process' },
    { key: 'impact',           label: 'Impact',           href: p + 'index.html#impact' },
    { key: 'digital-presence', label: 'Digital Presence', href: p + 'index.html#digital-presence' }
  ];
  var CTA_HREF = p + 'index.html#contact';
  var HOME_HREF = p + 'index.html#top';
  var WA_HREF = 'https://wa.me/971XXXXXXXXX?text=I%27d%20like%20to%20start%20a%20conversation%20about%20a%20Kynetik%20build.';

  function isActive(key){ return key === navActive ? ' is-active' : ''; }

  function navLinksHtml(linkClass){
    return NAV_ITEMS.map(function(item){
      return '<a class="' + linkClass + isActive(item.key) + '" data-nav-key="' + item.key + '" href="' + item.href + '">' + item.label + '</a>';
    }).join('\n      ');
  }

  var navHtml =
    '<div class="cursor-ring" id="cursorRing" aria-hidden="true"></div>\n' +
    '<div class="cursor-dot" id="cursorDot" aria-hidden="true"></div>\n' +
    '<header class="nav" id="siteNav">\n' +
    '  <div class="nav__inner">\n' +
    '    <a href="' + HOME_HREF + '" class="logo-lockup js-cursor-target" aria-label="Kynetik Koncepts, home">\n' +
    '      <span class="logo-mark" role="img" aria-label="Kynetik monogram"></span>\n' +
    '      <span class="logo-word" role="img" aria-label="Kynetik"></span>\n' +
    '    </a>\n' +
    '    <nav class="nav__links" aria-label="Primary">\n' +
    '      ' + navLinksHtml('nav__link js-cursor-target') + '\n' +
    '    </nav>\n' +
    '    <a class="nav__cta js-cursor-target js-magnetic" href="' + CTA_HREF + '">Start a build</a>\n' +
    '    <button class="nav__toggle" id="menuToggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu">\n' +
    '      <span class="nav__toggle-bars"><span></span><span></span><span></span></span>\n' +
    '    </button>\n' +
    '  </div>\n' +
    '</header>\n' +
    '\n' +
    '<div class="mobile-menu" id="mobileMenu">\n' +
    '  <nav class="mobile-menu__links" aria-label="Mobile primary">\n' +
    '    ' + navLinksHtml('mobile-menu__link js-mobile-link') + '\n' +
    '  </nav>\n' +
    '  <a class="mobile-menu__cta js-mobile-link" href="' + CTA_HREF + '">Start a build</a>\n' +
    '  <div class="mobile-menu__foot">KYNETIK KONCEPTS · DUBAI, UAE</div>\n' +
    '</div>';

  var footerHtml =
    '<footer class="footer ground-black">\n' +
    '  <div class="wrap footer__inner">\n' +
    '    <div class="footer__mark">\n' +
    '      <span class="logo-mark" role="img" aria-label="Kynetik monogram"></span>\n' +
    '      <span class="footer__legal">© 2026 Kynetik Koncepts. Dubai, UAE.</span>\n' +
    '    </div>\n' +
    '    <div class="footer__links">\n' +
    '      <a class="quiet-link js-cursor-target" data-nav-key="downloads" href="' + p + 'downloads.html">Downloads</a>\n' +
    '      <a class="quiet-link js-cursor-target" data-nav-key="pedigree" href="' + p + 'pedigree.html">Pedigree</a>\n' +
    '    </div>\n' +
    '    <div class="footer__tag">KK&nbsp;599&nbsp;RF&nbsp;·&nbsp;001&nbsp;OF&nbsp;012</div>\n' +
    '  </div>\n' +
    '  <div class="wrap footer__social-row">\n' +
    '    <!-- Placeholder handles — confirm the real ones before launch -->\n' +
    '    <nav class="footer__social" aria-label="Kynetik on social media">\n' +
    '      <a href="https://www.youtube.com/@kynetikkoncepts" target="_blank" rel="noopener" aria-label="Kynetik on YouTube" class="js-cursor-target"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 8.5s-.2-1.6-.9-2.3c-.8-.9-1.7-.9-2.2-1C15.7 5 12 5 12 5h0s-3.7 0-6.9.2c-.5.1-1.4.1-2.2 1C2.2 6.9 2 8.5 2 8.5S1.8 10.4 1.8 12.2v1.6c0 1.9.2 3.7.2 3.7s.2 1.6.9 2.3c.8.9 1.9.9 2.4 1 1.7.2 7.2.2 7.2.2s3.7 0 6.9-.2c.5-.1 1.4-.1 2.2-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.7v-1.6c0-1.9-.2-3.7-.2-3.7zM9.9 15.5v-6l5.8 3-5.8 3z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg></a>\n' +
    '      <a href="https://tiktok.com/@kynetik" target="_blank" rel="noopener" aria-label="Kynetik on TikTok" class="js-cursor-target"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M16 3v10.5a3.5 3.5 0 11-3-3.46M16 3a5 5 0 005 5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg></a>\n' +
    '      <a href="https://facebook.com/kynetik" target="_blank" rel="noopener" aria-label="Kynetik on Facebook" class="js-cursor-target"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 8.5h2V5.2c-.35-.05-1.55-.15-2.95-.15C11.3 5.05 9.7 6.8 9.7 9.5v2.3H7v3.6h2.7V21h3.6v-5.6h2.7l.4-3.6h-3.1V9.9c0-.9.25-1.4 1.7-1.4z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg></a>\n' +
    '      <a href="https://www.instagram.com/kynetikkoncepts/" target="_blank" rel="noopener" aria-label="Kynetik on Instagram" class="js-cursor-target"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="currentColor" stroke-width="1.3"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.3"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"/></svg></a>\n' +
    '    </nav>\n' +
    '    <span class="footer__legal">sam@kynetik.ae · Dubai, UAE</span>\n' +
    '  </div>\n' +
    '</footer>\n' +
    '\n' +
    '<a class="sticky-wa js-cursor-target" id="stickyWa" href="' + WA_HREF + '" target="_blank" rel="noopener" aria-label="Message Kynetik on WhatsApp">\n' +
    '  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.87 9.87 0 004.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.17c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.8-.11a17 17 0 01-1.65-.6c-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36h.55c.18 0 .42-.03.65.5.24.55.82 1.9.9 2.04.07.14.12.3.02.49-.1.19-.15.3-.29.46-.15.16-.31.36-.44.48-.15.14-.3.3-.13.58.17.29.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.35 1.46.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.38-.24.64-.14.26.1 1.64.77 1.92.91.29.14.48.21.55.33.07.12.07.68-.17 1.36z"/></svg>\n' +
    '  <span>WhatsApp</span>\n' +
    '</a>';

  var navSlot = document.getElementById('site-nav-slot');
  var footerSlot = document.getElementById('site-footer-slot');
  if(navSlot){ navSlot.innerHTML = navHtml; }
  if(footerSlot){ footerSlot.innerHTML = footerHtml; }
})();
