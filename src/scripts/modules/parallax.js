import simpleParallax from 'simple-parallax-js/vanilla';

export function parallax() {
  const images = document.querySelectorAll('.parallax-element');

  if (images.length > 0) {
    images.forEach(image => {
      const validOrientations = ['up', 'down', 'left', 'right'];
      let orientation = image.getAttribute('data-orientation') || 'down';

      // Validate orientation
      if (!validOrientations.includes(orientation)) {
        orientation = 'down';
      }

      new simpleParallax(image, {
        orientation: orientation,
        delay: 0.6,
        scale: 1.2,
        overflow: true,
      });
    });
  }
}