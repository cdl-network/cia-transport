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
}