// shared.js — injects nav and footer into every page

function getNavHTML(activePage) {
  const pages = [
    { href: 'index.html',      label: 'Home' },
    { href: 'founders.html',   label: 'Meet the Founders' },
    { href: 'programs.html',   label: 'Programs' },
    { href: 'activities.html', label: 'Activities' },
    { href: 'gallery.html',    label: 'Gallery' },
  ];

  const links = pages.map(p => `
    <li><a href="${p.href}" class="${p.href === activePage ? 'active' : ''}">${p.label}</a></li>
  `).join('');

  return `
  <nav>
    <a href="index.html" class="nav-logo">GloryBer's <span>Spanish</span> <em>Academy</em></a>
    <ul class="nav-links" id="nav-links">
      ${links}
      <li><a href="contact.html" class="nav-cta ${activePage === 'contact.html' ? 'active' : ''}">Contact Us</a></li>
    </ul>
    <button class="hamburger" id="hamburger" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>
  </nav>

  <div class="mobile-menu" id="mobile-menu">
    <button class="mobile-menu-close" id="mobile-menu-close" aria-label="Close menu">✕</button>
    <div class="mobile-menu-logo">GloryBer's<br/><span>Spanish Academy</span></div>
    <ul class="mobile-nav-links">
      ${pages.map(p => `<li><a href="${p.href}" class="${p.href === activePage ? 'active' : ''}">${p.label}</a></li>`).join('')}
      <li><a href="contact.html" class="mobile-cta">📞 Contact Us</a></li>
    </ul>
    <div class="mobile-menu-contact">
      <a href="tel:5713477360">(571) 347-7360</a>
      <span>Mon–Fri: 7AM–5PM</span>
    </div>
  </div>
  <div class="mobile-overlay" id="mobile-overlay"></div>`;
}

function getFooterHTML() {
  return `
  <footer>
    <div class="footer-inner">
      <div class="footer-top">
        <div>
          <div class="footer-brand">GloryBer's <span>Spanish</span> Academy</div>
          <p class="footer-desc">A bilingual daycare in Alexandria, VA dedicated to nurturing the growth, development, and happiness of every child — in English and in Spanish.</p>
          <div style="font-size:1.8rem;letter-spacing:6px;">🇺🇸 🌟 🇪🇸</div>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="founders.html">Meet the Founders</a></li>
            <li><a href="programs.html">Programs</a></li>
            <li><a href="activities.html">Activities</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact Us</h4>
          <ul>
            <li><a href="tel:5713477360">(571) 347-7360</a></li>
            <li><a href="mailto:info@gloryberacademy.com">info@gloryberacademy.com</a></li>
            <li><a href="contact.html">Alexandria, VA</a></li>
            <li><a href="#">Mon–Fri: 7AM–5PM</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        © 2025 GloryBer's Spanish Academy · Made with <span>❤️</span> in Alexandria, VA
      </div>
    </div>
  </footer>`;
}

function initShared(activePage) {
  document.body.insertAdjacentHTML('afterbegin', getNavHTML(activePage));
  document.body.insertAdjacentHTML('beforeend', getFooterHTML());

  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const closeBtn = document.getElementById('mobile-menu-close');

  function openMenu() {
    mobileMenu.classList.add('open');
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.classList.add('open');
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.classList.remove('open');
  }

  hamburger.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  mobileOverlay.addEventListener('click', closeMenu);
  document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));
}

// =============================================
// CUSTOM PAINTBRUSH CURSOR
// =============================================
function initCursor() {
  // Don't run on touch devices
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  cursor.textContent = '🎨';
  document.body.appendChild(cursor);

  let mouseX = -100, mouseY = -100;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Tilt & scale on click, spawn paint splats
  const splats = ['🔴','🟡','🟢','🔵','🟠','🟣','⭐','✨'];

  document.addEventListener('mousedown', () => {
    cursor.classList.add('clicking');

    // Spawn 4–6 random splat particles
    const count = 4 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      const splat = document.createElement('div');
      splat.classList.add('paint-splat');
      splat.textContent = splats[Math.floor(Math.random() * splats.length)];
      splat.style.left = mouseX + 'px';
      splat.style.top  = mouseY + 'px';

      const angle = (Math.random() * 360) * (Math.PI / 180);
      const dist  = 30 + Math.random() * 50;
      splat.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
      splat.style.setProperty('--dy', Math.sin(angle) * dist + 'px');

      document.body.appendChild(splat);
      setTimeout(() => splat.remove(), 650);
    }
  });

  document.addEventListener('mouseup', () => {
    cursor.classList.remove('clicking');
  });

  // Hide cursor when it leaves the window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });
}

// Run cursor after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCursor);
} else {
  initCursor();
}
