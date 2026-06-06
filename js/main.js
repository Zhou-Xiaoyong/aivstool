// AI vs Tool - Global JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.dataset.open === 'true';
      navLinks.dataset.open = isOpen ? 'false' : 'true';
      navLinks.style.display = isOpen ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '56px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'white';
      navLinks.style.padding = '12px 16px';
      navLinks.style.boxShadow = '0 4px 12px rgba(15,23,42,0.08)';
      navLinks.style.borderBottom = '1px solid #e2e8f0';
      navLinks.style.gap = '0';
      navLinks.querySelectorAll('li a').forEach(a => {
        a.style.display = 'block';
        a.style.padding = '10px 14px';
        a.style.borderRadius = '8px';
      });
    });
  }

  // Search filter for homepage
  const searchInput = document.querySelector('.hero-search input');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const query = e.target.value.toLowerCase().trim();
      const cards = document.querySelectorAll('.category-card, .compare-card, .best-card');
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (query === '' || text.includes(query)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (query) {
          const cards = document.querySelectorAll('.category-card, .compare-card, .best-card');
          for (const card of cards) {
            if (card.textContent.toLowerCase().includes(query.toLowerCase())) {
              card.scrollIntoView({ behavior: 'smooth', block: 'center' });
              card.style.boxShadow = '0 0 0 3px #1a56db';
              setTimeout(() => { card.style.boxShadow = ''; }, 2000);
              break;
            }
          }
        }
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      const isOpen = answer.style.display === 'block';
      document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
      document.querySelectorAll('.faq-question').forEach(qu => qu.classList.remove('active'));
      if (!isOpen) {
        answer.style.display = 'block';
        this.classList.add('active');
      }
    });
  });

  // Subtle fade-in on scroll
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  document.querySelectorAll('.compare-card, .best-card, .category-card').forEach(el => {
    observer.observe(el);
  });
});
