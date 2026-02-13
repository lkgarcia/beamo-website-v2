/* ========================================
   BEAMO — Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- NAVBAR SCROLL EFFECT ----------
  const navbar = document.getElementById('navbar');

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ---------- MOBILE NAV TOGGLE ----------
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ---------- ACTIVE NAV LINK ON SCROLL ----------
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a:not(.btn)');

  const highlightNav = () => {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navAnchors.forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === `#${id}`) {
            a.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // ---------- SCROLL REVEAL ANIMATIONS ----------
  const fadeElements = document.querySelectorAll(
    '.service-text, .service-visual, .about-text, .about-visual, ' +
    '.testimonial-card, .faq-item, .contact-info, .contact-form, ' +
    '.feature-card'
  );

  fadeElements.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Stagger sibling cards
          const parent = entry.target.parentElement;
          if (entry.target.classList.contains('feature-card') || entry.target.classList.contains('testimonial-card')) {
            const siblings = Array.from(parent.children);
            const index = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = `${index * 0.08}s`;
          }
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  fadeElements.forEach(el => observer.observe(el));

  // ---------- CONTACT FORM ----------
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Simulate send
    setTimeout(() => {
      btn.textContent = 'Sent ✓';
      btn.style.background = '#6DD794';
      contactForm.reset();

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 2500);
    }, 1200);
  });

  // ---------- SMOOTH SCROLL OFFSET ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight + 16;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
});
