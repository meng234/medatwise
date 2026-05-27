/* Med@Wise — shared site JS (vanilla, no deps) */
(function () {
  'use strict';

  // ---- Mobile nav toggle ----
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') links.classList.remove('open');
    });
  }

  // ---- Reveal-on-scroll using IntersectionObserver ----
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  // ---- Staggered team-member entrance ----
  const members = document.querySelectorAll('.member');
  if (members.length) {
    members.forEach((m, i) => {
      setTimeout(() => m.classList.add('in'), 80 + i * 80);
    });
  }

  // ---- Highlight current nav link ----
  const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a').forEach((a) => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href && (href === here || (href === 'index.html' && here === ''))) {
      a.classList.add('active');
    }
  });

  // ---- Contact form (graceful fallback to mailto) ----
  const form = document.querySelector('form[data-mw-contact]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const f = new FormData(form);
      const subject = encodeURIComponent('Med@Wise enquiry from ' + (f.get('name') || ''));
      const body = encodeURIComponent(
        'Name: ' + (f.get('name') || '') + '\n' +
        'Email: ' + (f.get('email') || '') + '\n' +
        'Phone: ' + (f.get('phone') || '') + '\n\n' +
        (f.get('message') || '')
      );
      window.location.href = 'mailto:info@medatwise.com?subject=' + subject + '&body=' + body;
    });
  }

  // CV "Download PDF" is now a direct <a download> link to a pre-rendered
  // PDF in cv/pdf/ — no client-side generation needed.
})();
