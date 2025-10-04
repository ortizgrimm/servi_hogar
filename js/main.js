/* FILE: scripts.js */
document.addEventListener('DOMContentLoaded', function () {

  /* ================================
     ACTUALIZAR AÑO EN EL FOOTER
  ================================ */
  const yearElement = document.getElementById('year');
  if (yearElement) yearElement.textContent = new Date().getFullYear();


  /* ================================
     MENÚ HAMBURGUESA Y SUBMENÚS
  ================================ */
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    // Toggle menú móvil
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuToggle.querySelector("i").classList.toggle("fa-times");
    });

    // Submenús móviles
    // Submenús móviles: solo uno abierto a la vez
window.toggleSubmenu = function(event) {
  event.preventDefault(); // evita navegación
  const parentLi = event.target.parentElement;

  // Obtener todos los li con submenú dentro del navLinks
  const allSubs = navLinks.querySelectorAll('li.show');

  // Cerrar todos excepto el que se clickeó
  allSubs.forEach(li => {
    if (li !== parentLi) li.classList.remove('show');
  });

  // Alternar el clic actual
  parentLi.classList.toggle('show');
};

  }


  /* ================================
     FORMULARIOS DE CONTACTO Y TRABAJO
  ================================ */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      alert('Mensaje enviado. Gracias, ' + (data.get('name') || '') + '!');
      contactForm.reset();
    });
  }

  const workForm = document.getElementById('workForm');
  if (workForm) {
    workForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Formulario enviado. Nos comunicaremos contigo pronto.');
      workForm.reset();
    });
  }


  /* ================================
     SCROLL SUAVE PARA ENLACES INTERNOS
  ================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });


  /* ================================
     ANIMACIÓN DE PARTÍCULAS EN CANVAS
  ================================ */
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');

    // Ajustar tamaño del canvas
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Clase Partícula
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

    // Crear partículas
    const particles = [];
    const particleCount = 80;
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 3 + 1;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const vx = (Math.random() - 0.5) * 0.6;
      const vy = (Math.random() - 0.5) * 0.6;
      const color = 'rgba(0, 201, 255, 0.5)';
      particles.push(new Particle(x, y, vx, vy, size, color));
    }

    // Animar
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Degradado de fondo
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
  }

});
