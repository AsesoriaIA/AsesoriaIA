/* ═══════════════════════════════════════════════════════════
   AsesoríaIA — Sitio de sustentación · Interactividad
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Navbar: fondo al hacer scroll + barra de progreso ── */
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('progressBar');

  function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 40);
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    progressBar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Menú móvil ── */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );

  /* ── Animación reveal al entrar en viewport ── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── Contadores animados ── */
  function animarContador(el) {
    const objetivo = parseFloat(el.dataset.count);
    const dec = parseInt(el.dataset.dec || '0', 10);
    const sufijo = el.dataset.suffix || '';
    const dur = 1800;
    const t0 = performance.now();
    function paso(now) {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      const val = objetivo * eased;
      el.textContent = val.toFixed(dec) + sufijo;
      if (p < 1) requestAnimationFrame(paso);
      else el.textContent = objetivo.toFixed(dec) + sufijo;
    }
    requestAnimationFrame(paso);
  }
  const contadorObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animarContador(e.target);
        contadorObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => contadorObserver.observe(el));

  /* ── Toggle Antes / Después ── */
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.toggle-panel').forEach(p => p.classList.remove('active'));
      const panel = document.getElementById('panel-' + btn.dataset.tab);
      if (panel) panel.classList.add('active');
    });
  });
})();
