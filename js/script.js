'use strict';

// NAVIGATION ELEMENTS
const header = document.querySelector('header');
const navbarContainer = document.querySelector('.navbar--container');
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.btn--hamburger');
const mobileNav = document.querySelector('.header__nav');
// ACCOUNT MODAL ELEMENTS
const btnOpenAcc = document.querySelectorAll('.btn--open-account');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('.form--open-account');
const btnModalClose = document.querySelector('.overlay--close');
// LEARN MORE BUTTON
const btnLearnMore = document.querySelector('.btn__learn-more');
// SECTION ELEMENTS
const mainSections = document.querySelectorAll('.section');
const section1 = document.querySelector('#features');
// TAB COMPONENT ELEMENTS
const operationControls = document.querySelector('.operations__controls');
const btnsOperation = operationControls.querySelectorAll('.btn__operation');
const operationsDetails = document.querySelectorAll('.operation__details');

/******************************************/
// MOBILE NAVIGATION - HAMBURGER MENU
hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('active');
  mobileNav.classList.toggle('active');
});
mobileNav.addEventListener('click', function () {
  hamburger.classList.remove('active');
  mobileNav.classList.remove('active');
});

/******************************************/
// ADDING SPECIAL HOVER EFFECT TO NAVBAR
const animateNavbarHover = function (e) {
  if (e.target.classList.contains('navbar__link')) {
    const link = e.target;
    const parent = link.closest('.navbar');
    const siblings = parent.querySelectorAll('.navbar__link');
    const logo = parent.querySelector('.header__logo');
    siblings.forEach(sibling => {
      if (sibling !== link) {
        sibling.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};
// NAVBAR HOVER ANIMATED EFFECT
navbar.addEventListener('mouseover', animateNavbarHover.bind(0.5));
navbar.addEventListener('mouseout', animateNavbarHover.bind(1));

/******************************************/
// SMOOTH SCROLLING FUNCTIONALITY
const scrollToSection = function (id) {
  if (id === '#') return;
  const section = document.querySelector(id);
  const sCoords = section.getBoundingClientRect();
  const pgXOffset = window.scrollX;
  const pgYOffset = window.scrollY;

  window.scrollTo({
    left: pgXOffset + sCoords.left,
    top: pgYOffset + sCoords.top,
    behavior: 'smooth',
  });
  // sectionName.scrollIntoView({ behavior: 'smooth' }); -- For modern browsers
  // console.log(window.pageXOffset, window.pageYOffset); -- pageXOffset, pageYOffset is deprecated
};

// USING EVENT DELEGATION TO ACHIEVE NAVIGATION SMOOTH SCROLL
mobileNav.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('navbar__link')) {
    const sectionID = e.target.getAttribute('href');
    scrollToSection(sectionID);
  }
});

btnLearnMore.addEventListener('click', function (e) {
  e.preventDefault();
  const sectionID = this.getAttribute('href');

  scrollToSection(sectionID);
});

// NO EVENT DELEGATION IN THIS CASE
// const navLinks = document.querySelectorAll('.navbar__link');
// navLinks.forEach(link =>
//   link.addEventListener('click', function (e) {
//     e.preventDefault();
//     const linkText = e.target.textContent.toLowerCase();
//     console.log(linkText);
//     const section = document.querySelector(`#${linkText}`);

//     scrollToSection(section);
// );
//   })

/*******************************************/
// STICKY ON SCROLL FEATURE
// window.addEventListener('scroll', function (e) {
//   const sec1Coords = section1.getBoundingClientRect();
//   const pgXOffset = this.scrollX;
//   const pgYOffset = this.scrollY;
//   if (pgXOffset === 0 && pgYOffset >= sec1Coords.top + pgYOffset) {
//     navbarContainer.classList.add('sticky');
//   } else {
//     navbarContainer.classList.remove('sticky');
//   }
// });

/************************************************/
// USING THE INTERSECTION OBSERVER API FOR STICKY ON SCROLL
const showStickyNav = function (entries) {
  const [entry] = entries;

  const targetElement = entry.isIntersecting;
  if (targetElement) navbarContainer.classList.remove('sticky');
  else navbarContainer.classList.add('sticky');
};

let headerObserver = new IntersectionObserver(showStickyNav, {
  root: null,
  threshold: 0,
  rootMargin: '-91px',
});
headerObserver.observe(header);

/*************************************************/
// FADE-IN EFFECT FOR ALL MAIN SECTIONS USING THE INTERSECTION OBSERVER API
const sectionFadein = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.add('fadein');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(sectionFadein, {
  root: null,
  threshold: 0.3,
});

mainSections.forEach(section => {
  section.classList.add('fadeout');
  sectionObserver.observe(section);
});

/*****************************************/
// LAZY LOADING IMAGES USING INTERSECTION API
const imgSelectn = document.querySelectorAll('img[data-src]');

const lazyLoadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener(
    'load',
    entry.target.classList.remove('lazy--load')
  );

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(lazyLoadImg, {
  root: null,
  threshold: 0,
  rootMargin: '220px',
});

imgSelectn.forEach(img => {
  img.src = img.dataset.lazy;
  img.classList.add('lazy--load');

  imgObserver.observe(img);
});

/***************************************/
// BUILDING A TABBED COMPONENT
operationControls.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.btn__operation');
  // console.log(clicked);
  btnsOperation.forEach(btn => btn.classList.remove('active'));
  clicked.classList.add('active');

  operationsDetails.forEach(detail => detail.classList.remove('active'));
  const currTabClassName = clicked.getAttribute('for');
  document.querySelector(currTabClassName).classList.add('active');
});

/***********************************************/
// TESTIMONIAL CAROUSEL
const carousel = function () {
  let slideOffset = 0;
  const carousel = document.querySelector('.carousel');
  const allSlides = document.querySelectorAll('.slide');
  const btnRight = document.querySelector('#btn__right');
  const btnLeft = document.querySelector('#btn__left');
  const btnPagination = document.querySelectorAll('.btn--pagination');

  const calcCurrentSlide = function (offset, slides, pagination) {
    slides.forEach(slide => {
      slide.style.transform = `translateX(-${offset * 100}%)`;
    });

    pagination.forEach((btn, i) => {
      btn.classList.remove('active');
      offset === i && btn.classList.add('active');
    });
  };

  function showNextSlide() {
    slideOffset < allSlides.length - 1 ? slideOffset++ : (slideOffset = 0);
    calcCurrentSlide(slideOffset, allSlides, btnPagination);
  }
  function showPrevSlide() {
    slideOffset <= 0 ? (slideOffset = allSlides.length - 1) : slideOffset--;
    calcCurrentSlide(slideOffset, allSlides, btnPagination);
  }

  btnRight.addEventListener('click', showNextSlide);
  btnLeft.addEventListener('click', showPrevSlide);

  //  CAROUSEL WORKING ON KEY PRESS
  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowRight' && showNextSlide();
  });
  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowLeft' && showPrevSlide();
  });

  // CAROUSEL WORKING FROM THE PAGINATION BUTTONS
  carousel.addEventListener('click', function (e) {
    const clicked = e.target.closest('.btn--pagination');

    if (!clicked) return;
    calcCurrentSlide(+clicked.dataset.no, allSlides, btnPagination);
  });
};
carousel();

/**************************************************/
// ACCOUNT MODAL POPUP
btnOpenAcc.forEach(btn =>
  btn.addEventListener('click', e => {
    e.preventDefault();
    overlay.classList.add('active');
    form.classList.add('active');
  })
);
btnModalClose.addEventListener('click', e => {
  e.preventDefault();
  overlay.classList.remove('active');
  form.classList.remove('active');
});
