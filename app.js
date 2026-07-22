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


  // Copy buttons
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var pre = btn.parentElement.querySelector('code');
      var text = pre ? pre.textContent : '';
      function done() {
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = 'Copy'; }, 1400);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () {
          var ta = document.createElement('textarea');
          ta.value = text; document.body.appendChild(ta); ta.select();
          try { document.execCommand('copy'); } catch (e) {}
          document.body.removeChild(ta); done();
        });
      }
    });
  });

  // Explorer page
  (function initExplorer() {
    var body = document.getElementById('txBody');
    if (!body) return;

    var netFee = document.getElementById('netFee');
    var userCost = document.getElementById('userCost');
    var rewardsPaid = document.getElementById('rewardsPaid');
    var txCount = document.getElementById('txCount');
    if (netFee) netFee.textContent = '0.00';
    if (userCost) userCost.textContent = '0';

    function randHex(n) {
      var s = '';
      for (var i = 0; i < n; i++) s += '0123456789abcdef'[Math.floor(Math.random() * 16)];
      return s;
    }
    function addr() { return '0x' + randHex(4) + '…' + randHex(4); }
    function hash() { return '0x' + randHex(6) + '…' + randHex(4); }

    var rows = [];
    var statuses = ['rewarded', 'rewarded', 'rewarded', 'confirmed', 'pending'];
    for (var i = 0; i < 18; i++) {
      var st = statuses[Math.floor(Math.random() * statuses.length)];
      var reward = st === 'pending' ? 0 : (12 + Math.floor(Math.random() * 240));
      rows.push({
        age: (i < 3 ? (i + 1) + 's' : (i * 7) + 's'),
        tx: hash(),
        from: addr(),
        fee: '$0.00',
        reward: reward,
        status: st
      });
    }

    var filterEl = document.getElementById('txFilter');
    var statusEl = document.getElementById('txStatusFilter');

    function render() {
      var q = (filterEl && filterEl.value || '').trim().toLowerCase();
      var sf = (statusEl && statusEl.value) || 'all';
      body.innerHTML = '';
      var shown = 0;
      var rewardSum = 0;
      rows.forEach(function (r) {
        if (sf !== 'all' && r.status !== sf) return;
        var blob = (r.tx + r.from + r.status).toLowerCase();
        if (q && blob.indexOf(q) === -1) return;
        shown++;
        rewardSum += r.reward;
        var tr = document.createElement('tr');
        tr.innerHTML =
          '<td>' + r.age + '</td>' +
          '<td class="mono">' + r.tx + '</td>' +
          '<td class="mono">' + r.from + '</td>' +
          '<td class="fee-zero">' + r.fee + '</td>' +
          '<td class="reward">' + (r.reward ? (r.reward + ' rhDOGE') : '—') + '</td>' +
          '<td><span class="badge ' + r.status + '">' + r.status + '</span></td>';
        body.appendChild(tr);
      });
      if (txCount) txCount.textContent = String(shown);
    }

    // Animate rewards from 0
    var targetRewards = rows.reduce(function (a, r) { return a + r.reward; }, 0);
    if (rewardsPaid) {
      if (reduceMotion) {
        rewardsPaid.textContent = String(targetRewards);
      } else {
        var cur = 0;
        var step = Math.max(1, Math.floor(targetRewards / 40));
        var t = setInterval(function () {
          cur += step;
          if (cur >= targetRewards) { cur = targetRewards; clearInterval(t); }
          rewardsPaid.textContent = String(cur);
        }, 40);
      }
    }

    render();
    if (filterEl) filterEl.addEventListener('input', render);
    if (statusEl) statusEl.addEventListener('change', render);

    // Periodically prepend a new fake tx
    if (!reduceMotion) {
      setInterval(function () {
        var st = Math.random() > 0.2 ? 'rewarded' : 'pending';
        var reward = st === 'pending' ? 0 : (20 + Math.floor(Math.random() * 180));
        rows.unshift({ age: '1s', tx: hash(), from: addr(), fee: '$0.00', reward: reward, status: st });
        if (rows.length > 40) rows.pop();
        rows.forEach(function (r, idx) {
          if (idx === 0) r.age = '1s';
          else if (idx < 5) r.age = (idx + 1) + 's';
        });
        if (rewardsPaid && st === 'rewarded') {
          var n = parseInt(rewardsPaid.textContent.replace(/,/g, ''), 10) || 0;
          rewardsPaid.textContent = String(n + reward);
        }
        render();
      }, 4500);
    }
  })();

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
