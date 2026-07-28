/* ==========================================================================
   Velto Artex Prime Supplies Limited - Interactive Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initRfqForm();
  initPortfolioFilters();
  initCounters();
  initMobileNav();
});

/**
 * Handle RFQ Form Submission & Reference Modal
 */
function initRfqForm() {
  const form = document.getElementById('rfqForm');
  const modal = document.getElementById('rfqSuccessModal');
  const modalClose = document.getElementById('closeModalBtn');
  const refDisplay = document.getElementById('rfqRefNumber');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Generate random realistic RFQ Reference Code
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const refCode = `RFQ-VA-2026-${randomNum}`;

    if (refDisplay) {
      refDisplay.textContent = refCode;
    }

    if (modal) {
      modal.classList.add('active');
    }

    form.reset();
  });

  if (modalClose && modal) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
}

/**
 * Portfolio Category Filter Logic
 */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/**
 * Animated Achievement Counters
 */
function initCounters() {
  const counters = document.querySelectorAll('.metric-number[data-target]');
  if (!counters.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const prefix = counter.getAttribute('data-prefix') || '';
          const suffix = counter.getAttribute('data-suffix') || '';
          let count = 0;
          const step = Math.max(1, Math.ceil(target / 45));

          const updateCounter = () => {
            count += step;
            if (count < target) {
              counter.innerHTML = `${prefix}${count}<span>${suffix}</span>`;
              requestAnimationFrame(updateCounter);
            } else {
              counter.innerHTML = `${prefix}${target}<span>${suffix}</span>`;
            }
          };
          updateCounter();
        });
      }
    });
  }, { threshold: 0.4 });

  const metricsSection = document.querySelector('.metrics-bar');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
}

/**
 * Mobile Navigation Bar Toggle
 */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      if (isVisible) {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '82px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = '#0F172A';
        navLinks.style.padding = '1.75rem';
        navLinks.style.boxShadow = '0 12px 24px rgba(0,0,0,0.3)';
        navLinks.querySelectorAll('a').forEach(a => a.style.color = '#FFFFFF');
      }
    });
  }
}
