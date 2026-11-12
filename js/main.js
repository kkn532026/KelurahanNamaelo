/**
 * KELURAHAN NAMAELO — main.js
 * Semua logika JS: dark mode, navbar, animasi, accordion, galeri, berita, dll.
 */

/* =============================================
   UTILS
   ============================================= */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function formatTanggal(dateStr) {
  const d = new Date(dateStr);
  const bulan = ['Januari','Februari','Maret','April','Mei','Juni',
                  'Juli','Agustus','September','Oktober','November','Desember'];
  return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
}

function createImgWithPlaceholder(src, alt, className, fallbackEmoji = '🏛️') {
  const img = document.createElement('img');
  img.alt = alt;
  if (className) img.className = className;
  img.loading = 'lazy';
  img.src = src;
  img.onerror = () => {
    const ph = document.createElement('div');
    ph.className = className + '-placeholder ' + (className || '');
    ph.innerHTML = `<span class="icon">${fallbackEmoji}</span><p>[ Foto menyusul ]</p>`;
    img.replaceWith(ph);
  };
  return img;
}

/* =============================================
   DARK MODE
   ============================================= */
function initDarkMode() {
  const btn = $('#btn-theme-toggle');
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);

  btn?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
  });
}

function updateThemeIcon(theme) {
  const btn = $('#btn-theme-toggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

/* =============================================
   NAVBAR
   ============================================= */
function initNavbar() {
  const navbar = $('#navbar');
  const hamburger = $('#btn-hamburger');
  const mobileNav = $('#mobile-nav');

  // Scrolled state
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 30);
    $('#back-to-top')?.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  // Hamburger
  hamburger?.addEventListener('click', () => {
    mobileNav?.classList.toggle('open');
    const isOpen = mobileNav?.classList.contains('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile nav on link click
  $$('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav?.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
    });
  });

  // Active nav on scroll
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link[data-section]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = navLinks.find(l => l.dataset.section === entry.target.id);
        active?.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* =============================================
   SCROLL ANIMATIONS
   ============================================= */
function initScrollAnimations() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  $$('.animate-on-scroll').forEach(el => obs.observe(el));
}

/* =============================================
   BACK TO TOP
   ============================================= */
function initBackToTop() {
  const btn = $('#back-to-top');
  btn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* =============================================
   COUNTER ANIMATION (hero stats)
   ============================================= */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString('id-ID') + (el.dataset.suffix || '');
  }, 16);
}

function initCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        $$('[data-target]', e.target).forEach(animateCounter);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  const statsSection = $('#hero-stats');
  if (statsSection) obs.observe(statsSection);
}

/* =============================================
   RENDER BERITA
   ============================================= */
async function loadBerita() {
  try {
    const res = await fetch('data/berita.json');
    const data = await res.json();
    const container = $('#berita-grid');
    if (!container) return;

    container.innerHTML = '';
    data.forEach((b, i) => {
      const card = document.createElement('article');
      card.className = 'berita-card animate-on-scroll delay-' + ((i % 3) + 1);
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', 'Baca berita: ' + b.judul);

      card.innerHTML = `
        <div class="berita-img-wrap">
          <img src="${b.foto}" alt="${b.judul}" class="berita-img" loading="lazy">
        </div>
        <div class="berita-body">
          <div class="berita-meta">
            <span class="berita-kategori">${b.kategori}</span>
            <span class="berita-tanggal">📅 ${formatTanggal(b.tanggal)}</span>
          </div>
          <h3 class="berita-judul">${b.judul}</h3>
          <p class="berita-ringkasan">${b.ringkasan}</p>
        </div>
      `;

      const openModal = () => openBeritaModal(b);
      card.addEventListener('click', openModal);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openModal(); });
      container.appendChild(card);
    });

    initScrollAnimations();
  } catch (err) {
    console.error('Gagal memuat berita:', err);
  }
}

function openBeritaModal(b) {
  const overlay = $('#modal-berita');
  if (!overlay) return;

  $('#modal-berita-img').src = b.foto;
  $('#modal-berita-img').alt = b.judul;
  $('#modal-berita-kategori').textContent = b.kategori;
  $('#modal-berita-tanggal').textContent = '📅 ' + formatTanggal(b.tanggal);
  $('#modal-berita-judul').textContent = b.judul;
  $('#modal-berita-teks').textContent = b.isi;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeBeritaModal();
  }, { once: true });
}

function closeBeritaModal() {
  $('#modal-berita')?.classList.remove('active');
  document.body.style.overflow = '';
}

/* =============================================
   RENDER LAYANAN (Accordion)
   ============================================= */
async function loadLayanan() {
  try {
    const res = await fetch('data/layanan.json');
    const data = await res.json();
    const container = $('#layanan-grid');
    if (!container) return;

    container.innerHTML = '';
    data.forEach((l, i) => {
      const item = document.createElement('div');
      item.className = 'accordion-item animate-on-scroll delay-' + ((i % 3) + 1);
      item.id = 'acc-' + l.id;

      const syaratHTML = l.syarat.map(s => `<li class="syarat-item">${s}</li>`).join('');
      const alurHTML = l.alur.map((a, idx) =>
        `<li class="alur-item"><span class="alur-num">${idx + 1}</span>${a}</li>`
      ).join('');

      item.innerHTML = `
        <button class="accordion-header" aria-expanded="false" aria-controls="body-${l.id}">
          <span class="accordion-icon">${l.ikon}</span>
          <div class="accordion-title-wrap">
            <span class="accordion-title">${l.nama}</span>
            <span class="accordion-meta">⏱ ${l.waktu} · ${l.biaya}</span>
          </div>
          <span class="accordion-chevron" aria-hidden="true">▼</span>
        </button>
        <div class="accordion-body" id="body-${l.id}" role="region">
          <div class="accordion-content">
            <p class="accordion-desc">${l.deskripsi}</p>
            <p class="accordion-section-title">📋 Persyaratan</p>
            <ul class="syarat-list">${syaratHTML}</ul>
            <p class="accordion-section-title">🔄 Alur Pengurusan</p>
            <ol class="alur-list">${alurHTML}</ol>
            <div class="accordion-footer">
              <span class="accordion-tag tag-time">⏱ ${l.waktu}</span>
              <span class="accordion-tag tag-free">✓ ${l.biaya}</span>
            </div>
          </div>
        </div>
      `;

      const btn = item.querySelector('.accordion-header');
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all
        $$('.accordion-item.open').forEach(a => {
          a.classList.remove('open');
          a.querySelector('.accordion-header')?.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });

      container.appendChild(item);
    });

    initScrollAnimations();
  } catch (err) {
    console.error('Gagal memuat layanan:', err);
  }
}

/* =============================================
   MODAL BERITA — close button
   ============================================= */
function initBeritaModal() {
  $('#btn-modal-close')?.addEventListener('click', closeBeritaModal);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeBeritaModal();
  });
}

/* =============================================
   INIT SEMUA
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initNavbar();
  initScrollAnimations();
  initBackToTop();
  initCounters();
  initBeritaModal();

  // Load data
  loadBerita();
  loadLayanan();
});
