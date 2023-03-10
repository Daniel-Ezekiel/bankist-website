'use strict';

// NAVIGATION ELEMENTS
const hamburger = document.querySelector('.btn--hamburger');
const mobileNav = document.querySelector('.header__nav');
const navbar = document.querySelector('.navbar');
// ACCOUNT MODAL ELEMENTS
const btnOpenAcc = document.querySelectorAll('.btn--open-account');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('.form--open-account');
const btnModalClose = document.querySelector('.overlay--close');
// LEARN MORE BUTTON
const btnLearnMore = document.querySelector('.btn__learn-more');
// TAB COMPONENT ELEMENTS
const operationControls = document.querySelector('.operations__controls');
const btnsOperation = operationControls.querySelectorAll('.btn__operation');
const operationsDetails = document.querySelectorAll('.operation__details');

// MOBILE NAVIGATION - HAMBURGER MENU
hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('active');
  mobileNav.classList.toggle('active');
});
mobileNav.addEventListener('click', function () {
  hamburger.classList.remove('active');
  mobileNav.classList.remove('active');
});

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
const scrollToSection = function (id) {
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
