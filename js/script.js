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
