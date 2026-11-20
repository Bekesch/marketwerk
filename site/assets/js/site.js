/* MarketWerk – site behaviour (vanilla JS, no dependencies).
   Everything is progressive: the site is fully readable without this file. */
(function () {
  'use strict';
  var d = document, w = window, html = d.documentElement;
  var reduced = w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var raf = w.requestAnimationFrame.bind(w);
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var lang = html.lang === 'de' ? 'de' : 'en';
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  /* ---------------- preloader → ready ---------------- */
  var readyDone = false;
  function ready() {
    if (readyDone) return;
    readyDone = true;
    d.body.classList.add('is-ready');
    initHeroVideo();
  }
  function preloader() {
    if (!html.classList.contains('pl-on')) { ready(); return; }
    var count = $('[data-pl-count]'), bar = $('[data-pl-bar]');
    var start = performance.now(), dur = 1100, loaded = d.readyState === 'complete', done = false;
    w.addEventListener('load', function () { loaded = true; });
    (function tick(now) {
      var p = Math.min((now - start) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      var shown = loaded ? e : Math.min(e, .9);
      if (count) count.textContent = Math.round(shown * 100);
      if (bar) bar.style.transform = 'scaleX(' + shown + ')';
      var timeout = now - start > 2600;
      if ((p >= 1 && loaded) || timeout) {
        if (count) count.textContent = '100';
        if (bar) bar.style.transform = 'scaleX(1)';
        if (!done) { done = true; setTimeout(exit, 120); }
        return;
      }
      raf(tick);
    })(start);
    function exit() {
      html.classList.add('pl-out');
      setTimeout(ready, 380);
      setTimeout(function () { html.classList.remove('pl-on', 'pl-out'); }, 1150);
    }
  }

  /* ---------------- header: scrolled / hide on scroll down ---------------- */
  var hdr = $('[data-hdr]');
  var lastY = w.scrollY, ticking = false;
  function onScrollHeader() {
    var y = w.scrollY;
    if (hdr) {
      hdr.classList.toggle('is-scrolled', y > 24);
      if (!html.classList.contains('menu-open')) {
        if (y > 640 && y > lastY + 4) hdr.classList.add('is-hidden');
        else if (y < lastY - 4 || y < 640) hdr.classList.remove('is-hidden');
      }
    }
    lastY = y;
  }

  /* ---------------- dropdown ---------------- */
  $$('.dd-btn').forEach(function (btn) {
    var dd = d.getElementById(btn.getAttribute('aria-controls'));
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', open);
      dd.classList.toggle('is-open', open);
    });
    d.addEventListener('click', function (e) { if (!dd.contains(e.target)) { btn.setAttribute('aria-expanded', 'false'); dd.classList.remove('is-open'); } });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape') { btn.setAttribute('aria-expanded', 'false'); dd.classList.remove('is-open'); } });
  });

  /* ---------------- full-screen menu ---------------- */
  var menu = $('[data-menu]'), burger = $('[data-burger]');
  var closeTimer;
  function focusables() { return [burger].concat($$('a[href], button:not([disabled]), summary', menu)).filter(function (el) { return el.offsetParent !== null || el === burger; }); }
  function openMenu() {
    clearTimeout(closeTimer);
    menu.hidden = false;
    if (w.matchMedia('(max-width: 760px)').matches) $$('[data-collapse-mobile]', menu).forEach(function (el) { el.removeAttribute('open'); });
    raf(function () { raf(function () { menu.classList.add('is-open'); }); });
    html.classList.add('menu-open');
    burger.setAttribute('aria-expanded', 'true');
    var label = $('.burger-label', burger); if (label) label.textContent = label.getAttribute('data-close');
    setTimeout(function () { var first = $('.menu-main a', menu); if (first) first.focus({ preventScroll: true }); }, 350);
  }
  function closeMenu(returnFocus) {
    menu.classList.remove('is-open');
    html.classList.remove('menu-open');
    burger.setAttribute('aria-expanded', 'false');
    var label = $('.burger-label', burger); if (label) label.textContent = label.getAttribute('data-open');
    closeTimer = setTimeout(function () { menu.hidden = true; }, 760);
    if (returnFocus !== false) burger.focus({ preventScroll: true });
  }
  if (menu && burger) {
    burger.addEventListener('click', function () { burger.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu(); });
    menu.addEventListener('click', function (e) { var a = e.target.closest('a'); if (a) closeMenu(false); });
    d.addEventListener('keydown', function (e) {
      if (!html.classList.contains('menu-open')) return;
      if (e.key === 'Escape') { e.preventDefault(); closeMenu(); return; }
      if (e.key === 'Tab') {
        var f = focusables(), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---------------- language preference ---------------- */
  $$('[data-lang-link]').forEach(function (a) { a.addEventListener('click', function () { store('mw-lang', a.getAttribute('data-lang-link')); }); });
  var hint = $('[data-lang-hint]');
  if (hint) {
    var nav = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    if (/^de\b/i.test(nav) && store('mw-lang') !== 'en' && !store('mw-lang-hint')) setTimeout(function () { hint.hidden = false; }, 1800);
    var hc = $('[data-lang-hint-close]', hint);
    if (hc) hc.addEventListener('click', function () { hint.hidden = true; store('mw-lang-hint', '1'); });
  }

  /* ---------------- reveal on scroll + counters + map ---------------- */
  function fmt(v, kind) {
    if (kind === 'eur') return lang === 'de' ? '€' + (v / 1e6).toFixed(1).replace('.', ',').replace(',0', '') + ' Mio.' : '€' + (v / 1e6).toFixed(1).replace('.0', '') + 'M';
    return Math.round(v).toLocaleString(lang === 'de' ? 'de-DE' : 'en-US');
  }
  function countUp(el) {
    var to = +el.getAttribute('data-count'), kind = el.getAttribute('data-kind'), suffix = el.getAttribute('data-suffix') || '';
    var finalHtml = el.innerHTML, start = null, dur = to > 1000 ? 1800 : 1400;
    if (reduced) return;
    var acc = '<span class="acc">' + suffix.replace(/</g, '&lt;') + '</span>';
    (function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1), e = 1 - Math.pow(1 - p, 4);
      if (p < 1) { el.innerHTML = (kind === 'eur' ? fmt(Math.max(e * to, 1e5), kind) : fmt(e * to, kind)) + acc; raf(step); }
      else el.innerHTML = finalHtml;
    })(performance.now());
  }
  if ('IntersectionObserver' in w) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        el.classList.add('in');
        if (el.hasAttribute('data-count')) countUp(el);
        if (el.hasAttribute('data-eu')) el.classList.add('go');
        io.unobserve(el);
      });
    }, { threshold: .18, rootMargin: '0px 0px -6% 0px' });
    $$('.reveal, [data-anim], [data-count], [data-eu]').forEach(function (el) { io.observe(el); });
  } else {
    $$('.reveal, [data-anim]').forEach(function (el) { el.classList.add('in'); });
    $$('[data-eu]').forEach(function (el) { el.classList.add('go'); });
  }

  /* ---------------- parallax (transform only, in-view elements only) ---------------- */
  var px = [], visible = new Set();
  if (!reduced && 'IntersectionObserver' in w) {
    px = $$('[data-parallax]');
    var pio = new IntersectionObserver(function (es) { es.forEach(function (e) { e.isIntersecting ? visible.add(e.target) : visible.delete(e.target); }); }, { rootMargin: '20% 0px' });
    px.forEach(function (el) { pio.observe(el); });
  }
  function onScrollParallax() {
    if (!visible.size) return;
    var vh = w.innerHeight, small = w.innerWidth < 760 ? .5 : 1;
    visible.forEach(function (el) {
      var r = el.getBoundingClientRect(), f = parseFloat(el.getAttribute('data-parallax')) || 0;
      var off = ((r.top + r.height / 2) - vh / 2) * f * small;
      el.style.setProperty('--py', off.toFixed(1) + 'px');
    });
  }

  /* ---------------- overlapping sticky work steps ---------------- */
  var stacks = $$('.stack');
  var stickyMQ = w.matchMedia('(min-height: 620px)');
  function onScrollStack() {
    if (reduced || !stickyMQ.matches) return;
    stacks.forEach(function (stack) {
      var cards = $$('[data-stack]', stack);
      var rects = cards.map(function (c) { return c.getBoundingClientRect(); });
      cards.forEach(function (card, i) {
        if (i === cards.length - 1) return;
        var depth = 0;
        for (var j = i + 1; j < cards.length; j++) {
          var dist = rects[j].top - rects[i].top;
          var p = 1 - Math.min(Math.max(dist / Math.max(rects[i].height, 1), 0), 1);
          depth += p;
        }
        depth = Math.min(depth, 3);
        var inner = card.firstElementChild;
        inner.style.setProperty('--s', (1 - depth * .045).toFixed(4));
        inner.style.setProperty('--b', (1 - depth * .08).toFixed(4));
      });
    });
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    raf(function () { onScrollHeader(); onScrollParallax(); onScrollStack(); ticking = false; });
  }
  w.addEventListener('scroll', onScroll, { passive: true });
  w.addEventListener('resize', onScroll);
  onScroll();

  /* ---------------- hero video (loads after first paint, never on save-data) ---------------- */
  function initHeroVideo() {
    var v = $('[data-hero-video]');
    if (!v || reduced) return;
    var c = navigator.connection || {};
    if (c.saveData || /(^|-)2g$/.test(c.effectiveType || '')) return;
    var start = function () {
      var portrait = w.innerWidth / w.innerHeight < .8;
      var av1 = v.canPlayType('video/mp4; codecs="av01.0.05M.08"') !== '';
      v.src = v.getAttribute('data-' + (portrait ? 'port' : 'land') + (av1 ? '-av1' : ''));
      v.addEventListener('playing', function () { v.classList.add('is-playing'); }, { once: true });
      var pr = v.play(); if (pr && pr.catch) pr.catch(function () {});
      if ('IntersectionObserver' in w) new IntersectionObserver(function (es) { es[0].isIntersecting ? (v.paused && v.play().catch(function () {})) : v.pause(); }).observe(v);
    };
    if (d.readyState === 'complete') setTimeout(start, 150); else w.addEventListener('load', function () { setTimeout(start, 150); });
  }

  /* ---------------- brands orb (canvas globe + orbiting logos) ---------------- */
  (function orb() {
    var orb = $('[data-orb]'); if (!orb) return;
    var canvas = $('.orb-globe', orb), ctx = canvas.getContext('2d');
    var ringBack = $('.orb-ring-back path', orb), ringFront = $('.orb-ring-front path', orb);
    var items = $$('.orb-item', orb), TILT = -.2, pts = [];
    var D, R, RX, RY, W, H, dpr, spin = 0, orbit = -Math.PI / 2, speed = 1, target = 1, enterT = null, last = null, on = false;
    for (var i = 0, N = 650; i < N; i++) { var y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.399963; pts.push([Math.cos(th) * r, y, Math.sin(th) * r]); }
    function layout() {
      W = orb.parentElement.clientWidth; H = orb.clientHeight;
      var mobile = W < 620;
      D = Math.min(mobile ? W * .7 : W * .62, H * .74, 440); R = D / 2;
      RX = Math.min(W / 2 - (mobile ? 54 : 70), D * .98); RY = D * (mobile ? .34 : .26);
      dpr = Math.min(w.devicePixelRatio || 1, 2);
      canvas.width = D * dpr; canvas.height = D * dpr; canvas.style.width = D + 'px'; canvas.style.height = D + 'px';
      canvas.style.left = (W - D) / 2 + 'px'; canvas.style.top = (H - D) / 2 + 'px';
      var cx = W / 2, cy = H / 2;
      function arc(a0, a1) { var s = ''; for (var k = 0; k <= 60; k++) { var a = a0 + (a1 - a0) * k / 60, x = Math.cos(a) * RX, yy = Math.sin(a) * RY; s += (k ? 'L' : 'M') + (cx + x * Math.cos(TILT) - yy * Math.sin(TILT)).toFixed(1) + ' ' + (cy + x * Math.sin(TILT) + yy * Math.cos(TILT)).toFixed(1); } return s; }
      ringBack.setAttribute('d', arc(Math.PI, 2 * Math.PI)); ringFront.setAttribute('d', arc(0, Math.PI));
    }
    function ease(x) { return 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 3); }
    function frame(ts) {
      if (!on) { last = null; return; }
      var dt = last ? Math.min((ts - last) / 1000, .05) : 0; last = ts;
      if (enterT === null) enterT = ts;
      var e = reduced ? 1 : ease((ts - enterT) / 1400);
      speed += (target - speed) * .08;
      if (!reduced) { spin += dt * .25 * speed; orbit += dt * .3 * speed; }
      var cs = D * dpr, rr = R * dpr * .94 * e, c = cs / 2, cy = Math.cos(spin), sy = Math.sin(spin), cx = Math.cos(.38), sx = Math.sin(.38);
      ctx.clearRect(0, 0, cs, cs); ctx.fillStyle = '#E8522C';
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i], x = p[0] * cy + p[2] * sy, z = -p[0] * sy + p[2] * cy, y2 = p[1] * cx - z * sx, z2 = p[1] * sx + z * cx, depth = (z2 + 1) / 2;
        ctx.globalAlpha = (.12 + .78 * depth) * e; ctx.beginPath(); ctx.arc(c + x * rr, c + y2 * rr, (.7 + 1.5 * depth) * dpr, 0, 6.2832); ctx.fill();
      }
      ctx.globalAlpha = .25 * e; ctx.strokeStyle = '#E8522C'; ctx.lineWidth = dpr; ctx.beginPath(); ctx.arc(c, c, rr, 0, 6.2832); ctx.stroke(); ctx.globalAlpha = 1;
      var ox = W / 2, oy = H / 2;
      items.forEach(function (it, k) {
        var a = orbit + k * 2 * Math.PI / items.length, x = Math.cos(a) * RX * e, y = Math.sin(a) * RY * e;
        var pxx = ox + x * Math.cos(TILT) - y * Math.sin(TILT), pyy = oy + x * Math.sin(TILT) + y * Math.cos(TILT), front = (Math.sin(a) + 1) / 2;
        it.style.transform = 'translate(' + pxx.toFixed(1) + 'px,' + pyy.toFixed(1) + 'px) scale(' + (.62 + .38 * front).toFixed(3) + ')';
        it.style.opacity = ((.35 + .65 * front) * e).toFixed(3);
        it.style.zIndex = front > .5 ? 5 : 1;
      });
      if (!reduced) raf(frame);
    }
    items.forEach(function (it) { it.addEventListener('mouseenter', function () { target = 0; }); it.addEventListener('mouseleave', function () { target = 1; }); it.addEventListener('focusin', function () { target = 0; }); it.addEventListener('focusout', function () { target = 1; }); });
    layout();
    w.addEventListener('resize', function () { layout(); if (reduced) raf(frame); });
    new IntersectionObserver(function (es) { if (es[0].isIntersecting) { if (!on) { on = true; layout(); enterT = null; raf(frame); } } else on = false; }, { threshold: .1 }).observe(orb);
  })();

  /* ---------------- blog filters ---------------- */
  var filters = $('[data-filters]');
  if (filters) {
    filters.addEventListener('click', function (e) {
      var b = e.target.closest('[data-filter]'); if (!b) return;
      var f = b.getAttribute('data-filter');
      $$('[data-filter]', filters).forEach(function (x) { var onn = x === b; x.classList.toggle('is-on', onn); x.setAttribute('aria-pressed', onn); });
      $$('.post-cell').forEach(function (c) { c.hidden = f !== 'all' && c.getAttribute('data-cat') !== f; c.classList.toggle('post-cell-feat', f === 'all' && c === c.parentElement.firstElementChild); });
      $$('.post-cell .reveal').forEach(function (r) { r.classList.add('in'); });
    });
  }

  /* ---------------- table of contents highlight ---------------- */
  var toc = $('.toc');
  if (toc && 'IntersectionObserver' in w) {
    var links = $$('a', toc), map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var tio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { links.forEach(function (l) { l.classList.remove('is-active'); }); var a = map[e.target.id]; if (a) a.classList.add('is-active'); } }); }, { rootMargin: '-20% 0px -70% 0px' });
    $$('.prose-article h2[id]').forEach(function (h) { tio.observe(h); });
  }

  /* ---------------- gallery lightbox ---------------- */
  var lb = $('[data-lightbox]');
  if (lb && typeof lb.showModal === 'function') {
    var items = $$('[data-gallery] [data-full]'), img = $('[data-lightbox-img]', lb), idx = 0;
    var show = function (i) { idx = (i + items.length) % items.length; img.src = items[idx].getAttribute('data-full'); img.alt = items[idx].getAttribute('aria-label'); };
    items.forEach(function (b, i) { b.addEventListener('click', function () { show(i); lb.showModal(); }); });
    $('[data-lightbox-close]', lb).addEventListener('click', function () { lb.close(); });
    $('[data-lightbox-prev]', lb).addEventListener('click', function () { show(idx - 1); });
    $('[data-lightbox-next]', lb).addEventListener('click', function () { show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
    lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') show(idx + 1); if (e.key === 'ArrowLeft') show(idx - 1); });
  }

  /* ---------------- contact form → /api/contact (mailto fallback) ---------------- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var T = {
    en: { ok: 'Thanks! Your message is on its way – we’ll get back to you shortly.', invalid: 'Please fill in your name, a valid email and a message.', fallback: 'The form could not be sent right now. Your email app opens so you can send the message directly.', sending: 'Sending…' },
    de: { ok: 'Danke! Deine Nachricht ist unterwegs – wir melden uns in Kürze.', invalid: 'Bitte gib deinen Namen, eine gültige E-Mail-Adresse und eine Nachricht an.', fallback: 'Das Formular konnte gerade nicht gesendet werden. Dein E-Mail-Programm öffnet sich, damit du die Nachricht direkt senden kannst.', sending: 'Wird gesendet …' },
  }[lang];
  $$('[data-contact-form]').forEach(function (form) {
    var status = $('.form-status', form), btn = $('button[type="submit"]', form), btnLabel = $('span', btn), label0 = btnLabel.textContent;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = {}; new FormData(form).forEach(function (v, k) { data[k] = String(v).trim(); });
      var bad = [];
      if (!data.name) bad.push('name'); if (!EMAIL_RE.test(data.email || '')) bad.push('email'); if (!data.message) bad.push('message');
      $$('.field', form).forEach(function (f) { var inp = $('input, textarea, select', f); f.classList.toggle('is-invalid', !!inp && bad.indexOf(inp.name) > -1); });
      if (bad.length) { status.className = 'form-status is-err'; status.textContent = T.invalid; var first = form.elements[bad[0]]; if (first) first.focus(); return; }
      form.classList.add('is-sending'); btnLabel.textContent = T.sending; status.className = 'form-status'; status.textContent = '';
      fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(new FormData(form)).toString() })
        .then(function (r) { return { ok: r.ok }; })
        .catch(function () { return { ok: false }; })
        .then(function (res) {
          form.classList.remove('is-sending'); btnLabel.textContent = label0;
          if (res.ok) { status.className = 'form-status is-ok'; status.textContent = T.ok; form.reset(); setTimeout(function () { w.location.href = form.getAttribute('action'); }, 700); return; }
          status.className = 'form-status is-err'; status.textContent = T.fallback;
          var subject = (lang === 'de' ? 'Anfrage über marketwerk.com von ' : 'Inquiry via marketwerk.com from ') + data.name;
          var body = data.message + '\n\n— ' + data.name + (data.company ? ', ' + data.company : '') + '\n' + data.email + (data.interest ? '\n' + data.interest : '');
          setTimeout(function () { w.location.href = 'mailto:' + form.getAttribute('data-email') + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body); }, 600);
        });
    });
  });

  /* ---------------- sticky mobile CTA ---------------- */
  var sticky = $('[data-sticky-cta]');
  if (sticky && 'IntersectionObserver' in w) {
    var blockers = $$('.hero, .page-hero, .article-hero, .contact, .cta-band, .ftr');
    var seen = new Set();
    var sio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.isIntersecting ? seen.add(e.target) : seen.delete(e.target); });
      var onn = seen.size === 0;
      sticky.classList.toggle('is-on', onn);
      sticky.setAttribute('aria-hidden', !onn);
      $$('a', sticky).forEach(function (a) { a.tabIndex = onn ? 0 : -1; });
    }, { threshold: 0 });
    blockers.forEach(function (b) { sio.observe(b); });
  }

  preloader();
})();

/* ---------------- team slideshow (founder / advisor) ---------------- */
(function () {
  var box = document.querySelector('[data-team-slider]'); if (!box) return;
  var sec = box.closest('.team') || document;
  var slides = box.querySelectorAll('.team-slide'), bios = sec.querySelectorAll('.team-bio[data-slide]');
  var ctrls = sec.querySelectorAll('[data-go]'), n = slides.length, cur = 0, timer = null, visible = false, hold = false;
  var DUR = 7000, reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  box.style.setProperty('--team-dur', DUR / 1000 + 's');
  function show(k) {
    cur = (k + n) % n;
    [].forEach.call(slides, function (s, i) { var on = i === cur; s.classList.toggle('is-active', on); s.setAttribute('aria-hidden', on ? 'false' : 'true'); });
    [].forEach.call(bios, function (b) { var on = +b.getAttribute('data-slide') === cur; b.classList.toggle('is-active', on); b.setAttribute('aria-hidden', on ? 'false' : 'true');
      [].forEach.call(b.querySelectorAll('a'), function (a) { a.tabIndex = on ? 0 : -1; }); });
    [].forEach.call(ctrls, function (c) { c.classList.toggle('is-active', +c.getAttribute('data-go') === cur); });
    restart();
  }
  function restart() {
    clearTimeout(timer); box.classList.remove('is-playing');
    if (reduce || !visible || hold) return;
    void box.offsetWidth; box.classList.add('is-playing');
    timer = setTimeout(function () { show(cur + 1); }, DUR);
  }
  [].forEach.call(ctrls, function (c) { c.addEventListener('click', function () { show(+c.getAttribute('data-go')); }); });
  var nx = box.querySelector('[data-next]'); if (nx) nx.addEventListener('click', function () { show(cur + 1); });
  [].forEach.call(slides, function (s) { s.addEventListener('click', function () { show(cur + 1); }); });
  sec.addEventListener('mouseenter', function () { hold = true; restart(); });
  sec.addEventListener('mouseleave', function () { hold = false; restart(); });
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { visible = e[0].isIntersecting; restart(); }, { threshold: 0.35 }).observe(box);
})();
