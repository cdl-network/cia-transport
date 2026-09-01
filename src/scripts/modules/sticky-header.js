export function stickyHeader() {
  const header = document.querySelector('.site-header');

  if (!header) return;

  const toggleHeader = () => {
    header.classList.toggle(
      'site-header--fixed',
      window.scrollY > 50
    );
  };

  toggleHeader();

  window.addEventListener('scroll', toggleHeader, {
    passive: true
  });
}