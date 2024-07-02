let isEnd = false;
let pos = 0;
let slideIndex = 0;
let startX = 0;
let endX = 0;
let btns;
let carousel;
let arrowBtns;
let arrowLeft;
let arrowRight;
let slider;
let sliderList;
let sliderTrack;
let slides;
let arrows;
let prev;
let next;
let slideWidth;
let customersContent;

function initCarousel() {
  btns = document.querySelectorAll(".customers__cards__button");
  carousel = document.querySelector(".customers__carousel");
  arrowBtns = document.querySelector(".first-arrows");
  arrowLeft = document.querySelector(".arrow__left");
  arrowRight = document.querySelector(".arrow__right");
  slider = document.querySelector(".slider");
  sliderList = slider.querySelector(".slider-list");
  sliderTrack = slider.querySelector(".slider-track");
  slides = slider.querySelectorAll(".slide");
  arrows = slider.querySelector(".customers__cards__dots");
  prev = arrows.children[0];
  next = arrows.children[1];
  slideWidth = slides[0].offsetWidth;
  customersContent = document.querySelector(".customers__content");

  sliderTrack.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });
  sliderTrack.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
  });
  sliderTrack.addEventListener('touchend', handleSwipe);
  sliderTrack.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    sliderTrack.addEventListener('mousemove', onMouseMove);
    sliderTrack.addEventListener('mouseup', onMouseUp);
  });

  arrows.addEventListener('click', (event) => {
    let target = event.target;
    let slidesToShow = Math.floor(customersContent.offsetWidth / cardWidth());

    if (target.classList.contains('next')) {
      slideIndex = Math.min(slideIndex + slidesToShow, slides.length);
      if (slideIndex >= (slides.length - 1)) {
        btns[0].classList.remove("active__card");
        btns[1].classList.add("active__card");
      }
    } else {
      slideIndex = Math.max(slideIndex - slidesToShow, 0);
      if (slideIndex <= 1) {
        btns[1].classList.remove("active__card");
        btns[0].classList.add("active__card");
      }
    }
    let randomSlides = new Set([]);
    while (randomSlides.size < slidesToShow) {
      randomSlides.add(getRandomInt(0, slides.length - 1));
    }
    Array.from(slides)
      .forEach((slide, index) => {
        if (randomSlides.has(index)) {
          slide.style.display = 'flex';
        } else {
          slide.style.display = 'none';
        }
      });
    sliderTrack.classList.toggle("slider-track-move");
    sliderTrack.classList.toggle("slider-track-move-back");
  });
  document.querySelector(".second-arrows").style.display = "flex";
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


function onMouseMove(e) {
  endX = e.clientX;
}

function onMouseUp() {
  sliderTrack.removeEventListener('mousemove', onMouseMove);
  sliderTrack.removeEventListener('mouseup', onMouseUp);
  handleSwipe();
}

function cardWidth() {
  return Array.from(document.querySelectorAll(".customer__rate__card"))
    .find(el => el.style.display !== 'none').offsetWidth;
}

function handleSwipe() {
  const diff = startX - endX;
  const width = cardWidth();
  const threshold = width / 2; 

  if (diff > threshold) {

    if (slideIndex < slides.length - 1) {
         slideIndex++;
         pos -= width;
     }
     if (pos < -(width * (slides.length - 1))) {
         pos = -(width * (slides.length - 1));
     }
  } else if (diff < -threshold) {

     if (slideIndex > 0) {
         slideIndex--;
         pos += width;
     }
     if (pos > 0) {
         pos = 0;
     }
  }
  sliderTrack.style.transform = `translateX(${pos}px)`;

  startX = 0;
  endX = 0;

  if (slideIndex === slides.length - 1 ) {
    btns[0].classList.remove("active__card");
    btns[1].classList.add("active__card");
  } else {
    btns[1].classList.remove("active__card");
    btns[0].classList.add("active__card");
  }
}