/**
 * Mohit Rajpurohit - Portfolio Interactions & Logic
 * High performance, accessible, zero-dependency vanilla JavaScript.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initActiveNavSpy();
  initProfilePhotoHandler();
  initClipboardActions();
  initContactForm();
  initBackToTop();
  updateCurrentYear();
});

/**
 * 1. Navbar Scroll Effect & Mobile Menu
 */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-link');

  // Sticky header background transition
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile drawer toggle
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('nav-open');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      
      const icon = toggleBtn.querySelector('svg');
      if (icon) {
        if (isOpen) {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>';
        } else {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
        }
      }
    });

    // Close mobile nav when clicking a link
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-open')) {
          navLinks.classList.remove('nav-open');
          toggleBtn.setAttribute('aria-expanded', 'false');
          const icon = toggleBtn.querySelector('svg');
          if (icon) {
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
          }
        }
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && navLinks.classList.contains('nav-open')) {
        navLinks.classList.remove('nav-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        const icon = toggleBtn.querySelector('svg');
        if (icon) {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
        }
      }
    });
  }
}

/**
 * 2. Active Section Spy for Navigation Links
 */
function initActiveNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/**
 * 3. Profile Photo Uploader & Local Storage Persistence
 * Lets Mohit choose any image from his device and persist it.
 */
function initProfilePhotoHandler() {
  const photoInput = document.getElementById('photo-input');
  const profileImg = document.getElementById('profile-img');
  const resetBtn = document.getElementById('reset-photo-btn');
  const defaultSrc = 'assets/avatar-placeholder.svg';
  const STORAGE_KEY = 'mohit_portfolio_avatar_data';

  if (!photoInput || !profileImg) return;

  // Check saved avatar in localStorage
  const savedAvatar = localStorage.getItem(STORAGE_KEY);
  if (savedAvatar) {
    profileImg.src = savedAvatar;
    if (resetBtn) resetBtn.style.display = 'inline-block';
  }

  // Handle new file selection
  photoInput.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, WebP).', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target.result;
      profileImg.src = base64Data;
      
      try {
        localStorage.setItem(STORAGE_KEY, base64Data);
        if (resetBtn) resetBtn.style.display = 'inline-block';
        showToast('Profile photo updated successfully!', 'success');
      } catch (err) {
        // In case image exceeds local storage quota
        showToast('Photo displayed for this session.', 'info');
      }
    };
    reader.readAsDataURL(file);
  });

  // Handle reset to default avatar
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      profileImg.src = defaultSrc;
      localStorage.removeItem(STORAGE_KEY);
      photoInput.value = '';
      resetBtn.style.display = 'none';
      showToast('Restored default avatar placeholder.', 'info');
    });
  }
}

/**
 * 4. Clipboard Copy Utilities (Email, Links)
 */
function initClipboardActions() {
  const copyButtons = document.querySelectorAll('[data-copy-text]');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy-text');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(`Copied to clipboard: ${textToCopy}`, 'success');
        
        // Brief visual button feedback
        const originalText = btn.innerHTML;
        btn.classList.add('copied');
        setTimeout(() => {
          btn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        // Fallback
        const tempInput = document.createElement('input');
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast(`Copied to clipboard: ${textToCopy}`, 'success');
      }
    });
  });
}

/**
 * 5. Functional Contact Form Submission
 * Uses formatted mailto with validation so it's fully functional without backend dependencies.
 */
function initContactForm() {
  const contactForm = document.getElementById('portfolio-contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name')?.value.trim();
    const email = document.getElementById('contact-email')?.value.trim();
    const subject = document.getElementById('contact-subject')?.value.trim();
    const message = document.getElementById('contact-message')?.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    // Construct mailto link
    const targetEmail = 'mohitrajpurohit460@gmail.com';
    const emailSubject = encodeURIComponent(subject || `Portfolio Inquiry from ${name}`);
    const emailBody = encodeURIComponent(
      `Hello Mohit,\n\n${message}\n\n---\nSender Name: ${name}\nSender Email: ${email}`
    );

    const mailtoUrl = `mailto:${targetEmail}?subject=${emailSubject}&body=${emailBody}`;

    // Trigger user mail client
    window.location.href = mailtoUrl;

    showToast('Opening your email client to send message...', 'success');
    contactForm.reset();
  });
}

/**
 * 6. Smooth Back to Top
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * 7. Dynamic Copyright Year
 */
function updateCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * 8. Custom Toast Notification System
 */
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';

  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `
      <svg class="toast-icon" width="20" height="20" fill="none" stroke="#10b981" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
      </svg>`;
  } else if (type === 'error') {
    iconSvg = `
      <svg class="toast-icon" width="20" height="20" fill="none" stroke="#ef4444" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>`;
  } else {
    iconSvg = `
      <svg class="toast-icon" width="20" height="20" fill="none" stroke="#38bdf8" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>`;
  }

  toast.innerHTML = `
    ${iconSvg}
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Remove after 3.5s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
