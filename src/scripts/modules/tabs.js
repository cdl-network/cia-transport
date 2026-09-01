export function tabs() {
  const tabs = document.querySelectorAll('.nav-tab');
const panels = document.querySelectorAll('.equipment-panel');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {

    const target = tab.dataset.tab;

    // Tabs
    tabs.forEach((item) => {
      item.classList.remove('is-active', 'text-primary');
      item.classList.add('text-primary/50');
    });

    tab.classList.add('is-active', 'text-primary');
    tab.classList.remove('text-primary/50');


    // Panels
    panels.forEach((panel) => {
      panel.classList.add('hidden');
    });

    document.getElementById(target).classList.remove('hidden');

  });
});
}