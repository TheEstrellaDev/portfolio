/**
 * TheEstrellaDev - Portafolio Profesional
 * JavaScript Principal
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initStickyHeader();
  initActiveNavigation();
  initProjectFilters();
  initScrollAnimations();
  initContactForm();
  initDynamicYear();
  initScrollToTop();
});

/**
 * Manejo del Menú Móvil
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-link');

  if (!menuToggle || !navLinks) return;

  const toggleMenu = () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('open');
    document.body.style.overflow = !isExpanded ? 'hidden' : ''; // Prevenir scroll al abrir
  };

  menuToggle.addEventListener('click', toggleMenu);

  // Cerrar menú al hacer clic en un enlace
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // Cerrar con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      toggleMenu();
      menuToggle.focus();
    }
  });
}

/**
 * Cabecera fija y cambio de estilo al hacer scroll
 */
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Verificar estado inicial
}

/**
 * Resaltar enlace de navegación según la sección visible
 */
function initActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length === 0 || navLinks.length === 0) return;

  const highlightNavigation = () => {
    let scrollY = window.scrollY;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100; // Offset para el header
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavigation, { passive: true });
}

/**
 * Filtros de la sección Proyectos
 */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length === 0 || projectCards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remover clase activa de todos
      filterBtns.forEach(b => b.classList.remove('active'));
      // Añadir clase activa al presionado
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || filterValue === category) {
          card.style.display = 'flex';
          // Pequeña animación de entrada al filtrar
          card.style.animation = 'none';
          card.offsetHeight; /* trigger reflow */
          card.style.animation = null; 
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Animaciones suaves al hacer scroll (Intersection Observer)
 */
function initScrollAnimations() {
  // Respetar prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const animatedElements = document.querySelectorAll('.fade-in');
  
  if (animatedElements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target); // Solo animar una vez
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));
}

/**
 * Validación y manejo del Formulario de Contacto
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obtener valores
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const type = document.getElementById('type');
    const message = document.getElementById('message');
    const consent = document.getElementById('consent');
    
    let isValid = true;

    // Resetear errores
    document.querySelectorAll('.form-control').forEach(el => el.classList.remove('invalid'));
    document.querySelectorAll('.form-error').forEach(el => el.style.display = 'none');

    // Función de validación auxiliar
    const showError = (element, errorId) => {
      element.classList.add('invalid');
      document.getElementById(errorId).style.display = 'block';
      isValid = false;
    };

    // Validar nombre
    if (name.value.trim() === '') {
      showError(name, 'nameError');
    }

    // Validar email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      showError(email, 'emailError');
    }

    // Validar tipo
    if (type.value === '') {
      showError(type, 'typeError');
    }

    // Validar mensaje
    if (message.value.trim() === '') {
      showError(message, 'messageError');
    }

    // Validar consentimiento
    if (!consent.checked) {
      document.getElementById('consentError').style.display = 'block';
      isValid = false;
    }

    if (isValid) {
      // Como no hay backend, creamos un enlace mailto
      // Nota: Reemplazar el correo placeholder en el HTML
      const targetEmail = 'TU_CORREO_AQUI@ejemplo.com'; 
      const subject = encodeURIComponent(`Nuevo proyecto de ${name.value.trim()} - ${type.options[type.selectedIndex].text}`);
      
      let bodyText = `Nombre: ${name.value.trim()}\n`;
      bodyText += `Correo: ${email.value.trim()}\n`;
      bodyText += `Tipo de Proyecto: ${type.options[type.selectedIndex].text}\n\n`;
      bodyText += `Mensaje:\n${message.value.trim()}\n`;

      const body = encodeURIComponent(bodyText);

      // Abrir cliente de correo
      window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
      
      // Opcional: Mostrar mensaje de éxito local y resetear
      form.reset();
      alert('Se ha preparado tu mensaje. Se abrirá tu cliente de correo predeterminado para enviarlo.');
    }
  });
}

/**
 * Año automático para el Footer
 */
function initDynamicYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * Botón Volver Arriba
 */
function initScrollToTop() {
  const scrollTopBtn = document.getElementById('scrollTop');
  if (!scrollTopBtn) return;

  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });

  scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
