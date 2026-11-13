const root = document.documentElement;
const themeToggle = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
const storedTheme = localStorage.getItem('portfolio-theme');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const initialTheme = storedTheme ?? (prefersLight ? 'light' : 'dark');
root.dataset.theme = initialTheme;
if (themeToggle) {
  themeToggle.setAttribute('aria-pressed', String(initialTheme === 'light'));
  themeToggle.setAttribute('aria-label', `Cambiar a tema ${initialTheme === 'light' ? 'oscuro' : 'claro'}`);
  themeToggle.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = nextTheme;
    localStorage.setItem('portfolio-theme', nextTheme);
    themeToggle.setAttribute('aria-pressed', String(nextTheme === 'light'));
    themeToggle.setAttribute('aria-label', `Cambiar a tema ${nextTheme === 'light' ? 'oscuro' : 'claro'}`);
  });
}

const header = document.querySelector<HTMLElement>('[data-header]');
const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 12);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const menuToggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const nav = document.querySelector<HTMLElement>('#nav-links');
const setMenu = (open: boolean) => {
  menuToggle?.setAttribute('aria-expanded', String(open));
  menuToggle?.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  nav?.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
};
menuToggle?.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
nav?.querySelectorAll<HTMLAnchorElement>('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuToggle.focus();
  }
});

const filterButtons = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
const projectCards = document.querySelectorAll<HTMLElement>('.project-card[data-category]');
filterButtons.forEach((button) => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach((item) => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  projectCards.forEach((card) => {
    card.hidden = filter !== 'all' && card.dataset.category !== filter;
  });
}));

const sections = document.querySelectorAll<HTMLElement>('main section[id]');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    nav?.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
      link.classList.toggle('active', link.hash === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-25% 0px -65% 0px' });
sections.forEach((section) => sectionObserver.observe(section));
