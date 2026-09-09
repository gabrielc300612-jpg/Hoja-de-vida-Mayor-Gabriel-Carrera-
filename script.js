const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('#theme-toggle');
const themeLabel = document.querySelector('.theme-label');
const toast = document.querySelector('#toast');

// Menú móvil y cierre al seleccionar una sección.
menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
});
navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  if (menuToggle) menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
}));

function updateThemeLabel() {
  const isDark = document.body.classList.contains('dark-theme');
  themeLabel.textContent = isDark ? 'Tema claro' : 'Tema oscuro';
  themeToggle.setAttribute('aria-label', isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
  themeToggle.querySelector('i').className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}
if (localStorage.getItem('cyberlab-theme') === 'dark') document.body.classList.add('dark-theme');
updateThemeLabel();
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  localStorage.setItem('cyberlab-theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
  updateThemeLabel();
});

// Aparición progresiva de los bloques al entrar en pantalla.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const simulationSteps = [...document.querySelectorAll('.cycle-step')];
let simulationTimer;
document.querySelector('#start-simulation')?.addEventListener('click', (event) => {
  clearInterval(simulationTimer);
  let step = 0;
  const status = document.querySelector('#simulation-status');
  const button = event.currentTarget;
  button.disabled = true;
  const runStep = () => {
    simulationSteps.forEach((item, index) => item.classList.toggle('highlight', index === step));
    status.textContent = `Fase activa: ${simulationSteps[step].querySelector('strong').textContent}`;
    step = (step + 1) % simulationSteps.length;
  };
  runStep();
  simulationTimer = setInterval(runStep, 1200);
  setTimeout(() => { clearInterval(simulationTimer); button.disabled = false; status.textContent = 'Ciclo completado · listo para repetir'; }, 5200);
});

const memoryContent = {
  registers: ['Registros', 'El almacenamiento más cercano al procesador, diseñado para resultados e instrucciones inmediatas.'],
  cache: ['Memoria caché', 'Conserva datos de uso frecuente para reducir el tiempo de espera entre el procesador y la memoria principal.'],
  ram: ['Memoria RAM', 'Mantiene temporalmente los programas y datos activos. Su contenido es rápido, amplio y volátil.'],
  storage: ['Almacenamiento secundario', 'Guarda grandes volúmenes de información de forma persistente, aunque con menor velocidad de acceso.'],
};
document.querySelectorAll('.memory-level').forEach((level) => level.addEventListener('click', () => {
  document.querySelectorAll('.memory-level').forEach((item) => item.classList.remove('active'));
  level.classList.add('active');
  const [title, description] = memoryContent[level.dataset.memory];
  document.querySelector('#memory-detail strong').textContent = title;
  document.querySelector('#memory-detail p').textContent = description;
}));

 document.querySelectorAll('.address-card').forEach((card) => card.addEventListener('click', () => {
  document.querySelectorAll('.address-card').forEach((item) => item.classList.remove('selected'));
  card.classList.add('selected');
  const selected = card.dataset.address;
  document.querySelectorAll('[data-type]').forEach((cell) => cell.classList.toggle('focused', cell.dataset.type === selected));
}));
document.querySelector('.address-card.selected')?.click();

const topologyData = {
  star: { title: 'Estrella', number: 'TOPOLOGÍA 01', text: 'Todos los dispositivos se conectan a un switch central.', pros: 'Fácil de gestionar y ampliar.', cons: 'Depende del nodo central.', impact: 'un fallo en el switch afecta a toda la red.', diagram: '<div class="star-diagram"><span class="device d1">PC</span><span class="device d2">PC</span><span class="device d3">PC</span><span class="device d4">PC</span><span class="switch-node">SW</span></div>' },
  ring: { title: 'Anillo', number: 'TOPOLOGÍA 02', text: 'Cada dispositivo se conecta con sus dos vecinos formando un circuito.', pros: 'Flujo ordenado y predecible.', cons: 'Una interrupción puede afectar el circuito.', impact: 'el sentido del tráfico condiciona la recuperación.', diagram: '<div class="ring-diagram"><span class="device d1">PC</span><span class="device d2">PC</span><span class="device d3">PC</span><span class="device d4">PC</span></div>' },
  bus: { title: 'Bus', number: 'TOPOLOGÍA 03', text: 'Todos los equipos comparten un cable principal para comunicarse.', pros: 'Instalación simple y económica.', cons: 'El medio compartido puede saturarse.', impact: 'un daño en el cable principal interrumpe el segmento.', diagram: '<div class="bus-diagram"><span class="device">PC</span><span class="device">PC</span><span class="device">PC</span><span class="device">PC</span></div>' },
};
document.querySelectorAll('.topology-tab').forEach((tab) => tab.addEventListener('click', () => {
  document.querySelectorAll('.topology-tab').forEach((item) => item.classList.remove('active'));
  tab.classList.add('active');
  const data = topologyData[tab.dataset.topology];
  document.querySelector('#topology-visual').innerHTML = data.diagram;
  document.querySelector('#topology-info').innerHTML = `<span class="card-number">${data.number}</span><h4>${data.title}</h4><p>${data.text}</p><div class="pros-cons"><span><b>+</b> ${data.pros}</span><span><b>−</b> ${data.cons}</span></div><small>IMPACTO: ${data.impact}</small>`;
}));

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// Exporta el contenido principal cuando las librerías CDN están disponibles; imprime como respaldo.
document.querySelector('#export-button')?.addEventListener('click', async () => {
  const button = document.querySelector('#export-button');
  button.disabled = true;
  button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparando...';
  try {
    if (!window.html2canvas || !window.jspdf) throw new Error('Librerías no disponibles');
    const canvas = await window.html2canvas(document.querySelector('#contenido-principal'), { scale: 1.35, backgroundColor: '#f3f7fa' });
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imageWidth = 190;
    const imageHeight = (canvas.height * imageWidth) / canvas.width;
    let heightLeft = imageHeight;
    let position = 10;
    pdf.setFontSize(16); pdf.text('Arquitectura, Redes y Ciberinvestigación', 10, 8);
    pdf.addImage(canvas.toDataURL('image/jpeg', .9), 'JPEG', 10, position, imageWidth, imageHeight);
    heightLeft -= 277;
    while (heightLeft > 0) { position = heightLeft - imageHeight + 10; pdf.addPage(); pdf.addImage(canvas.toDataURL('image/jpeg', .9), 'JPEG', 10, position, imageWidth, imageHeight); heightLeft -= 277; }
    pdf.save('arquitectura-redes-ciberinvestigacion.pdf');
    showToast('PDF generado correctamente.');
  } catch (error) {
    window.print();
    showToast('Se abrió la vista de impresión para guardar el PDF.');
  } finally {
    button.disabled = false;
    button.innerHTML = '<i class="fa-solid fa-file-pdf"></i> Exportar a PDF';
  }
});

document.querySelector('#current-year').textContent = new Date().getFullYear();
document.querySelector('#hero-year').textContent = new Date().getFullYear();
window.addEventListener('scroll', () => document.querySelector('.back-to-top')?.classList.toggle('visible', window.scrollY > 500), { passive: true });
