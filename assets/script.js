const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 24);
}

menuButton.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
});

navLinks.addEventListener('click', event => {
  if (event.target.matches('a')) {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

function animateStats(container) {
  container.querySelectorAll('[data-target]').forEach(value => {
    if (value.dataset.done === '1') return;
    value.dataset.done = '1';
    const target = Number(value.dataset.target || 0);
    const duration = 1100;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      value.textContent = `${Math.round(target * eased)}%`;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animateStats(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
document.getElementById('year').textContent = new Date().getFullYear();
