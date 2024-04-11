
'use strict';

///////////////////////////////////////
// Modal window
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const s1coord = section1.getBoundingClientRect();
const header = document.querySelector('.header');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tab = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener
  ('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


// document.querySelectorAll('.nav__link').forEach(function(el) {
//   el.addEventListener('click', function(e) {
//     e.preventDefault();
//     const href = this.getAttribute('href');
//     document.querySelector(href).scrollIntoView({behavior: 'smooth'})
//   })
// })

//smooth scroll effect

document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const href = e.target.getAttribute('href');
    document.querySelector(href).scrollIntoView({behavior: 'smooth'})
  }
})


// tabbed components
tabContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  tab.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  
  
  clicked.classList.add('operations__tab--active');

  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active')
})

// Menu fade animation
nav.addEventListener('mouseover', function(e) {
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav')
    .querySelectorAll('.nav__link');

    const logo = link.closest('.nav')
    .querySelector('img');

    siblings.forEach(el => {
      if(el !== link) el.style.opacity = 0.5;
    })
    logo.style.opacity = 0.5;
  }
})

nav.addEventListener('mouseout', function(e) {
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav')
    .querySelectorAll('.nav__link');

    const logo = link.closest('.nav')
    .querySelector('img');

    siblings.forEach(el => {
      if(el !== link) el.style.opacity = 1;
    })
    logo.style.opacity = 1;
  }
})

// sticky navigation

const obsCallBack = function(entries, observer) {
  entries.forEach(entry => {
    console.log(entry)
  });
};

const obsOptions = {
  root: null,
  threshold: 0.1
};

const observer = new IntersectionObserver(obsCallBack, obsOptions);
observer.observe(section1);



