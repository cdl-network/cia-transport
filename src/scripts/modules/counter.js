export function counter() {
  const counters = document.querySelectorAll(".counter");

  if (!counters.length) return;

  const duration = 1500;

  const animateCounter = (counter) => {
    const targetText = counter.textContent.trim();
    const target = parseInt(targetText, 10);

    if (Number.isNaN(target)) return;

    const suffix = targetText.replace(/[0-9]/g, "");

    let startTime = null;

    const update = (currentTime) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      // Ease out
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(
        easedProgress * target
      );

      counter.textContent = `${currentValue}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = `${target}${suffix}`;
      }
    };

    requestAnimationFrame(update);
  };


  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        counters.forEach((counter) => {
          animateCounter(counter);
        });

        observer.disconnect();
      });
    },
    {
      threshold: 0.5
    }
  );

  observer.observe(counters[0]);
}