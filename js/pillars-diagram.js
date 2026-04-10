/**
 * pillars-diagram.js — Interactive three-pillar SVG diagram + accordion details
 */
(function () {
  'use strict';

  const nodes = document.querySelectorAll('.pillar-node');
  const details = {
    filosofia: document.getElementById('detail-filosofia'),
    design: document.getElementById('detail-design'),
    neuro: document.getElementById('detail-neuro'),
  };

  let activeKey = null;

  function togglePillar(key) {
    // Close previous
    if (activeKey && activeKey !== key) {
      nodes.forEach((n) => {
        if (n.dataset.pillar === activeKey) n.classList.remove('active');
      });
      if (details[activeKey]) details[activeKey].classList.remove('open');
    }

    // Toggle current
    if (activeKey === key) {
      // Close
      nodes.forEach((n) => {
        if (n.dataset.pillar === key) n.classList.remove('active');
      });
      if (details[key]) details[key].classList.remove('open');
      activeKey = null;
    } else {
      // Open
      nodes.forEach((n) => {
        if (n.dataset.pillar === key) n.classList.add('active');
      });
      if (details[key]) {
        details[key].classList.add('open');
        // Scroll into view smoothly
        setTimeout(() => {
          details[key].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
      activeKey = key;
    }
  }

  nodes.forEach((node) => {
    const key = node.dataset.pillar;

    node.addEventListener('click', () => togglePillar(key));
    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        togglePillar(key);
      }
    });
  });

  /* === Also handle rede-card clicks for the institutional network === */
  const redeCards = document.querySelectorAll('.rede-card');
  const redeNodes = document.querySelectorAll('.rede-node');
  const redeLines = document.querySelectorAll('.rede-line');

  function activateInst(inst) {
    // Toggle cards
    redeCards.forEach((card) => {
      card.classList.toggle('active', card.dataset.inst === inst);
    });
    // Toggle SVG nodes
    redeNodes.forEach((node) => {
      node.classList.toggle(
        'active',
        node.dataset.inst === inst || node.dataset.inst === 'ifrn'
      );
    });
    // Toggle lines
    redeLines.forEach((line) => {
      line.classList.toggle('active', line.dataset.target === inst);
    });
  }

  redeCards.forEach((card) => {
    card.addEventListener('click', () => activateInst(card.dataset.inst));
  });
  redeNodes.forEach((node) => {
    if (node.dataset.inst === 'ifrn') return;
    node.addEventListener('click', () => activateInst(node.dataset.inst));
    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateInst(node.dataset.inst);
      }
    });
  });
})();
