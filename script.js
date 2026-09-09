const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('#theme-toggle');
const themeLabel = document.querySelector('.theme-label');
const backToTop = document.querySelector('.back-to-top');

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

function updateThemeLabel() {
  const isDark = document.body.classList.contains('dark-theme');
  themeLabel.textContent = isDark ? 'Tema claro' : 'Tema oscuro';
  themeToggle.setAttribute('aria-label', isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
}

if (localStorage.getItem('cv-theme') === 'dark') document.body.classList.add('dark-theme');
updateThemeLabel();
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  localStorage.setItem('cv-theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
  updateThemeLabel();
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelector('#export-button')?.addEventListener('click', () => {
  window.print();
});

window.addEventListener('scroll', () => {
  backToTop?.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });

document.querySelector('#current-year').textContent = new Date().getFullYear();
document.querySelector('#hero-year').textContent = new Date().getFullYear();
