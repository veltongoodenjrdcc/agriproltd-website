/* ============================================================
   Agricultural Professionals Ltd. - main.js
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

  function setMobileMenuState(isOpen) {
    if (!mobileMenu || !hamburger) return;
    mobileMenu.classList.toggle('open', isOpen);
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    if ('inert' in mobileMenu) mobileMenu.inert = !isOpen;
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    const icon = hamburger.querySelector('i');
    if (icon) { icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'; }
  }

  function closeMobileMenu() {
    setMobileMenuState(false);
  }

  if (hamburger && mobileMenu) {
    setMobileMenuState(false);

    hamburger.addEventListener('click', () => {
      setMobileMenuState(!mobileMenu.classList.contains('open'));
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

  /* ---- Smooth in-page navigation -------------------------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeScrollFrame = null;

  function getHashTarget(hash) {
    if (!hash || hash === '#') return null;
    try {
      return document.getElementById(decodeURIComponent(hash.slice(1)));
    } catch (error) {
      return null;
    }
  }

  function focusTarget(target) {
    const hadTabIndex = target.hasAttribute('tabindex');
    if (!hadTabIndex) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    if (!hadTabIndex) {
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
  }

  function jumpToScrollTop(top) {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, top);
    root.style.scrollBehavior = previousScrollBehavior;
  }

  function scrollToPosition(top, behavior) {
    if (activeScrollFrame) {
      window.cancelAnimationFrame(activeScrollFrame);
      activeScrollFrame = null;
    }

    if (behavior === 'auto') {
      jumpToScrollTop(top);
      return;
    }

    const start = window.scrollY;
    const distance = top - start;
    const duration = Math.min(760, Math.max(280, Math.abs(distance) * 0.12));
    const startTime = window.performance.now();

    const step = now => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      jumpToScrollTop(start + (distance * eased));

      if (progress < 1) {
        activeScrollFrame = window.requestAnimationFrame(step);
      } else {
        activeScrollFrame = null;
      }
    };

    activeScrollFrame = window.requestAnimationFrame(step);
  }

  function scrollTargetIntoView(target, behavior) {
    const scrollPadding = parseFloat(window.getComputedStyle(document.documentElement).scrollPaddingTop);
    const offset = Number.isFinite(scrollPadding) ? scrollPadding : ((nav ? nav.offsetHeight : 0) + 16);
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    scrollToPosition(Math.max(0, top), behavior);
  }

  function restoreHashLanding() {
    const target = getHashTarget(window.location.hash);
    if (target) scrollTargetIntoView(target, 'auto');
  }

  let initialHashStabilizerStarted = false;

  function stabilizeInitialHashLanding() {
    if (initialHashStabilizerStarted || !window.location.hash) return;
    initialHashStabilizerStarted = true;

    const restoreForCurrentHash = () => {
      if (window.location.hash) restoreHashLanding();
    };

    restoreForCurrentHash();
    [150, 500, 1000, 2000, 3500, 5000].forEach(delay => {
      window.setTimeout(restoreForCurrentHash, delay);
    });

    if ('ResizeObserver' in window && document.body) {
      const observer = new ResizeObserver(restoreForCurrentHash);
      observer.observe(document.body);
      window.setTimeout(() => observer.disconnect(), 5000);
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const hash = link.getAttribute('href');
      const target = getHashTarget(hash);
      if (!target) return;

      e.preventDefault();
      closeMobileMenu();

      window.requestAnimationFrame(() => {
        scrollTargetIntoView(target, prefersReducedMotion ? 'auto' : 'smooth');

        if (window.location.hash !== hash) {
          window.history.pushState(null, '', hash);
        }

        window.setTimeout(() => focusTarget(target), prefersReducedMotion ? 0 : 820);
      });
    });
  });

  if (window.location.hash) {
    window.requestAnimationFrame(stabilizeInitialHashLanding);
    window.addEventListener('load', stabilizeInitialHashLanding);
  }

  /* ---- Active nav link via IntersectionObserver ----------- */
  const navLinks  = document.querySelectorAll('[data-nav-link]');
  const sections = Array.from(
    new Set(
      Array.from(navLinks)
        .map(link => getHashTarget(link.getAttribute('href')))
        .filter(Boolean)
    )
  );

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
