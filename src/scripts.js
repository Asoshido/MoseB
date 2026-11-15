
/* =========================================================
   MOSEB — STAGE 2
   Progressive enhancement
   ========================================================= */

(function () {
  'use strict';

  /* -------------------------
     MOBILE NAVIGATION
     ------------------------- */

  function initialiseNavigation() {
    var toggle = document.getElementById('menu-toggle');
    var menu = document.getElementById('primary-menu');

    if (!toggle || !menu) {
      return;
    }

    var mobileQuery = window.matchMedia
      ? window.matchMedia('(max-width: 760px)')
      : null;

    function isMobile() {
      if (mobileQuery) {
        return mobileQuery.matches;
      }

      return window.innerWidth <= 760;
    }

    function closeMenu() {
      menu.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    }

    function openMenu() {
      menu.hidden = false;
      toggle.setAttribute('aria-expanded', 'true');
    }

    function syncNavigation() {
      if (isMobile()) {
        closeMenu();
      } else {
        menu.hidden = false;
        toggle.setAttribute('aria-expanded', 'false');
      }
    }

    toggle.addEventListener('click', function () {
      if (!isMobile()) {
        return;
      }

      var expanded =
        toggle.getAttribute('aria-expanded') === 'true';

      if (expanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (mobileQuery) {
      if (typeof mobileQuery.addEventListener === 'function') {
        mobileQuery.addEventListener('change', syncNavigation);
      } else if (typeof mobileQuery.addListener === 'function') {
        mobileQuery.addListener(syncNavigation);
      }
    } else {
      window.addEventListener('resize', syncNavigation);
    }

    syncNavigation();
  }

  /* -------------------------
     BACK TO TOP
     ------------------------- */

  function initialiseBackToTop() {
    var button = document.getElementById('back-to-top');

    if (!button) {
      return;
    }

    function updateVisibility() {
      button.hidden = window.scrollY < 320;
    }

    button.addEventListener('click', function () {
      if (typeof window.scrollTo === 'function') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });

    window.addEventListener('scroll', updateVisibility, {
      passive: true
    });

    updateVisibility();
  }

  /* -------------------------
     INITIALISE
     ------------------------- */

  function ready() {
    initialiseNavigation();
    initialiseBackToTop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready, {
      once: true
    });
  } else {
    ready();
  }

}());
