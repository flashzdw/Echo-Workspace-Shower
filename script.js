/* ============================================================
   Echo Workspace — Marketing Site
   Interactions: scroll reveal, nav scroll state, hamburger,
   flow progress, smooth scroll anchors, theme sync
   ============================================================ */
(function () {
  'use strict';

  // ---------- 1. Scroll Reveal ----------
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    // Fallback: just show them
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // ---------- 2. Nav scroll state ----------
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.pageYOffset > 24) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- 3. Hamburger toggle ----------
  const navToggle = document.getElementById('navToggle');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('nav--open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.setAttribute('aria-label', isOpen ? '关闭菜单' : '打开菜单');
    });
    // Close menu when clicking any nav link
    nav.querySelectorAll('.nav__menu a').forEach((a) => {
      a.addEventListener('click', () => {
        nav.classList.remove('nav--open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', '打开菜单');
      });
    });
  }

  // ---------- 4. Flow progress trigger ----------
  const flow = document.getElementById('flow');
  if (flow && 'IntersectionObserver' in window) {
    const flowIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          flow.classList.add('flow--in-view');
          flowIO.unobserve(flow);
        }
      });
    }, { threshold: 0.3 });
    flowIO.observe(flow);
  } else if (flow) {
    flow.classList.add('flow--in-view');
  }

  // ---------- 5. Smooth scroll for in-page anchors ----------
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 0;
        const y = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 8;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // ---------- 6. Theme sync (responsive to system changes) ----------
  if (window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = (e) => {
      const stored = localStorage.getItem('echo-theme');
      if (stored) return; // User preference wins
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    };
    // mql.addEventListener is the modern API; fall back to addListener for older browsers
    if (mq.addEventListener) {
      mq.addEventListener('change', sync);
    } else if (mq.addListener) {
      mq.addListener(sync);
    }
  }
})();
