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

function initCarousel() {
  btns = document.querySelectorAll(".customers__cards__button");
  carousel = document.querySelector(".customers__carousel");
  arrowBtns = document.querySelector(".first-arrows");
  arrowLeft = document.querySelector(".arrow__left");
  arrowRight = document.querySelector(".arrow__right");
  slider = document.querySelector('.slider');
  sliderList = slider.querySelector('.slider-list');
  sliderTrack = slider.querySelector('.slider-track');
  slides = slider.querySelectorAll('.slide');
  arrows = slider.querySelector('.customers__cards__dots');
  prev = arrows.children[0];
  next = arrows.children[1];
  slideWidth = slides[0].offsetWidth;

  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });
  slider.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
  });
  slider.addEventListener('touchend', handleSwipe);
  slider.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    slider.addEventListener('mousemove', onMouseMove);
    slider.addEventListener('mouseup', onMouseUp);
  });

  arrows.addEventListener('click', () => {
    let target = event.target;

    if (target.classList.contains('next')) {
       slideIndex = slides.length - 1;
       btns[0].classList.remove("active__card")
       btns[1].classList.add("active__card")
       sliderTrack.style.transform = `translateX(-${cardWidth() * (slides.length)}px)`;
    }  else {
       slideIndex = 0;
       btns[1].classList.remove("active__card")
       btns[0].classList.add("active__card")
       sliderTrack.style.transform = `translateX(-${0}px)`;
    }
  });
  prev.addEventListener("click", ()=> {

  });

  next.addEventListener("click", ()=> {
    console.log(111)  
  });
  document.querySelector(".second-arrows").style.display = "flex";
}


function onMouseMove(e) {
  endX = e.clientX;
}

function onMouseUp() {
  slider.removeEventListener('mousemove', onMouseMove);
  slider.removeEventListener('mouseup', onMouseUp);
  handleSwipe();
}

function cardWidth() {
  return document.querySelector(".customer__rate__card").offsetWidth;
}

function handleSwipe() {
  const diff = startX - endX;
  const width = cardWidth();
  const threshold = width / 2; 

  if (diff > threshold) {

    if (slideIndex < slides.length-1 ) {
         slideIndex++;
         pos -= width;
     }
     if (pos < -(width * (slides.length -1))) {
         pos = -(width * (slides.length -1));
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