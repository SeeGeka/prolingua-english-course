 // Countdown ke 30 Januari 2026, 23:59:59 (sesuaikan kalau tahunnya beda)
  const promoDeadline = new Date(2026, 0, 5, 23, 59, 59).getTime();

  function updatePromoTimer() {
    const now = new Date().getTime();
    const distance = promoDeadline - now;

    const daysEl  = document.getElementById("lo-days");
    const hoursEl = document.getElementById("lo-hours");
    const minsEl  = document.getElementById("lo-mins");
    const secsEl  = document.getElementById("lo-secs");
    const noteEl  = document.getElementById("lo-timer-note");

    if (!daysEl) return; // kalau section tidak ada di page ini

    if (distance <= 0) {
      daysEl.textContent  = "00";
      hoursEl.textContent = "00";
      minsEl.textContent  = "00";
      secsEl.textContent  = "00";
      noteEl.textContent  = "Promo berakhir. Harga akan kembali normal.";
      clearInterval(promoInterval);
      return;
    }

    const days  = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins  = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secs  = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent  = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minsEl.textContent  = String(mins).padStart(2, "0");
    secsEl.textContent  = String(secs).padStart(2, "0");
  }

  const promoInterval = setInterval(updatePromoTimer, 1000);
  updatePromoTimer(); // tampilkan langsung saat load

const navToggle = document.getElementById("navToggle");
const navMenu = document.querySelector(".nav-menu");  // Use querySelector to select by class

/* ==========================================================
   ProLingua — Unified Navbar Toggle
   - Toggle class .is-open pada .navbar
   - Update aria-expanded
   - Close ketika klik link, klik di luar, atau tekan Escape
   ========================================================== */

(function(){
  const nav = document.querySelector('.site-header .navbar');
  if(!nav) return;

  const btn = nav.querySelector('.navbar__toggle');
  const panel = nav.querySelector('.navbar__panel');

  if(!btn || !panel) return;

  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  // Toggle on click
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(!nav.classList.contains('is-open'));
  });

  // Close when clicking a link
  panel.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if(a) setOpen(false);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if(!nav.contains(e.target)) setOpen(false);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') setOpen(false);
  });
})();

// Script to handle mobile navbar toggle
  const toggleButton = document.querySelector('.navbar__toggle');
  const navbarPanel = document.querySelector('.navbar__panel');

  toggleButton.addEventListener('click', () => {
    navbarPanel.classList.toggle('is-open');
    toggleButton.setAttribute('aria-expanded', navbarPanel.classList.contains('is-open'));
  });