/* Bywater Roots — shared behaviour. Vanilla, no modules. Every lookup is guarded.
   Owned by the foundation agent; page agents must not edit. */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  root.classList.add('js');

  var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  function qs(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }

  /* ---------- Footer year ---------- */
  qsa('[data-year]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  /* ---------- Header scrolled state ---------- */
  var header = qs('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Mobile nav ---------- */
  var toggle = qs('.nav-toggle');
  var nav = qs('#site-nav') || qs('.site-nav');
  if (toggle && nav) {
    var setNav = function (open, returnFocus) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.classList.toggle('is-open', open);
      doc.body.classList.toggle('nav-open', open);
      if (!open && returnFocus) toggle.focus();
    };
    toggle.addEventListener('click', function () {
      setNav(toggle.getAttribute('aria-expanded') !== 'true');
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setNav(false, true);
    });
    qsa('a', nav).forEach(function (a) {
      a.addEventListener('click', function () { setNav(false); });
    });
    if (window.matchMedia) {
      var mq = window.matchMedia('(min-width: 900px)');
      var onMq = function (e) { if (e.matches) setNav(false); };
      if (mq.addEventListener) mq.addEventListener('change', onMq);
      else if (mq.addListener) mq.addListener(onMq);
    }
  }

  /* ---------- Mock forms ---------- */
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var CHECK_ICON = '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';

  function fieldValue(form, name) {
    var el = form.elements[name];
    return el && typeof el.value === 'string' ? el.value.trim() : '';
  }

  qsa('form[data-mock-form]').forEach(function (form) {
    var panel = null;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (typeof form.reportValidity === 'function' && !form.reportValidity()) return;

      var text = form.getAttribute('data-confirm') || 'Thanks! Your response has been noted. (This is a concept demo — nothing was sent.)';
      var title = form.getAttribute('data-confirm-title') || 'Thank you!';
      var name = fieldValue(form, 'name') || fieldValue(form, 'first-name') || 'friend';
      var email = fieldValue(form, 'email');
      text = text.replace(/\{name\}/g, name).replace(/\{email\}/g, email || 'your email');

      var compact = form.classList.contains('inline-form') || !!form.closest('.site-footer');
      var onDark = !!form.closest('.site-footer, .section--pine');

      panel = doc.createElement('div');
      panel.className = 'confirm-panel' + (compact ? ' confirm-panel--compact' : '') + (onDark ? ' confirm-panel--on-dark' : '');
      panel.setAttribute('role', 'status');
      panel.setAttribute('tabindex', '-1');
      panel.innerHTML =
        '<span class="icon-badge icon-badge--sun">' + CHECK_ICON + '</span>' +
        '<h3 class="confirm-panel__title">' + escapeHtml(title) + '</h3>' +
        '<p>' + escapeHtml(text) + '</p>' +
        '<button type="button" class="btn btn--outline btn--sm">Send another</button>';

      form.hidden = true;
      form.parentNode.insertBefore(panel, form.nextSibling);
      panel.focus();

      panel.querySelector('button').addEventListener('click', function () {
        form.reset();
        if (panel && panel.parentNode) panel.parentNode.removeChild(panel);
        panel = null;
        form.hidden = false;
        var first = form.querySelector('input:not([type="hidden"]):not([type="radio"]):not([type="checkbox"]), select, textarea');
        if (first) first.focus();
      });
    });
  });

  /* ---------- Donate tiers: [data-tier] cards <-> amount input / radios ---------- */
  var tiers = qsa('[data-tier]');
  if (tiers.length) {
    var amountInput = qs('[data-tier-amount]');
    var amountRadios = qsa('input[type="radio"][data-tier-radio]');

    var markTier = function (value) {
      tiers.forEach(function (t) {
        var on = value !== '' && t.getAttribute('data-tier') === String(value);
        t.classList.toggle('is-selected', on);
        t.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    };
    var fire = function (el) {
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    };

    tiers.forEach(function (t) {
      t.addEventListener('click', function () {
        var v = t.getAttribute('data-tier');
        markTier(v);
        amountRadios.forEach(function (r) { r.checked = (r.value === v); });
        if (amountInput) { amountInput.value = v; fire(amountInput); }
      });
    });
    if (amountInput) {
      amountInput.addEventListener('input', function () {
        markTier(amountInput.value.trim());
        amountRadios.forEach(function (r) { r.checked = (r.value === amountInput.value.trim()); });
      });
    }
    amountRadios.forEach(function (r) {
      r.addEventListener('change', function () {
        if (!r.checked) return;
        markTier(r.value);
        if (amountInput) amountInput.value = r.value;
      });
    });
    var tierForm = (amountInput && amountInput.form) || (amountRadios[0] && amountRadios[0].form);
    if (tierForm) tierForm.addEventListener('reset', function () { markTier(''); });
  }

  /* ---------- Events filter ---------- */
  var chips = qsa('[data-filter]');
  if (chips.length) {
    var seasons = qsa('[data-season]');
    var status = qs('[data-filter-status]');
    var applyFilter = function (value) {
      var shown = 0;
      seasons.forEach(function (el) {
        var match = value === 'all' || el.getAttribute('data-season') === value;
        el.hidden = !match;
        if (match && el.classList.contains('event-card')) shown++;
      });
      chips.forEach(function (c) {
        c.setAttribute('aria-pressed', c.getAttribute('data-filter') === value ? 'true' : 'false');
      });
      if (status) {
        var chip = chips.filter(function (c) { return c.getAttribute('data-filter') === value; })[0];
        var label = chip ? chip.textContent.trim() : value;
        status.textContent = value === 'all'
          ? 'Showing all events.'
          : 'Showing ' + label.toLowerCase() + ' events' + (shown ? ' (' + shown + ').' : '.');
      }
    };
    chips.forEach(function (c) {
      c.addEventListener('click', function () { applyFilter(c.getAttribute('data-filter')); });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = qsa('.reveal');
  if (reveals.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      reveals.forEach(function (el) { io.observe(el); });
    }
  }
})();
