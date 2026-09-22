(function(){
  "use strict";

  /* ---- nav solidify on scroll ---- */
  /* nav/menuToggle are injected by site-chrome.js; guard in case this script
     ever runs on a page where chrome hasn't loaded/rendered them. */
  var nav = document.getElementById('siteNav');
  if(nav){
    function onNavScroll(){
      if(window.scrollY > 40){ nav.classList.add('nav--solid'); } else { nav.classList.remove('nav--solid'); }
    }
    document.addEventListener('scroll', onNavScroll, { passive:true });
    onNavScroll();
  }

  /* ---- mobile menu ---- */
  var toggle = document.getElementById('menuToggle');
  var body = document.body;
  if(toggle){
    function closeMenu(){ body.classList.remove('menu-open'); toggle.setAttribute('aria-expanded','false'); toggle.setAttribute('aria-label','Open menu'); }
    function openMenu(){ body.classList.add('menu-open'); toggle.setAttribute('aria-expanded','true'); toggle.setAttribute('aria-label','Close menu'); }
    toggle.addEventListener('click', function(){ body.classList.contains('menu-open') ? closeMenu() : openMenu(); });
    document.querySelectorAll('.js-mobile-link').forEach(function(l){ l.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape'){ closeMenu(); } });
  }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(pointer: fine)').matches;

  /* ---- hero video: play only when motion is welcome; poster stays static otherwise ---- */
  var heroVideo = document.getElementById('heroVideo');
  if(heroVideo && !reduceMotion){
    var playPromise = heroVideo.play();
    if(playPromise && playPromise.catch){ playPromise.catch(function(){ /* autoplay blocked; poster stays visible */ }); }
  }

  /* ---- custom cursor ---- */
  if(fine && !reduceMotion){
    document.documentElement.classList.add('js-custom-cursor');
    var dot = document.getElementById('cursorDot');
    var ring = document.getElementById('cursorRing');
    var mx=0,my=0, rx=0, ry=0;
    document.addEventListener('mousemove', function(e){
      mx = e.clientX; my = e.clientY;
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
    });
    function ringLoop(){
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
      requestAnimationFrame(ringLoop);
    }
    requestAnimationFrame(ringLoop);
    document.querySelectorAll('.js-cursor-target').forEach(function(el){
      el.addEventListener('mouseenter', function(){ ring.classList.add('is-active'); });
      el.addEventListener('mouseleave', function(){ ring.classList.remove('is-active'); });
    });
  }

  /* ---- magnetic buttons ---- */
  if(fine && !reduceMotion){
    document.querySelectorAll('.js-magnetic').forEach(function(el){
      var radius = 60;
      el.addEventListener('mousemove', function(e){
        var r = el.getBoundingClientRect();
        var cx = r.left + r.width/2, cy = r.top + r.height/2;
        var dx = e.clientX - cx, dy = e.clientY - cy;
        el.style.transition = 'transform 80ms linear';
        el.style.transform = 'translate(' + (dx*0.22) + 'px,' + (dy*0.22) + 'px)';
      });
      el.addEventListener('mouseleave', function(){
        el.style.transition = 'transform 420ms cubic-bezier(.22,.61,.36,1)';
        el.style.transform = 'translate(0,0)';
      });
    });
  }

  /* ---- scroll-scrubbed reveal (headline clip + hairline draw) ---- */
  var scrubSections = document.querySelectorAll('.js-scrub-section');
  function updateScrub(){
    var vh = window.innerHeight;
    scrubSections.forEach(function(sec){
      var r = sec.getBoundingClientRect();
      var start = vh * 0.88, end = vh * 0.42;
      var progress = (start - r.top) / (start - end);
      progress = Math.max(0, Math.min(1, progress));
      if(progress > 0.03){ sec.classList.add('is-in'); } else if(progress < 0.01){ sec.classList.remove('is-in'); }
      var clip = sec.querySelector('.js-scrub');
      if(clip){ clip.style.clipPath = 'inset(0 ' + (100 - progress*100) + '% 0 0)'; }
    });
  }

  /* ---- "The Process" pinned crossfade (round 3) ----
     Full replacement against the approved prototype
     (claude.ai/artifact/RttwB5RuDMJB5Ma7FuGzjg) — ported directly. Retires
     updateProcessVScrub() and the node-click handler entirely (the old
     pinned-spine/photo-thumbnail diagram is gone from the HTML/CSS too).
     Progress: same idea as the prototype's onScroll() (rect.top/total),
     but "total" here uses the STAGE's own rendered height rather than
     raw window.innerHeight — this site's .process-stage sticks at
     top:var(--nav-h), so it's shorter than the full viewport by the fixed
     nav's height; using the real pin height keeps progress reaching
     exactly 1 the instant the pin naturally releases, same principle the
     old vscroll code used, just re-applied to the new markup.
     Reduced motion: unchanged, still the plain .process-static-list, no
     JS involvement. */
  var pScroll = document.getElementById('processScroll');
  var pStage = pScroll ? pScroll.querySelector('.process-stage') : null;
  var pPanels = document.querySelectorAll('#processVisual .panel');
  var pRailButtons = document.querySelectorAll('#processRail button');
  var pEyebrowEl = document.getElementById('processEyebrow');
  var pTitleEl = document.getElementById('processTitle');
  var pDescEl = document.getElementById('processDesc');
  var pCountEl = document.getElementById('processCount');
  var pSteps = [
    { title:'Design &amp; Ideation', desc:'Every build begins as a sketch, refined until the shape feels right.' },
    { title:'3D Scanning &amp; Modeling', desc:'The vehicle is captured to sub-millimetre accuracy before a single cut is made.' },
    { title:'3D Printing', desc:'Rapid prototypes prove the fit and form before carbon is ever committed.' },
    { title:'Prototyping', desc:'A working test piece proves the geometry before it becomes permanent.' },
    { title:'Pre-Molding (Master Model)', desc:'A master model is hand-finished to the exact surface the mold will carry.' },
    { title:'Mold Production', desc:'Precision molds are produced from the master, built to hold that shape indefinitely.' },
    { title:'Carbon Production', desc:'Carbon sheets are laid up and cured to the same standard on every build.' },
    { title:'Fitment Installation', desc:'Every panel is test-fitted and installed by the same hands that built it.' },
    { title:'Paint &amp; Finish', desc:'A final protective finish, invisible in itself, permanent in what it protects.' }
  ];
  var pCurrent = -1;
  function pad2(n){ return (n < 10 ? '0' : '') + n; }
  function renderProcess(i){
    if(i === pCurrent) return;
    pCurrent = i;
    pPanels.forEach(function(p){ p.classList.toggle('is-active', Number(p.dataset.i) === i); });
    pRailButtons.forEach(function(b, idx){
      b.classList.toggle('is-current', idx === i);
      b.classList.toggle('is-done', idx < i);
    });
    var s = pSteps[i];
    if(pEyebrowEl){ pEyebrowEl.textContent = 'THE PROCESS — ' + pad2(i + 1); }
    if(pTitleEl){ pTitleEl.innerHTML = s.title; }
    if(pDescEl){ pDescEl.textContent = s.desc; }
    if(pCountEl){ pCountEl.textContent = pad2(i + 1) + ' / 09'; }
  }
  function onProcessScroll(){
    if(reduceMotion || !pScroll || !pStage) return;
    var stageRect = pStage.getBoundingClientRect();
    var scrollRect = pScroll.getBoundingClientRect();
    var total = scrollRect.height - stageRect.height;
    var progress = total > 0 ? -scrollRect.top / total : (scrollRect.top <= 0 ? 1 : 0);
    progress = Math.max(0, Math.min(0.9999, progress));
    var idx = Math.min(pSteps.length - 1, Math.floor(progress * pSteps.length));
    renderProcess(idx);
  }
  if(pScroll && pStage){ renderProcess(0); }

  /* rail buttons: click/tap to jump straight to that stage, inverting the
     same progress formula onProcessScroll() uses. */
  pRailButtons.forEach(function(btn, idx){
    btn.addEventListener('click', function(){
      if(!pScroll || !pStage) return;
      var stageRect = pStage.getBoundingClientRect();
      var scrollRect = pScroll.getBoundingClientRect();
      var total = scrollRect.height - stageRect.height;
      var targetY = window.scrollY + scrollRect.top + (total * (idx / pSteps.length)) + 10;
      window.scrollTo({ top: Math.max(0, targetY), behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });

  var ticking = false;
  function onScroll(){
    if(!ticking){ requestAnimationFrame(function(){ updateScrub(); onProcessScroll(); ticking=false; }); ticking = true; }
  }
  if(reduceMotion){
    scrubSections.forEach(function(sec){ sec.classList.add('is-in'); var c = sec.querySelector('.js-scrub'); if(c){ c.style.clipPath='none'; } });
  } else {
    document.addEventListener('scroll', onScroll, { passive:true });
    updateScrub();
    onProcessScroll();
  }

  /* ---- animated counters ---- */
  var counters = document.querySelectorAll('.js-counter');
  if(counters.length){
    var counterIO = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting) return;
        var el = entry.target;
        counterIO.unobserve(el);
        var to = parseInt(el.getAttribute('data-to'), 10) || 0;
        var suffix = el.getAttribute('data-suffix') || '';
        var pad = parseInt(el.getAttribute('data-pad'), 10) || 0;
        if(reduceMotion){
          var v = pad ? String(to).padStart(pad,'0') : String(to);
          el.textContent = v + suffix;
          return;
        }
        var duration = 1200, startTime = null;
        function step(ts){
          if(startTime === null) startTime = ts;
          var t = Math.min(1, (ts - startTime) / duration);
          var eased = 1 - Math.pow(1 - t, 3);
          var val = Math.round(eased * to);
          var v = pad ? String(val).padStart(pad,'0') : String(val);
          el.textContent = v + suffix;
          if(t < 1){ requestAnimationFrame(step); }
        }
        requestAnimationFrame(step);
      });
    }, { threshold:0.5 });
    counters.forEach(function(c){ counterIO.observe(c); });
  }

  /* ---- sticky whatsapp: show once hero is scrolled past ----
     On pages with no .hero (every page except index.html), show it right
     away instead of waiting on an IntersectionObserver that has nothing
     to observe. ---- */
  var stickyWa = document.getElementById('stickyWa');
  var heroEl = document.querySelector('.hero');
  if(stickyWa){
    if(heroEl && 'IntersectionObserver' in window){
      var heroIO = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          stickyWa.classList.toggle('is-visible', !entry.isIntersecting);
        });
      }, { threshold:0 });
      heroIO.observe(heroEl);
    } else {
      stickyWa.classList.add('is-visible');
    }
  }

  /* ---- project PDF block: shared renderer for project pages + downloads hub ----
     Call window.KKRenderPdf(containerEl, pdfObj) where pdfObj looks like
     { url: null, driveId: null, driveDownloadUrl: null }. A direct `url`
     renders View + Download links to that file. A Google Drive `driveId`
     renders a Drive "view" link, plus a Download link only if
     `driveDownloadUrl` is also supplied (Drive's view and direct-download
     URLs differ). All-null (or missing) renders the "coming soon" state. */
  window.KKRenderPdf = function(container, pdf){
    if(!container) return;
    if(!pdf || (!pdf.url && !pdf.driveId)){
      container.innerHTML = '<p class="pdf-block__soon">Spec sheet coming soon</p>';
      return;
    }
    var links = '';
    if(pdf.url){
      links += '<a class="btn btn--ghost js-cursor-target" href="' + pdf.url + '" target="_blank" rel="noopener">View</a>';
      links += '<a class="btn btn--ghost js-cursor-target" href="' + pdf.url + '" download>Download</a>';
    } else if(pdf.driveId){
      links += '<a class="btn btn--ghost js-cursor-target" href="https://drive.google.com/file/d/' + pdf.driveId + '/view" target="_blank" rel="noopener">View</a>';
      if(pdf.driveDownloadUrl){
        links += '<a class="btn btn--ghost js-cursor-target" href="' + pdf.driveDownloadUrl + '" target="_blank" rel="noopener">Download</a>';
      }
    }
    container.innerHTML = '<div class="pdf-block__links">' + links + '</div>';
  };
  document.addEventListener('DOMContentLoaded', function(){
    if(window.PROJECT_PDF){
      window.KKRenderPdf(document.getElementById('pdfBlock'), window.PROJECT_PDF);
    }
  });

  /* ---- "Convert Yours" lead form: no backend, so compile the fields into
     a WhatsApp message client-side and open wa.me with it. Any form with
     class js-convert-form + data-project + data-wa-number triggers this. ---- */
  document.addEventListener('submit', function(e){
    var form = e.target;
    if(!form || !form.classList || !form.classList.contains('js-convert-form')) return;
    e.preventDefault();
    var project = form.getAttribute('data-project') || 'Kynetik build';
    var number = form.getAttribute('data-wa-number') || '971XXXXXXXXX';
    function val(name){ var f = form.querySelector('[name="' + name + '"]'); return f && f.value ? f.value.trim() : ''; }
    var message = 'New enquiry — ' + project + '. Car model: ' + val('car_model') +
      '. Year: ' + val('car_year') + '. Location: ' + val('location') +
      '. Phone: ' + val('phone') + '.';
    window.open('https://wa.me/' + number + '?text=' + encodeURIComponent(message), '_blank', 'noopener');
  });
})();
