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
      <li><a href="espanol.html" class="nav-esp ${activePage === 'espanol.html' ? 'active' : ''}">🇪🇸 En Español</a></li>
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
      <li><a href="espanol.html" class="${activePage === 'espanol.html' ? 'active' : ''}">🇪🇸 En Español</a></li>
      <li><a href="contact.html" class="mobile-cta">📞 Contact Us</a></li>
    </ul>
    <div class="mobile-menu-contact">
      <a href="tel:5713477360">(571) 347-7360</a>
      <span>Mon–Fri: 7:30AM–5PM</span>
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
            <li><a href="#">Mon–Fri: 7:30AM–5PM</a></li>
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

// =============================================
// SMOOTH SCROLL
// =============================================
document.querySelectorAll('a[href]').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// =============================================
// CONFETTI BURST ON PAGE LOAD
// =============================================
function launchConfetti() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const colors = ['#FF6B6B','#FFD166','#06D6A0','#118AB2','#FF9F1C','#A855F7','#F472B6','#34D399'];
  const shapes = ['circle', 'square', 'ribbon'];
  const total = 80;

  for (let i = 0; i < total; i++) {
    const el = document.createElement('div');
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 6 + Math.random() * 10;
    const startX = Math.random() * window.innerWidth;
    const delay = Math.random() * 800;
    const duration = 1500 + Math.random() * 1000;
    const drift = (Math.random() - 0.5) * 200;

    el.style.cssText = `
      position: fixed;
      top: -20px;
      left: ${startX}px;
      width: ${size}px;
      height: ${shape === 'ribbon' ? size * 3 : size}px;
      background: ${color};
      border-radius: ${shape === 'circle' ? '50%' : shape === 'ribbon' ? '2px' : '2px'};
      pointer-events: none;
      z-index: 99999;
      opacity: 1;
      transform: rotate(${Math.random() * 360}deg);
      animation: confettiFall ${duration}ms ${delay}ms ease-in forwards;
      --drift: ${drift}px;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), duration + delay + 100);
  }
}

// Inject confetti keyframes
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
  @keyframes confettiFall {
    0%   { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
    80%  { opacity: 1; }
    100% { transform: translateY(100vh) translateX(var(--drift)) rotate(720deg); opacity: 0; }
  }
`;
document.head.appendChild(confettiStyle);

// Fire confetti on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', launchConfetti);
} else {
  launchConfetti();
}

// =============================================
// WAVE DIVIDERS — inject into section breaks
// =============================================
function injectWaves() {
  const waveStyle = document.createElement('style');
  waveStyle.textContent = `
    .wave-divider {
      display: block;
      width: 100%;
      overflow: hidden;
      line-height: 0;
      margin: 0;
      padding: 0;
    }
    .wave-divider svg {
      display: block;
      width: 100%;
    }
    .wave-top    { margin-bottom: -2px; }
    .wave-bottom { margin-top: -2px; }
  `;
  document.head.appendChild(waveStyle);

  // Insert a wave before the footer
  const footer = document.querySelector('footer');
  if (footer) {
    const footerBg = getComputedStyle(footer).backgroundColor || '#1A1A2E';
    const waveBefore = document.createElement('div');
    waveBefore.className = 'wave-divider wave-top';
    waveBefore.innerHTML = `
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" fill="#1A1A2E"/>
      </svg>`;
    footer.parentNode.insertBefore(waveBefore, footer);
  }

  // Insert a wave after the stats strip
  const stats = document.querySelector('.stats-strip');
  if (stats) {
    const waveAfter = document.createElement('div');
    waveAfter.className = 'wave-divider wave-bottom';
    waveAfter.style.background = 'white';
    waveAfter.innerHTML = `
      <svg viewBox="0 0 1440 50" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,25 C360,50 720,0 1080,25 C1260,37 1380,20 1440,25 L1440,50 L0,50 Z" fill="white"/>
      </svg>`;
    stats.insertAdjacentElement('afterend', waveAfter);
  }

  // Insert wave before CTA banner
  const cta = document.querySelector('.cta-banner');
  if (cta) {
    const waveCta = document.createElement('div');
    waveCta.className = 'wave-divider wave-top';
    waveCta.innerHTML = `
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,30 C240,0 480,60 720,30 C960,0 1200,60 1440,30 L1440,60 L0,60 Z" fill="#FF6B6B"/>
      </svg>`;
    cta.parentNode.insertBefore(waveCta, cta);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectWaves);
} else {
  injectWaves();
}
