// Controles de navegación, tema, simulaciones y exportación del sitio.
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('#theme-toggle');
const themeLabel = document.querySelector('.theme-label');
const backToTop = document.querySelector('.back-to-top');
menuToggle?.addEventListener('click', () => { const open = navLinks.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); });
navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { navLinks.classList.remove('open'); menuToggle?.setAttribute('aria-expanded', 'false'); }));
function updateThemeLabel() { const dark = document.body.classList.contains('dark-theme'); themeLabel.textContent = dark ? 'Modo claro' : 'Modo oscuro'; themeToggle.setAttribute('aria-label', dark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'); }
if (localStorage.getItem('cyberlab-theme') === 'dark') document.body.classList.add('dark-theme');
updateThemeLabel();
themeToggle?.addEventListener('click', () => { document.body.classList.toggle('dark-theme'); localStorage.setItem('cyberlab-theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light'); updateThemeLabel(); });
const revealObserver = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); } }); }, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
const cycleSteps = [...document.querySelectorAll('.cycle-step')];
const cycleWrap = document.querySelector('.cycle-wrap');
const simulationStatus = document.querySelector('#simulation-status');
let simulationTimer;
document.querySelector('#simulate-button')?.addEventListener('click', (event) => { clearInterval(simulationTimer); cycleWrap.classList.add('running'); let step = 0; const updateStep = () => { cycleSteps.forEach((item, index) => item.classList.toggle('active', index === step)); simulationStatus.textContent = `${cycleSteps[step].querySelector('strong').textContent}: ${cycleSteps[step].querySelector('small').textContent}.`; step = (step + 1) % cycleSteps.length; }; updateStep(); simulationTimer = setInterval(updateStep, 1200); event.currentTarget.textContent = '↻ Reiniciar simulación'; });
document.querySelectorAll('.topology-tab').forEach((tab) => tab.addEventListener('click', () => { const selected = tab.dataset.topology; document.querySelectorAll('.topology-tab').forEach((item) => item.classList.toggle('active', item === tab)); document.querySelectorAll('.topology-diagram').forEach((diagram) => diagram.classList.toggle('active', diagram.dataset.diagram === selected)); }));
document.querySelector('#export-button')?.addEventListener('click', async (event) => { const button = event.currentTarget; const originalText = button.textContent; button.textContent = 'Generando PDF...'; button.disabled = true; try { if (!window.html2canvas || !window.jspdf) throw new Error('Librerías no disponibles'); const canvas = await window.html2canvas(document.querySelector('#pdf-content'), { scale: 1.5, backgroundColor: getComputedStyle(document.body).backgroundColor, useCORS: true }); const { jsPDF } = window.jspdf; const pdf = new jsPDF('p', 'mm', 'a4'); const width = 190; const titleHeight = 18; const height = (canvas.height * width) / canvas.width; const pageHeight = 277; let offset = 0; while (offset < height) { if (offset > 0) pdf.addPage(); pdf.setFontSize(15); pdf.setTextColor(19, 34, 56); if (offset === 0) pdf.text('Fundamentos de Arquitectura de Computadores, Redes y Ciberinvestigación', 10, 15); pdf.addImage(canvas.toDataURL('image/jpeg', 0.9), 'JPEG', 10, titleHeight - offset, width, height); offset += pageHeight; } pdf.save('arquitectura-redes-ciberinvestigacion.pdf'); } catch (error) { window.print(); } finally { button.textContent = originalText; button.disabled = false; } });
window.addEventListener('scroll', () => backToTop?.classList.toggle('visible', window.scrollY > 500), { passive: true });
document.querySelector('#current-year').textContent = new Date().getFullYear();
document.querySelector('#hero-year').textContent = new Date().getFullYear();
