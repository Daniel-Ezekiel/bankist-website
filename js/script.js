'use strict';

const hamburger = document.querySelector('.btn--hamburger');
const mobileNav = document.querySelector('.header__nav');

hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('active');
  mobileNav.classList.toggle('active');
});
