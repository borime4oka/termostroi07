const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    });
  });
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 760 && nav) {
    nav.classList.remove('open');
    if (menuButton) {
      menuButton.setAttribute('aria-expanded', 'false');
    }
  }
});

document.querySelectorAll('.auto-project-link').forEach((link) => {
  const target = link.getAttribute('data-target');
  const projectPage = document.body.getAttribute('data-project-page') || 'projects.html';
  if (target) {
    link.setAttribute('href', `${projectPage}#${target}`);
  }
});

const currentHash = window.location.hash;
if (currentHash) {
  const projectCard = document.querySelector(currentHash);
  if (projectCard && projectCard.classList.contains('project-card')) {
    projectCard.classList.add('is-focused');
    setTimeout(() => {
      projectCard.classList.remove('is-focused');
    }, 2200);
  }
}

document.querySelectorAll('[data-slideshow]').forEach((slideshow) => {
  const slides = slideshow.querySelectorAll('.slide');
  if (!slides.length) {
    return;
  }

  let current = 0;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index);
    });
  };

  const nextSlide = () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  };

  const prevButton = slideshow.querySelector('[data-slide="prev"]');
  const nextButton = slideshow.querySelector('[data-slide="next"]');

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      current = (current - 1 + slides.length) % slides.length;
      showSlide(current);
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', nextSlide);
  }

  showSlide(current);
  setInterval(nextSlide, 3800);
});

const galleryModal = document.querySelector('.gallery-modal');
if (galleryModal) {
  const modalDialog = galleryModal.querySelector('.gallery-modal__dialog');
  const modalTitle = galleryModal.querySelector('#gallery-title');
  const modalMainImage = galleryModal.querySelector('.gallery-modal__main');
  const thumbContainer = galleryModal.querySelector('.gallery-modal__thumbs');
  const prevButton = galleryModal.querySelector('[data-gallery-prev]');
  const nextButton = galleryModal.querySelector('[data-gallery-next]');
  const closeButtons = galleryModal.querySelectorAll('[data-gallery-close]');
  const projectCards = document.querySelectorAll('.project-card');
  let currentImages = [];
  let currentIndex = 0;

  const updateMainImage = (index) => {
    if (!currentImages.length) {
      return;
    }

    currentIndex = (index + currentImages.length) % currentImages.length;
    const image = currentImages[currentIndex];
    modalMainImage.src = image.src;
    modalMainImage.alt = image.alt || '';

    thumbContainer.querySelectorAll('button').forEach((button, thumbIndex) => {
      button.classList.toggle('is-active', thumbIndex === currentIndex);
      button.setAttribute('aria-current', thumbIndex === currentIndex ? 'true' : 'false');
    });
  };

  const openModal = (card) => {
    const title = card.getAttribute('data-gallery-title') || card.querySelector('h2')?.textContent || 'Gallery';
    const galleryImages = card.querySelectorAll('.project-gallery img');
    currentImages = Array.from(galleryImages).map((image) => ({ src: image.getAttribute('src') || '', alt: image.getAttribute('alt') || '' }));

    if (!currentImages.length) {
      return;
    }

    modalTitle.textContent = title;
    thumbContainer.innerHTML = currentImages
      .map((image, index) => `
        <button type="button" data-thumb-index="${index}" aria-label="Show image ${index + 1}">
          <img src="${image.src}" alt="${image.alt}" />
        </button>
      `)
      .join('');

    updateMainImage(0);
    galleryModal.hidden = false;
    galleryModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalDialog.focus?.();
  };

  const closeModal = () => {
    galleryModal.hidden = true;
    galleryModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  projectCards.forEach((card) => {
    const trigger = card.querySelector('.project-gallery-trigger');
    const openHandler = () => openModal(card);

    if (trigger) {
      trigger.addEventListener('click', (event) => {
        event.stopPropagation();
        openHandler();
      });
    }

    card.addEventListener('click', (event) => {
      if (event.target.closest('a, button')) {
        return;
      }
      openHandler();
    });

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openHandler();
      }
    });
  });

  thumbContainer.addEventListener('click', (event) => {
    const thumbButton = event.target.closest('button[data-thumb-index]');
    if (!thumbButton) {
      return;
    }

    updateMainImage(Number(thumbButton.getAttribute('data-thumb-index')));
  });

  prevButton?.addEventListener('click', () => updateMainImage(currentIndex - 1));
  nextButton?.addEventListener('click', () => updateMainImage(currentIndex + 1));

  closeButtons.forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (event) => {
    if (galleryModal.hidden) {
      return;
    }

    if (event.key === 'Escape') {
      closeModal();
    }

    if (event.key === 'ArrowRight') {
      updateMainImage(currentIndex + 1);
    }

    if (event.key === 'ArrowLeft') {
      updateMainImage(currentIndex - 1);
    }
  });
}
