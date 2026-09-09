// Interacciones ligeras y accesibles del sitio.
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const printButton = document.querySelector('#print-button');
const backToTop = document.querySelector('.back-to-top');

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

printButton?.addEventListener('click', () => window.print());

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });

document.querySelectorAll('.topology-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    const selectedTopology = tab.dataset.topology;
    document.querySelectorAll('.topology-tab').forEach((item) => item.classList.remove('active'));
    document.querySelectorAll('.topology-diagram').forEach((diagram) => diagram.classList.remove('active'));
    tab.classList.add('active');
    document.querySelector(`[data-diagram="${selectedTopology}"]`)?.classList.add('active');
  });
});

document.querySelector('#current-year').textContent = new Date().getFullYear();