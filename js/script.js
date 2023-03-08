'use strict';

// MOBILE NAVIGATION - HAMBURGER MENU
const hamburger = document.querySelector('.btn--hamburger');
const mobileNav = document.querySelector('.header__nav');

hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('active');
  mobileNav.classList.toggle('active');
});
mobileNav.addEventListener('click', function () {
  hamburger.classList.remove('active');
  mobileNav.classList.remove('active');
});

// ACCOUNT MODAL ELEMENTS
const btnOpenAcc = document.querySelectorAll('.btn--open-account');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('.form--open-account');
const btnModalClose = document.querySelector('.overlay--close');

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

// SMOOTH SCROLLING FUNCTIONALITY
const scrollToSection = function (sectionName) {
  const sCoords = sectionName.getBoundingClientRect();
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

const navLinks = document.querySelectorAll('.navbar__link');
navLinks.forEach(link =>
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const linkText = e.target.textContent.toLowerCase();
    console.log(linkText);
    const section = document.querySelector(`#${linkText}`);

    scrollToSection(section);
  })
);

const btnLearnMore = document.querySelector('.btn__learn-more');
btnLearnMore.addEventListener('click', function (e) {
  e.preventDefault();
  const section = document.querySelector('#features');

  scrollToSection(section);
});
