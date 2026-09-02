export function scrollToSection() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const hash = link.getAttribute('href');

      // Ignore empty hash
      if (!hash || hash === '#') return;

      const targetId = decodeURIComponent(hash.substring(1));
      const targetSection = document.getElementById(targetId);

      if (!targetSection) {
        return;
      }

      event.preventDefault();

      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Update URL without jumping
      // history.pushState(null, '', hash);
    });
  });
}