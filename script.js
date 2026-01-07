// ===== RESUME CARD SCROLL REVEAL =====
const resumeBox = document.querySelector('.resume-box');

const resumeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  {
    threshold: 0.3
  }
);

if (resumeBox) {
  resumeObserver.observe(resumeBox);
}
// ===== PAGE LOAD STAGGER ANIMATION =====
window.addEventListener("load", () => {
  const cards = document.querySelectorAll(".animate-card");

  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("show");
    }, index * 200); // delay between cards
  });
});

  // ===== Theme toggle (light / dark) =====
  function applyTheme(theme) {
    const root = document.documentElement;
    const btn = document.getElementById('themeToggle');
    if (theme === 'light') {
      root.classList.add('light-theme');
      if (btn) btn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      root.classList.remove('light-theme');
      if (btn) btn.innerHTML = '<i class="fas fa-moon"></i>';
    }
  }

  // initialize theme from localStorage (default = dark)
  const savedTheme = localStorage.getItem('theme');
  applyTheme(savedTheme === 'light' ? 'light' : 'dark');

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.documentElement.classList.toggle('light-theme');
      const newTheme = isLight ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      applyTheme(newTheme);
    });
  }

// Handle header navigation: smooth scroll, focus, and temporary highlight
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '') {
        // Home: reload the page
        e.preventDefault();
        window.location.reload();
        return;
      }
      if (!href.startsWith('#')) return; // external
      const target = document.querySelector(href);
      if (!target) return; // no target found
      e.preventDefault();
      // Smooth scroll to center of viewport
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Make focusable and focus without additional scrolling
      target.setAttribute('tabindex', '-1');
      setTimeout(() => {
        try { target.focus({ preventScroll: true }); } catch (err) { target.focus(); }
      }, 450);
      // Add highlight class then remove it after a while
      target.classList.add('highlight');
      
      // If target is a section heading, also highlight the content cards below it
      if (target.classList.contains('section-heading')) {
        const nextSibling = target.nextElementSibling;
        if (nextSibling && nextSibling.classList.contains('content-grid')) {
          const cards = nextSibling.querySelectorAll('.animate-card');
          cards.forEach(card => card.classList.add('highlight'));
          setTimeout(() => cards.forEach(card => card.classList.remove('highlight')), 2200);
        }
      }
      
      setTimeout(() => target.classList.remove('highlight'), 2200);
    });
  });
});
