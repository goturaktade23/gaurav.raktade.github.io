/* ==========================================================================
   Gaurav Raktade — Portfolio Script
   Vanilla JS only. No dependencies.
   ========================================================================== */

(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------------
     Footer year
  --------------------------------------------------------------------- */
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------------------
     Sticky header background on scroll
  --------------------------------------------------------------------- */
  const header = document.getElementById('siteHeader');
  const onHeaderScroll = () => {
    if (window.scrollY > 24) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onHeaderScroll();
  window.addEventListener('scroll', onHeaderScroll, { passive: true });

  /* ---------------------------------------------------------------------
     Scroll progress bar
  --------------------------------------------------------------------- */
  const progressBar = document.getElementById('scrollProgress');
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);

  /* ---------------------------------------------------------------------
     Mobile nav toggle
  --------------------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  const closeNav = () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) closeNav();
  });

  /* ---------------------------------------------------------------------
     Active nav link highlighting based on section in view
  --------------------------------------------------------------------- */
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    let currentId = '';
    const scrollPos = window.scrollY + window.innerHeight * 0.35;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.id;
      }
    });

    navAnchors.forEach(a => {
      const match = a.getAttribute('href') === '#' + currentId;
      a.classList.toggle('active', match);
    });
  };
  highlightNav();
  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ---------------------------------------------------------------------
     Scroll-to-top button
  --------------------------------------------------------------------- */
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const toggleScrollTopBtn = () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
  };
  toggleScrollTopBtn();
  window.addEventListener('scroll', toggleScrollTopBtn, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  /* ---------------------------------------------------------------------
     Typing animation — cycles through role titles
  --------------------------------------------------------------------- */
  const roles = [
    'DevOps Engineer',
    'Middleware Specialist',
    'Site Reliability Engineer',
    'Automation Enthusiast'
  ];
  const typedEl = document.getElementById('typedRole');

  if (typedEl) {
    if (prefersReducedMotion) {
      typedEl.textContent = roles[0];
    } else {
      let roleIndex = 0;
      let charIndex = 0;
      let deleting = false;

      const TYPE_SPEED = 70;
      const DELETE_SPEED = 40;
      const HOLD_TIME = 1700;
      const GAP_TIME = 350;

      const tick = () => {
        const currentRole = roles[roleIndex];

        if (!deleting) {
          charIndex++;
          typedEl.textContent = currentRole.slice(0, charIndex);
          if (charIndex === currentRole.length) {
            deleting = true;
            setTimeout(tick, HOLD_TIME);
            return;
          }
          setTimeout(tick, TYPE_SPEED);
        } else {
          charIndex--;
          typedEl.textContent = currentRole.slice(0, charIndex);
          if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(tick, GAP_TIME);
            return;
          }
          setTimeout(tick, DELETE_SPEED);
        }
      };

      setTimeout(tick, 900);
    }
  }

  /* ---------------------------------------------------------------------
     Scroll-reveal animations (IntersectionObserver)
  --------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');

  if (prefersReducedMotion) {
    revealEls.forEach(el => el.classList.add('in-view'));
  } else if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------------------------------------------------------------------
     Animated stat counters
  --------------------------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-number');

  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimal || '0', 10);
    const duration = 1600;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = target * eased;
      el.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toFixed(decimals) + suffix;
      }
    };

    if (prefersReducedMotion) {
      el.textContent = target.toFixed(decimals) + suffix;
    } else {
      requestAnimationFrame(step);
    }
  };

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));
  } else {
    statNumbers.forEach(animateCounter);
  }

  /* ---------------------------------------------------------------------
     Floating particles in hero background
  --------------------------------------------------------------------- */
  const particlesContainer = document.getElementById('particles');

  if (particlesContainer && !prefersReducedMotion) {
    const PARTICLE_COUNT = window.innerWidth < 768 ? 16 : 32;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = document.createElement('span');
      p.className = 'particle';

      const size = Math.random() * 3 + 1.5;
      const left = Math.random() * 100;
      const duration = Math.random() * 12 + 14;
      const delay = Math.random() * 16;
      const drift = (Math.random() - 0.5) * 120;

      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = left + 'vw';
      p.style.bottom = '-20px';
      p.style.setProperty('--drift', drift + 'px');
      p.style.animationDuration = duration + 's';
      p.style.animationDelay = delay + 's';

      fragment.appendChild(p);
    }

    particlesContainer.appendChild(fragment);
  }

  /* ---------------------------------------------------------------------
     Lazy-load images that use data-src (progressive enhancement)
  --------------------------------------------------------------------- */
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading is supported; nothing further needed.
  }

})();
