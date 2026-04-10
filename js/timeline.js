/**
 * timeline.js — Sequential reveal of timeline items + click interaction
 */
(function () {
  'use strict';

  const items = document.querySelectorAll('.timeline-item');
  if (!items.length) return;

  /* === Sequential reveal on scroll === */
  if ('IntersectionObserver' in window) {
    const timeline = document.querySelector('.timeline');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            items.forEach((item, i) => {
              setTimeout(() => {
                item.classList.add('revealed');
              }, i * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (timeline) observer.observe(timeline);
  } else {
    items.forEach((item) => item.classList.add('revealed'));
  }

  /* === Click to activate phase === */
  items.forEach((item) => {
    item.addEventListener('click', () => {
      items.forEach((it) => it.classList.remove('active'));
      item.classList.add('active');
    });
  });
})();
