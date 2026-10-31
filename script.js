/* Countdown — the only JavaScript on the page.
   Change the date/time via data-target on the .clock element in index.html. */
(function () {
  var clock = document.querySelector('.clock');
  if (!clock) return;

  var target = new Date(clock.getAttribute('data-target')).getTime();
  var done = document.querySelector('.clock__done');
  var els = {
    days: clock.querySelector('[data-unit="days"]'),
    hours: clock.querySelector('[data-unit="hours"]'),
    minutes: clock.querySelector('[data-unit="minutes"]'),
    seconds: clock.querySelector('[data-unit="seconds"]')
  };

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function tick() {
    var diff = target - Date.now();
    if (isNaN(diff) || diff <= 0) {
      clock.hidden = true;
      if (done) done.hidden = false;
      return false;
    }
    var s = Math.floor(diff / 1000);
    els.days.textContent = pad(Math.floor(s / 86400));
    els.hours.textContent = pad(Math.floor((s % 86400) / 3600));
    els.minutes.textContent = pad(Math.floor((s % 3600) / 60));
    els.seconds.textContent = pad(s % 60);
    return true;
  }

  if (tick()) {
    var timer = setInterval(function () { if (!tick()) clearInterval(timer); }, 1000);
  }
})();

/* Scroll reveals — time-based, play once. */
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;
  window.__reveal = true;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.reveal-group').forEach(function (g) { io.observe(g); });
})();
