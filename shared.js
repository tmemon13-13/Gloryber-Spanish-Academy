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
    <ul class="nav-links">
      ${links}
      <li><a href="contact.html" class="nav-cta ${activePage === 'contact.html' ? 'active' : ''}">Contact Us</a></li>
    </ul>
  </nav>`;
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

  // Scroll reveal
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
