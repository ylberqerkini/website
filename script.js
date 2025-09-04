// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}


<script>
// Get the video
var video = document.getElementById("myVideo");

// Get the button
var btn = document.getElementById("myBtn");

// Pause and play the video, and change the button text
function myFunction() {
  if (video.paused) {
    video.play();
    btn.innerHTML = "Pause";
  } else {
    video.pause();
    btn.innerHTML = "Play";
  }
}
</script>

// CLEANED & CONSOLIDATED SCRIPT

// Menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navList = document.getElementById('main-nav');
menuToggle && menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  navList.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// progress bar
const progress = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const percent = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  if (progress) progress.style.width = `${percent}%`;
});

// reveal on scroll
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('in-view');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// tilt effect (lightweight)
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

// typewriter simple animation
const typeEl = document.getElementById('typewriter');
if (typeEl) {
  const text = typeEl.textContent;
  typeEl.textContent = '';
  let i = 0;
  const t = () => {
    if (i <= text.length) {
      typeEl.textContent = text.slice(0, i++);
      setTimeout(t, 28 + Math.random() * 40);
    } else {
      setTimeout(() => { i = 0; typeEl.textContent = ''; t(); }, 2500);
    }
  };
  t();
}

// set year
document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());

// background video play fallback
const bgVideo = document.querySelector('.bg-video');
if (bgVideo) {
  bgVideo.play().catch(() => {
    const overlay = document.querySelector('.bg-overlay');
    if (overlay) overlay.style.opacity = '0.95';
  });
}

// request form submit (local feedback)
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
      setTimeout(() => { btn.textContent = orig; btn.disabled = false; btn.style.background = ''; }, 1600);
    }, 900);
  });
}

/* Testimonials slider (10 slides) */
(function initTestimonialsSlider(){
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

  // create dots
  slides.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = i === 0 ? 'active' : '';
    btn.setAttribute('aria-label', `Show testimonial ${i+1}`);
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

  // autoplay
  function startTimer() {
    if (!autoplay) return;
    stopTimer();
    timer = setInterval(next, interval);
  }
  function stopTimer() { if (timer) clearInterval(timer); timer = null; }
  function resetTimer() { stopTimer(); startTimer(); }

  slider.addEventListener('mouseenter', () => { autoplay = false; stopTimer(); });
  slider.addEventListener('mouseleave', () => { autoplay = true; startTimer(); });

  // keyboard
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  // touch support
  let startX = 0, deltaX = 0;
  slidesWrap.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; stopTimer(); }, { passive: true });
  slidesWrap.addEventListener('touchmove', (e) => { deltaX = e.touches[0].clientX - startX; }, { passive: true });
  slidesWrap.addEventListener('touchend', () => {
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) next(); else prev();
    }
    deltaX = 0;
    resetTimer();
  });

  // init
  update();
  startTimer();
})();