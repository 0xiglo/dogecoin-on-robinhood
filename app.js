(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile sidebar
  var sidebar = document.getElementById('sidebar');
  var backdrop = document.getElementById('sidebarBackdrop');
  var toggle = document.getElementById('menuToggle');
  function closeMenu() {
    if (sidebar) sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
  }
  function openMenu() {
    if (sidebar) sidebar.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
  }
  if (toggle) toggle.addEventListener('click', function () {
    if (sidebar && sidebar.classList.contains('open')) closeMenu(); else openMenu();
  });
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  // Sync bar (overview)
  var fill = document.getElementById('syncFill');
  var status = document.getElementById('syncStatus');
  if (fill && status) {
    if (reduceMotion) {
      fill.style.width = '100%';
      status.textContent = 'SYNCED ✓ (eth_syncing → false)';
      status.classList.add('synced');
    } else {
      var p = 0;
      var timer = setInterval(function () {
        p += 1.2;
        if (p >= 100) {
          p = 100;
          clearInterval(timer);
          status.textContent = 'SYNCED ✓ (eth_syncing → false)';
          status.classList.add('synced');
        } else {
          status.textContent = 'syncing… ' + Math.floor(p) + '%';
        }
        fill.style.width = p + '%';
      }, 40);
    }
  }

  // Animated stats (fees)
  var tpsEl = document.getElementById('tps');
  var feeEl = document.getElementById('fee');
  var blockEl = document.getElementById('block');
  if (tpsEl && !reduceMotion) {
    var start = null;
    var target = 65000;
    function animateTps(ts) {
      if (!start) start = ts;
      var t = Math.min(1, (ts - start) / 8000);
      var eased = 1 - Math.pow(1 - t, 3);
      tpsEl.textContent = Math.floor(40 + (target - 40) * eased).toLocaleString();
      if (t < 1) requestAnimationFrame(animateTps);
    }
    requestAnimationFrame(animateTps);
    if (feeEl) {
      setInterval(function () {
        feeEl.textContent = (0.0028 + Math.random() * 0.0005).toFixed(4);
      }, 1200);
    }
    if (blockEl) blockEl.textContent = '10';
  } else if (tpsEl) {
    tpsEl.textContent = '65,000';
  }

  // Confetti + wallet
  function fireConfetti() {
    if (reduceMotion) return;
    var root = document.getElementById('confetti');
    if (!root) return;
    for (var i = 0; i < 36; i++) {
      var el = document.createElement('div');
      el.className = 'confetti-piece';
      el.textContent = 'Ð';
      el.style.left = Math.random() * 100 + 'vw';
      el.style.animationDelay = (Math.random() * 0.4) + 's';
      el.style.animationDuration = (1.2 + Math.random() * 0.8) + 's';
      root.appendChild(el);
      (function (node) { setTimeout(function () { node.remove(); }, 2200); })(el);
    }
  }
  var wallet = document.getElementById('addWallet');
  if (wallet) {
    wallet.addEventListener('click', function () {
      fireConfetti();
      var original = wallet.textContent;
      wallet.textContent = 'much added! wow';
      setTimeout(function () { wallet.textContent = original; }, 1800);
    });
  }
})();
