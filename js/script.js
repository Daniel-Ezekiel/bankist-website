'use strict';

// MOBILE NAVIGATION - HAMBURGER MENU
const hamburger = document.querySelector('.btn--hamburger');
const mobileNav = document.querySelector('.header__nav');

hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('active');
  mobileNav.classList.toggle('active');
});

// ACCOUNT MODAL POPUP
const btnOpenAcc = document.querySelectorAll('.btn--open-account');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('.form--open-account');
const btnModalClose = document.querySelector('.overlay--close');

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
