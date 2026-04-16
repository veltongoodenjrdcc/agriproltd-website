/* ============================================================
   Agricultural Professionals Ltd. (AgriPro) - main.js
   Handles: nav scroll, hamburger, active nav, reveal, float CTA
   ============================================================ */

(function () {
  'use strict';

  /* ---- Footer year ---------------------------------------- */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Nav: add shadow on scroll -------------------------- */
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Hamburger / mobile menu ---------------------------- */
  const hamburger  = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('nav-mobile-menu');

  function closeMobileMenu() {
    if (!mobileMenu || !hamburger) return;
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    const icon = hamburger.querySelector('i');
    if (icon) { icon.className = 'fa-solid fa-bars'; }
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      const icon = hamburger.querySelector('i');
      if (icon) { icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'; }
    });

    mobileMenu.querySelectorAll('.nav__mobile-link').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', e => {
      if (nav && !nav.contains(e.target) && !mobileMenu.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMobileMenu();
    });
  }

  /* ---- Active nav link via IntersectionObserver ----------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('[data-nav-link]');

  if (sections.length && navLinks.length) {
    const activeObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
              const matches = link.getAttribute('href') === '#' + id;
              link.setAttribute('aria-current', matches ? 'location' : 'false');
            });
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    sections.forEach(s => activeObserver.observe(s));
  }

  /* ---- Scroll reveal -------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ---- Floating CTA: hide when final banner visible ------- */
  const finalCta    = document.getElementById('final-cta');
  const floatingBtn = document.getElementById('floating-cta');

  if (finalCta && floatingBtn) {
    const bannerObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          floatingBtn.classList.toggle('hidden', entry.isIntersecting);
        });
      },
      { threshold: 0.15 }
    );
    bannerObserver.observe(finalCta);
  }

})();
