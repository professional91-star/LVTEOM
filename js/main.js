'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initBurger();
  initReveal();
  initCounters();
  initActiveNav();
  initProjectFilter();
  initForm();
  initMobileDropdown();
  initHeroSlideshow();
});

function initHeroSlideshow() {
  const root = document.getElementById('heroSlideshow');
  if (!root) return;

  const photos = [
    'image/1.png', 'image/2.png', 'image/3.jpg', 'image/4.jpg', 'image/5.png',
    'image/6.jpg', 'image/7.jpg', 'image/8.jpg', 'image/9.jpg',
    'image/11.jpg', 'image/12.jpg', 'image/13.jpg', 'image/14.jpg', 'image/15.jpg',
    'image/16.jpg', 'image/17.jpg', 'image/18.jpg',
    'image/a.jpg', 'image/b.jpg', 'image/c.jpg', 'image/d.jpg', 'image/e.jpg',
    'image/f.jpg', 'image/g.jpg', 'image/h.jpg', 'image/k.jpg', 'image/l.jpg'
  ];

  root.innerHTML = '';
  const slides = photos.map((src, i) => {
    const img = document.createElement('img');
    img.className = 'hero-slide' + (i === 0 ? ' is-active' : '');
    img.src = src;
    img.alt = '';
    img.decoding = 'async';
    root.appendChild(img);
    return img;
  });

  let index = 0;
  window.setInterval(() => {
    slides[index].classList.remove('is-active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('is-active');
  }, 3000);
}

function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initBurger() {
  const burger = document.getElementById('burger');
  const list = document.getElementById('navList');
  if (!burger || !list) return;
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    list.classList.toggle('open');
  });
  list.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        burger.classList.remove('open');
        list.classList.remove('open');
      }
    });
  });
}

function initMobileDropdown() {
  document.querySelectorAll('.nav-dropdown > .nav-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth > 900) return;
      const parent = link.closest('.nav-dropdown');
      if (!parent) return;
      if (!parent.classList.contains('open')) {
        e.preventDefault();
        parent.classList.add('open');
      }
    });
  });
}

function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  els.forEach((el) => io.observe(el));
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    if (Number.isNaN(target)) return;
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(target * eased);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((c) => io.observe(c));
}

function initActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const page = path.replace('.html', '') || 'index';
  document.querySelectorAll('.nav-link[data-page]').forEach((link) => {
    if (link.getAttribute('data-page') === page) {
      link.classList.add('active');
    }
  });
}

function initProjectFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.proj-card[data-cat]');
  if (!buttons.length || !cards.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      cards.forEach((card) => {
        const show = filter === 'all' || card.getAttribute('data-cat') === filter;
        card.classList.toggle('hidden', !show);
      });
    });
  });
}

function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const okMsg = document.getElementById('formMsg');
  const errMsg = document.getElementById('formMsgErr');
  const btn = document.getElementById('formSubmitBtn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (okMsg) okMsg.classList.remove('ok');
    if (errMsg) errMsg.classList.remove('ok');

    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Gönderiliyor...';
    }

    try {
      const data = new FormData(form);
      const res = await fetch('https://formsubmit.co/ajax/info@lvt-eom.com', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });

      if (!res.ok) throw new Error('send failed');

      if (okMsg) okMsg.classList.add('ok');
      form.reset();
    } catch (err) {
      if (errMsg) errMsg.classList.add('ok');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = 'Gönder <i class="fas fa-paper-plane"></i>';
      }
    }
  });
}
