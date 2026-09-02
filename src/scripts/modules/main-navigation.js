export function mainNavigation() {
  const navigation = document.querySelector('.main-navigation');
  const toggle = document.querySelector('.main-navigation-toggle');
  const close = navigation?.querySelector('.main-menu > i');

  if (!navigation || !toggle) return;

  // Open navigation
  toggle.addEventListener('click', () => {
    navigation.classList.add('main-navigation--active');
  });

  // Close navigation
  close?.addEventListener('click', () => {
    navigation.classList.remove('main-navigation--active');
  });

  // Close navigation when clicking an anchor link below 1200px
  const anchorLinks = navigation.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 1200) {
        navigation.classList.remove('main-navigation--active');
      }
    });
  });
}