/* ===== VISORA INTERACTION LOGIC ===== */

document.addEventListener('DOMContentLoaded', () => {
  // ===== NAVBAR SCROLL BEHAVIOR =====
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 24) {
      navbar.style.transform = 'translateY(-2px)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
  });

  // ===== 3D HEADSET CAROUSEL & COLOR SWATCHES =====
  const track = document.getElementById('carouselTrack');
  const slides = track ? track.querySelectorAll('.headset-slide') : [];
  const colorDots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let currentSlide = 0;

  function setSlide(index) {
    if (!track || slides.length === 0) return;
    currentSlide = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    colorDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => setSlide(currentSlide - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => setSlide(currentSlide + 1));
  }

  colorDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-slide'), 10);
      setSlide(idx);
    });
  });

  // ===== HERO COLOR SWITCHER =====
  const heroDots = document.querySelectorAll('.hero-color-switch .dot-color');
  const heroColorLabel = document.querySelector('.color-switch-label');
  const colorNames = ['Glacier Cyan', 'Gray Olive', 'Deep Forest'];

  heroDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      heroDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      if (heroColorLabel && colorNames[idx]) {
        heroColorLabel.textContent = colorNames[idx];
      }
    });
  });

  // ===== CINEMATIC THEATER PLAY BUTTON =====
  const playBtn = document.getElementById('playBtn');
  if (playBtn) {
    let isPlaying = false;
    playBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        playBtn.innerHTML = `
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16"/>
            <rect x="14" y="4" width="4" height="16"/>
          </svg>
        `;
        playBtn.style.background = 'rgba(255, 255, 255, 0.45)';
      } else {
        playBtn.innerHTML = `
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="6 4 20 12 6 20 6 4"/>
          </svg>
        `;
        playBtn.style.background = 'rgba(255, 255, 255, 0.18)';
      }
    });
  }

  // ===== FULLSCREEN SUPPORT FOR THEATER & VR MODE =====
  const theater = document.querySelector('.cinematic-theater');
  const expandBtn = document.querySelector('.theater-expand-btn');
  const enterVrBtn = document.getElementById('enterVrBtn');

  function toggleFullscreen(element) {
    if (!document.fullscreenElement) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  if (expandBtn && theater) {
    expandBtn.addEventListener('click', () => toggleFullscreen(theater));
  }

  if (enterVrBtn && theater) {
    enterVrBtn.addEventListener('click', () => {
      theater.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => toggleFullscreen(theater), 400);
    });
  }

  // ===== TESTIMONIALS SLIDER CONTROLS =====
  const testiArrows = document.querySelectorAll('.testi-arrow-btn');
  const testimonialDeck = document.querySelector('.testimonials-deck');
  if (testiArrows.length >= 2 && testimonialDeck) {
    testiArrows[0].addEventListener('click', () => {
      testimonialDeck.scrollBy({ left: -300, behavior: 'smooth' });
    });
    testiArrows[1].addEventListener('click', () => {
      testimonialDeck.scrollBy({ left: 300, behavior: 'smooth' });
    });
  }

  // ===== MENU BUTTON TOGGLE =====
  const menuBtn = document.getElementById('menuBtn');
  let menuOpen = false;
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      menuOpen = !menuOpen;
      const spans = menuBtn.querySelectorAll('.hamburger span');
      if (spans.length >= 2) {
        if (menuOpen) {
          spans[0].style.transform = 'rotate(45deg) translate(3px, 3px)';
          spans[1].style.transform = 'rotate(-45deg) translate(3px, -3px)';
        } else {
          spans[0].style.transform = 'none';
          spans[1].style.transform = 'none';
        }
      }
    });
  }

  // ===== SMOOTH ANCHOR LINK NAVIGATION =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
          document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
          if (this.classList.contains('nav-link')) {
            this.classList.add('active');
          }
        }
      }
    });
  });

  // ===== STATS COUNTER SUBTLE NUMBER TICK =====
  const statValues = document.querySelectorAll('.stat-val');
  let statsTriggered = false;

  function countUp(el, targetNum, suffix) {
    let start = 0;
    const duration = 1200;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = targetNum / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNum) {
        start = targetNum;
        clearInterval(timer);
      }
      el.innerHTML = `${Math.floor(start)}${suffix}<span class="stat-sup">+</span>`;
    }, stepTime);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsTriggered) {
        statsTriggered = true;
        statValues.forEach(val => {
          if (val.textContent.includes('20k')) {
            countUp(val, 20, 'k');
          } else if (val.textContent.includes('100k')) {
            countUp(val, 100, 'k');
          }
        });
      }
    });
  }, { threshold: 0.3 });

  const statsBox = document.querySelector('.hero-stats-box');
  if (statsBox) {
    observer.observe(statsBox);
  }
});
