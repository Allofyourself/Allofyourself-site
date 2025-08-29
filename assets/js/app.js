// =====================================================
// All of Yourself — app.js
// Organization Guide (no behavior changes):
// 1) Event Bindings (DOMContentLoaded)
// 2) Video Controls
// 3) Section Navigation
// 4) Herb Card Flip
// 5) Footer Visibility
// 6) Carousel
// =====================================================


// ========================
// 2) Video Controls
// ========================
function restartVideo() {
  const video = document.querySelector('.bg-video');
  video.currentTime = 0;
  video.play();
}


// ========================
// 3) Section Navigation
// ========================
function showSection(id) {
  document.querySelectorAll('.content-section, header').forEach(section => {
    section.style.display = 'none';
  });

  const newSection = document.getElementById(id);
  newSection.style.display = 'block';
  newSection.style.opacity = '0';
  setTimeout(() => {
    newSection.style.opacity = '1';
  }, 10);

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Reset flipped cards when loading herbs section
  if (id === 'herbs') {
    
// ========================
// 4) Herb Card Flip
// ========================
document.querySelectorAll('.herb-card').forEach(card => {
      card.classList.remove('flipped');
    });
  }

  // Toggle body class for homepage scrolling
  document.body.classList.toggle('home', id === 'home');

  // Footer visibility
  const footer = document.querySelector('footer');
  if (id === 'herbs' || id === 'videos') {
    footer.style.display = 'none';
  } else {
    footer.style.display = 'block';
    if (id === 'home' || id === 'contact') {
      footer.classList.add('visible');
    } else {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop + windowHeight >= documentHeight - 10) {
        footer.classList.add('visible');
      } else {
        footer.classList.remove('visible');
      }
    }
  }
}

// Click-to-flip for herb cards
document.querySelectorAll('.herb-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});

// Footer visibility for scrollable pages on load and scroll

// ========================
// 5) Footer Visibility
// ========================
function updateFooterVisibility() {
  const footer = document.querySelector('footer');
  const currentSection = document.querySelector('.content-section:not([style*="display: none"]), header:not([style*="display: none"])');
  if (!currentSection || currentSection.id === 'herbs' || currentSection.id === 'videos') {
    footer.style.display = 'none';
    return;
  }
  footer.style.display = 'block';
  if (currentSection.id === 'home' || currentSection.id === 'contact') {
    footer.classList.add('visible');
  } else {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop + windowHeight >= documentHeight - 10) {
      footer.classList.add('visible');
    } else {
      footer.classList.remove('visible');
    }
  }
}
window.addEventListener('scroll', updateFooterVisibility);
window.addEventListener('load', updateFooterVisibility);

// Carousel functionality

// ========================
// 6) Carousel
// ========================
const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.video-card');
const prevButton = document.querySelector('.carousel-nav .prev');
const nextButton = document.querySelector('.carousel-nav .next');
let currentIndex = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;

if (track) {
  function updateCarousel() {
    track.style.transform = `translateX(${currentTranslate}px)`;
  }

  nextButton.addEventListener('click', () => {
    if (currentIndex < cards.length - 3) {
      currentIndex++;
      currentTranslate = -currentIndex * (cards[0].offsetWidth + 16);
      updateCarousel();
    }
  });

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      currentTranslate = -currentIndex * (cards[0].offsetWidth + 16);
      updateCarousel();
    }
  });

  track.addEventListener('mousedown', (e) => {
    isDragging = true;
    startPos = e.clientX - currentTranslate;
  });

  track.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const currentPosition = e.clientX;
      currentTranslate = currentPosition - startPos;
      updateCarousel();
    }
  });

  track.addEventListener('mouseup', () => {
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -100 && currentIndex < cards.length - 3) {
      currentIndex++;
    } else if (movedBy > 100 && currentIndex > 0) {
      currentIndex--;
    }
    currentTranslate = -currentIndex * (cards[0].offsetWidth + 16);
    prevTranslate = currentTranslate;
    updateCarousel();
  });

  track.addEventListener('mouseleave', () => {
    isDragging = false;
    currentTranslate = -currentIndex * (cards[0].offsetWidth + 16);
    prevTranslate = currentTranslate;
    updateCarousel();
  });
}
