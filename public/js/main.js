/* ========================================
   BEAMO — Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- NAVBAR SCROLL EFFECT ----------
  const navbar = document.getElementById('navbar');
  const OPACITY_THRESHOLD = 200; // Configurable threshold in pixels
  let ticking = false;

  const updateNavbarOpacity = () => {
    const scrollY = window.scrollY;
    
    // Calculate opacity: 0 at top, 1 at threshold
    const opacity = Math.min(scrollY / OPACITY_THRESHOLD, 1);
    
    // Apply opacity to navbar background
    navbar.style.setProperty('--navbar-opacity', opacity);
    
    // Keep the scrolled class for other effects (e.g., shadow)
    if (scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    ticking = false;
  };

  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbarOpacity);
      ticking = true;
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

  // ---------- BROWSER FRAME TYPING ANIMATION ----------
  const browserFrame = document.querySelector('.browser-frame');
  if (browserFrame) {
    const codeLines = browserFrame.querySelectorAll('.code-line-row');
    let animationStarted = false;

    const typeLineText = (lineEl, callback) => {
      const content = lineEl.querySelector('.code-content');
      const fullHTML = content.innerHTML;
      content.innerHTML = '';
      content.style.width = 'auto';
      lineEl.classList.add('typing');

      // Get the plain text length for timing
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = fullHTML;
      const plainText = tempDiv.textContent;
      const totalChars = plainText.length;

      let charIndex = 0;
      const typeSpeed = 60;

      // We'll reveal the full HTML progressively by measuring plain text chars
      const type = () => {
        charIndex++;
        if (charIndex <= totalChars) {
          // Map charIndex to a position in fullHTML (accounting for tags)
          let plainCount = 0;
          let htmlIndex = 0;
          let inTag = false;
          for (let i = 0; i < fullHTML.length; i++) {
            if (fullHTML[i] === '<') inTag = true;
            if (!inTag) plainCount++;
            if (fullHTML[i] === '>') inTag = false;
            if (plainCount >= charIndex && !inTag) {
              htmlIndex = i + 1;
              break;
            }
          }
          content.innerHTML = fullHTML.substring(0, htmlIndex);
          setTimeout(type, typeSpeed);
        } else {
          content.innerHTML = fullHTML;
          lineEl.classList.remove('typing');
          lineEl.classList.add('typed');
          if (callback) callback();
        }
      };

      setTimeout(type, typeSpeed);
    };

    const startTypingAnimation = () => {
      if (animationStarted) return;
      animationStarted = true;

      // Hide all code content initially
      codeLines.forEach(line => {
        const content = line.querySelector('.code-content');
        content.style.width = '0';
      });

      const typeNext = (index) => {
        if (index >= codeLines.length) {
          // Show blinking cursor on last line
          const lastLine = codeLines[codeLines.length - 1];
          lastLine.classList.add('typing');
          return;
        }
        typeLineText(codeLines[index], () => {
          setTimeout(() => typeNext(index + 1), 200);
        });
      };

      setTimeout(() => typeNext(0), 400);
    };

    const browserObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startTypingAnimation();
            browserObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    browserObserver.observe(browserFrame);
  }

  // ---------- FAQ ACCORDION (SINGLE-OPEN) ----------
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const summary = item.querySelector('summary');

    summary.addEventListener('click', e => {
      e.preventDefault();

      const isOpen = item.hasAttribute('open');

      // Close all other items
      faqItems.forEach(other => {
        if (other !== item && other.hasAttribute('open')) {
          const otherAnswer = other.querySelector('.faq-answer');
          otherAnswer.style.maxHeight = otherAnswer.scrollHeight + 'px';
          requestAnimationFrame(() => {
            otherAnswer.style.maxHeight = '0';
            otherAnswer.style.padding = '0';
          });
          // Remove open after transition
          otherAnswer.addEventListener('transitionend', function handler() {
            other.removeAttribute('open');
            otherAnswer.removeEventListener('transitionend', handler);
          });
        }
      });

      if (!isOpen) {
        // Open this item
        item.setAttribute('open', '');
        const answer = item.querySelector('.faq-answer');
        answer.style.maxHeight = '0';
        answer.style.padding = '0';
        requestAnimationFrame(() => {
          answer.style.maxHeight = answer.scrollHeight + 'px';
          answer.style.padding = '';
        });
      } else {
        // Close this item
        const answer = item.querySelector('.faq-answer');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        requestAnimationFrame(() => {
          answer.style.maxHeight = '0';
          answer.style.padding = '0';
        });
        answer.addEventListener('transitionend', function handler() {
          item.removeAttribute('open');
          answer.removeEventListener('transitionend', handler);
        });
      }
    });
  });
});
