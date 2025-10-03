/* FILE: scripts.js */
// Navbar mobile toggle and dropdown behavior
document.addEventListener('DOMContentLoaded', function(){
// year in footer
document.getElementById('year').textContent = new Date().getFullYear();


const mobileToggle = document.querySelector('.mobile-toggle');
const navList = document.querySelector('.nav-list');
mobileToggle.addEventListener('click', () => {
navList.classList.toggle('open');
});


// Submenu toggles (for touch devices)
document.querySelectorAll('.has-sub > .sub-toggle').forEach(toggle => {
toggle.addEventListener('click', (e) => {
e.preventDefault();
const parent = toggle.parentElement;
parent.classList.toggle('open');
});
});


// Close mobile menu on link click
document.querySelectorAll('.nav-list a').forEach(a => {
a.addEventListener('click', () => {
if(navList.classList.contains('open')) navList.classList.remove('open');
});
});


// Simple contact form handling (example)
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
e.preventDefault();
const data = new FormData(contactForm);
// For demo: show a quick success message
alert('Mensaje enviado. Gracias, ' + (data.get('name') || ''));
contactForm.reset();
});


// Work form
const workForm = document.getElementById('workForm');
if(workForm){
workForm.addEventListener('submit', (e)=>{
e.preventDefault();
alert('Formulario enviado. Nos comunicaremos contigo pronto.');
workForm.reset();
});
}


// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
const targetId = this.getAttribute('href').slice(1);
if(!targetId) return;
const target = document.getElementById(targetId);
if(target){
e.preventDefault();
target.scrollIntoView({behavior: 'smooth', block: 'start'});
}
});
});
});

// Scroll suave al hacer clic en los enlaces
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// scripts.js (parte del fondo animado)
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');

  // Ajustar tamaño del canvas al tamaño de la ventana
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Clase para partículas
  class Particle {
    constructor(x, y, vx, vy, size, color) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.size = size;
      this.color = color;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  // Crear muchas partículas
  const particles = [];
  const particleCount = 80;
  for (let i = 0; i < particleCount; i++) {
    let size = Math.random() * 3 + 1;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let vx = (Math.random() - 0.5) * 0.6;
    let vy = (Math.random() - 0.5) * 0.6;
    let color = 'rgba(0, 201, 255, 0.5)'; // tono azulado
    particles.push(new Particle(x, y, vx, vy, size, color));
  }

  // Animación
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar un degradado de fondo suave
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, 'rgba(8,10,12,1)');
    grad.addColorStop(1, 'rgba(18,24,30,1)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar partículas
    particles.forEach(p => {
      p.update();
      p.draw(ctx);
    });

    requestAnimationFrame(animate);
  }
  animate();
});

// Dibujar un degradado de fondo suave
const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
grad.addColorStop(0, 'rgba(8,10,12,1)');
grad.addColorStop(1, 'rgba(18,24,30,1)');
ctx.fillStyle = grad;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Seleccionar los elementos
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

// Evento click en hamburguesa
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
