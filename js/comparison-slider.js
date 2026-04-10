/**
 * comparison-slider.js — Draggable before/after comparison
 */
(function () {
  'use strict';

  const container = document.querySelector('.comparison-container');
  if (!container) return;

  const handle = container.querySelector('.comparison-handle');
  let isDragging = false;

  function getPosition(e) {
    const rect = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    return Math.max(10, Math.min(rect.width - 10, x));
  }

  function updateSlider(x) {
    const rect = container.getBoundingClientRect();
    const pct = (x / rect.width) * 100;
    container.style.setProperty('--slider-pos', pct + '%');
    container.style.setProperty('--clip-right', (100 - pct) + '%');
    // Update aria
    handle.setAttribute('aria-valuenow', Math.round(pct));
  }

  // Pointer events
  handle.addEventListener('pointerdown', (e) => {
    isDragging = true;
    handle.setPointerCapture(e.pointerId);
    e.preventDefault();
  });

  handle.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    updateSlider(getPosition(e));
  });

  handle.addEventListener('pointerup', () => {
    isDragging = false;
  });

  // Click anywhere on container to move slider
  container.addEventListener('click', (e) => {
    if (e.target === handle || handle.contains(e.target)) return;
    updateSlider(getPosition(e));
  });

  // Keyboard
  handle.addEventListener('keydown', (e) => {
    const rect = container.getBoundingClientRect();
    const current = parseFloat(container.style.getPropertyValue('--slider-pos')) || 50;
    const step = 5;
    let next = current;

    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      next = Math.max(2, current - step);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      next = Math.min(98, current + step);
    } else {
      return;
    }

    e.preventDefault();
    container.style.setProperty('--slider-pos', next + '%');
    container.style.setProperty('--clip-right', (100 - next) + '%');
    handle.setAttribute('aria-valuenow', Math.round(next));
  });
})();
