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

/* ── Registration form validation ── */
function initRegistrationForm() {
  const form = document.getElementById('registrationForm');
  if (!form) return;

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  function setError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + '-error');
    if (field) field.classList.add('invalid');
    if (error) error.textContent = message;
  }

  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + '-error');
    if (field) field.classList.remove('invalid');
    if (error) error.textContent = '';
  }

  function validateField(fieldId) {
    const field = document.getElementById(fieldId);
    const value = field.value.trim();

    switch (fieldId) {
      case 'first':
      case 'last':
        if (!value) {
          setError(fieldId, 'This field is required.');
          return false;
        }
        break;

      case 'email':
        if (!value) {
          setError(fieldId, 'Email address is required.');
          return false;
        }
        if (!emailPattern.test(value)) {
          setError(fieldId, 'Enter a valid email, e.g. name@example.com');
          return false;
        }
        break;

      case 'phone':
        if (!value) {
          setError(fieldId, 'Phone number is required.');
          return false;
        }
        if (!/^[+]?[0-9\s().-]{7,20}$/.test(value)) {
          setError(fieldId, 'Enter a valid phone number.');
          return false;
        }
        break;

      case 'gender':
        if (!value) {
          setError(fieldId, 'Please select an option.');
          return false;
        }
        break;

      case 'level':
        if (!value) {
          setError(fieldId, 'Please select your level.');
          return false;
        }
        break;

      case 'interest':
        if (!value) {
          setError(fieldId, 'Please select a class.');
          return false;
        }
        break;
    }

    clearError(fieldId);
    return true;
  }

  const fieldIds = ['first', 'last', 'email', 'phone', 'gender', 'level', 'interest'];

  // Validate as the user leaves each field
  fieldIds.forEach(id => {
    const field = document.getElementById(id);
    if (field) {
      field.addEventListener('blur', () => validateField(id));
      field.addEventListener('input', () => {
        if (field.classList.contains('invalid')) validateField(id);
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let allValid = true;
    fieldIds.forEach(id => {
      if (!validateField(id)) allValid = false;
    });

    const submitBtn = form.querySelector('.btn-submit');

    if (!allValid) {
      submitBtn.textContent = '⚠ Please fix the errors above';
      submitBtn.style.background = '#e2785a';
      submitBtn.style.color = 'white';
      setTimeout(() => {
        submitBtn.textContent = 'Reserve My Spot →';
        submitBtn.style.background = '';
        submitBtn.style.color = '';
      }, 2500);
      return;
    }

    submitBtn.textContent = '✓ Spot Reserved! We will be in touch.';
    submitBtn.style.background = '#2a6644';
    submitBtn.style.color = 'white';
    submitBtn.disabled = true;
  });
}

/* ── Weekend Reminder Pop-up ── */
function initWeekendPopup() {
  const popup = document.getElementById('weekendPopup');
  if (!popup) return;

  const closeBtn    = document.getElementById('popupClose');
  const dismissBtn   = document.getElementById('popupDismiss');
  const bookBtn      = document.getElementById('popupBookBtn');
  const SHOW_DELAY_MS = 4000; // appears a few seconds after page load

  function openPopup() {
    popup.classList.add('show');
  }

  function closePopup() {
    popup.classList.remove('show');
  }

  setTimeout(openPopup, SHOW_DELAY_MS);

  closeBtn?.addEventListener('click', closePopup);
  dismissBtn?.addEventListener('click', closePopup);
  bookBtn?.addEventListener('click', closePopup);

  // Close when clicking outside the card
  popup.addEventListener('click', (e) => {
    if (e.target === popup) closePopup();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePopup();
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
  initWeekendPopup();
});
