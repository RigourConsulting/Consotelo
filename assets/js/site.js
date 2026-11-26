/* Minimal progressive enhancement for accessible Product Tour tabs and mobile menu Escape key. */
(function () {
  var mobileNav = document.querySelector('.mobile-nav-toggle');
  if (mobileNav) {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.hasAttribute('open')) {
        mobileNav.removeAttribute('open');
        var summary = mobileNav.querySelector('summary');
        if (summary) summary.focus();
      }
    });
  }

  var tablist = document.querySelector('[role="tablist"]');
  if (!tablist) return;
  var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
  var panels = tabs.map(function (t) {
    return document.getElementById(t.getAttribute('aria-controls'));
  });

  function activate(idx, moveFocus) {
    tabs.forEach(function (tab, i) {
      var selected = i === idx;
      tab.setAttribute('aria-selected', selected ? 'true' : 'false');
      tab.setAttribute('tabindex', selected ? '0' : '-1');
      if (panels[i]) {
        if (selected) panels[i].removeAttribute('hidden');
        else panels[i].setAttribute('hidden', '');
      }
    });
    if (moveFocus) tabs[idx].focus();
  }

  tabs.forEach(function (tab, idx) {
    tab.addEventListener('click', function () { activate(idx, false); });
    tab.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); activate((idx + 1) % tabs.length, true); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); activate((idx - 1 + tabs.length) % tabs.length, true); }
      else if (e.key === 'Home') { e.preventDefault(); activate(0, true); }
      else if (e.key === 'End') { e.preventDefault(); activate(tabs.length - 1, true); }
    });
  });

  activate(0, false);
})();
