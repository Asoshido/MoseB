/* Small progressive-enhancement layer; safe when optional controls are absent. */
(function () {
  'use strict';

  function initialiseNavigation() {
    var toggle = document.getElementById('menu-toggle');
    var menu = document.getElementById('primary-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.hidden = expanded;
    });
  }

  function initialiseBackToTop() {
    var button = document.getElementById('back-to-top');
    if (!button) return;

    function updateVisibility() {
      button.hidden = window.scrollY < 320;
    }

    button.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', updateVisibility, { passive: true });
    updateVisibility();
  }

  function ready() {
    initialiseNavigation();
    initialiseBackToTop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready, { once: true });
  } else {
    ready();
  }
}());
