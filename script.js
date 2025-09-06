// === SCOPED UI INTERACTIONS ===
(() => {
  // === Menu Toggle ===
  const menuToggle = document.getElementById('menu-toggle');
  const navList = document.getElementById('main-nav');
  menuToggle && menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // === Scroll Progress Bar ===
  const progressBar = document.getElementById('progress');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrollTop = h.scrollTop || document.body.scrollTop;
    const scrollHeight = h.scrollHeight - h.clientHeight;
    const percent = (scrollTop / scrollHeight) * 100;
    progressBar && (progressBar.style.width = `${percent}%`);
  });

  // === Reveal on Scroll ===
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('in-view');
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // === Tilt Effect ===
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rotY = (px - 0.5) * 14;
      const rotX = (0.5 - py) * 10;
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // === Typewriter Animation ===
  const typeEl = document.getElementById('typewriter');
  if (typeEl) {
    const text = typeEl.textContent;
    typeEl.textContent = '';
    let i = 0;
    const animate = () => {
      if (i <= text.length) {
        typeEl.textContent = text.slice(0, i++);
        setTimeout(animate, 28 + Math.random() * 40);
      } else {
        setTimeout(() => { i = 0; typeEl.textContent = ''; animate(); }, 2500);
      }
    };
    animate();
  }

  // === Set Current Year ===
  const yearEl = document.getElementById('year');
  yearEl && (yearEl.textContent = new Date().getFullYear());

  // === Background Video Fallback ===
  const bgVideo = document.querySelector('.bg-video');
  if (bgVideo) {
    bgVideo.play().catch(() => {
      const overlay = document.querySelector('.bg-overlay');
      overlay && (overlay.style.opacity = '0.95');
    });
  }

  // === Request Form Submit Feedback ===
  const form = document.getElementById('request-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Sent ✓';
        btn.style.background = 'linear-gradient(90deg,#5ef4b6,#8ee3ff)';
        form.reset();
        setTimeout(() => {
          btn.textContent = orig;
          btn.disabled = false;
          btn.style.background = '';
        }, 1600);
      }, 900);
    });
  }

  // === Testimonials Slider ===
  (function initTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;

    const slidesWrap = slider.querySelector('.slides');
    const slides = Array.from(slidesWrap.children);
    const prevBtn = slider.querySelector('.slider-btn.prev');
    const nextBtn = slider.querySelector('.slider-btn.next');
    const dotsWrap = slider.querySelector('.dots');

    slider.setAttribute('tabindex', '0');

    let index = 0;
    let autoplay = true;
    const interval = 3800;
    let timer = null;

    // Create dots
    slides.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.className = i === 0 ? 'active' : '';
      btn.setAttribute('aria-label', `Show testimonial ${i + 1}`);
      btn.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(btn);
    });
    const dots = Array.from(dotsWrap.children);

    function update() {
      slidesWrap.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      update();
      resetTimer();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    prevBtn && prevBtn.addEventListener('click', prev);
    nextBtn && nextBtn.addEventListener('click', next);

    function startTimer() {
      if (!autoplay) return;
      stopTimer();
      timer = setInterval(next, interval);
    }
    function stopTimer() {
      if (timer) clearInterval(timer);
      timer = null;
    }
    function resetTimer() {
      stopTimer();
      startTimer();
    }

    slider.addEventListener('mouseenter', () => { autoplay = false; stopTimer(); });
    slider.addEventListener('mouseleave', () => { autoplay = true; startTimer(); });

    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    });

    let startX = 0, deltaX = 0;
    slidesWrap.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      stopTimer();
    }, { passive: true });
    slidesWrap.addEventListener('touchmove', (e) => {
      deltaX = e.touches[0].clientX - startX;
    }, { passive: true });
    slidesWrap.addEventListener('touchend', () => {
      if (Math.abs(deltaX) > 50) {
        deltaX < 0 ? next() : prev();
      }
      deltaX = 0;
      resetTimer();
    });

    update();
    startTimer();
  })();

  // Logo Carousel Loop
  (function initLogoCarousel() {
    const track = document.querySelector('.logo-carousel .carousel-track');
    if (!track) return;
    const items = Array.from(track.children);
    const clonedItems = items.map(item => item.cloneNode(true));
    clonedItems.forEach(clone => track.appendChild(clone));
  })();
})();