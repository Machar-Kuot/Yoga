/* ══════════════════════════════════════════════
   Praana Yoga Studio — JavaScript
   ══════════════════════════════════════════════ */

/* ── Media Section Tab Switcher ── */
function initMediaTabs() {
  const tabs = document.querySelectorAll('.media-tab');
  const panels = document.querySelectorAll('.media-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs and panels
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      // Activate the clicked tab and matching panel
      tab.classList.add('active');
      const target = tab.getAttribute('data-target');
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });
}

/* ── Registration form feedback ── */
function initRegistrationForm() {
  const btn = document.querySelector('.btn-submit');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const first    = document.getElementById('first')?.value.trim();
    const last     = document.getElementById('last')?.value.trim();
    const email    = document.getElementById('email')?.value.trim();
    const phone    = document.getElementById('phone')?.value.trim();
    const level    = document.getElementById('level')?.value;
    const interest = document.getElementById('interest')?.value;

    if (!first || !last || !email || !phone || !level || !interest) {
      btn.textContent = '⚠ Please fill in all fields';
      btn.style.background = '#c47b5a';
      btn.style.color = 'white';
      setTimeout(() => {
        btn.textContent = 'Reserve My Spot →';
        btn.style.background = '';
        btn.style.color = '';
      }, 2500);
      return;
    }

    btn.textContent = '✓ Spot Reserved! We'll be in touch.';
    btn.style.background = '#2a6644';
    btn.style.color = 'white';
    btn.disabled = true;
  });
}

/* ── Smooth active nav highlight on scroll ── */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], header');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.opacity = '0.7';
          link.style.color = '';
        });
        const id = entry.target.getAttribute('id');
        const active = document.querySelector(`nav a[href="#${id}"]`);
        if (active && !active.classList.contains('nav-cta')) {
          active.style.opacity = '1';
          active.style.color = 'var(--sage)';
        }
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

/* ── Init all on DOM ready ── */
document.addEventListener('DOMContentLoaded', () => {
  initMediaTabs();
  initRegistrationForm();
  initScrollSpy();
});
