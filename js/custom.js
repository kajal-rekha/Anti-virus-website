"use strict";

/////////////////////////////////////////////////////////////
// Elements
/////////////////////////////////////////////////////////////

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnsOpenModal = document.querySelectorAll(".btn-show-modal");
const btnCloseModal = document.querySelector(".btn-close-modal");
const nav = document.querySelector(".nav");
const navLinks = document.querySelector(".nav-links");
const toggleBtn = document.querySelector(".nav-toggle");
const header = document.querySelector(".header");
const btnScrollTo = document.querySelector(".btn-scroll-to");
const allSections = document.querySelectorAll(".section");
const section1 = document.querySelector("#section-1");
const tabsContainer = document.querySelector(".operations-tab-container");
const tabs = document.querySelectorAll(".operations-tab");
const tabsContent = document.querySelectorAll(".operations-content");
const cookieBody = document.querySelector(".cookie");
const cookieCloseBtn = document.querySelector(".cookie-close");
const imgTargets = document.querySelectorAll("img[data-src]");
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider-btn-left");
const btnRight = document.querySelector(".slider-btn-right");
const dotContainer = document.querySelector(".dots");

//////////////////////////////////////////////////////////
// cookie
//////////////////////////////////////////////////////////////
cookieCloseBtn.addEventListener("click", function () {
  cookieBody.classList.add("hidden");
  cookieBody.style.bottom = "-12rem";
});

/////////////////////////////////////////////////////////////////////////
// Stick navbar
///////////////////////////////////////////////////////////////
const navHeight = nav.getBoundingClientRect().height;

function sticky(entries) {
  const entry = entries[0];

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
}

const headerObserver = new IntersectionObserver(sticky, {
  root: null, // viewport
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

/////////////////////////////////////////////////////////////
//  reveal section
/////////////////////////////////////////////////////////////

function revealSection(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
}

const sectionObs = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
  rootMargin: "200px",
});

allSections.forEach((section) => {
  sectionObs.observe(section);
  section.classList.add("section-hidden");
});

////////////////////////////////////////////////////////////////
// Modal show
////////////////////////////////////////////////////////////////
function openModal(e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

/////////////////////////////////////////////////////////////////////////
// Scroll behaviors
////////////////////////////////////////////////////////////////////////
navLinks.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav-link")) {
    const attr = e.target.getAttribute("href");
    document.querySelector(attr).scrollIntoView({ behavior: "smooth" });
  }
});

///////////////////////////////////////////////////////////
// Toggle navbar
////////////////////////////////////////////////////////////
toggleBtn.addEventListener("click", function () {
  if (navLinks.classList.contains("nav-open")) {
    navLinks.classList.remove("nav-open");
    document.querySelector("html").style.overflow = "visible";
  } else {
    navLinks.classList.add("nav-open");
    document.querySelector("html").style.overflow = "hidden";
  }
});

navLinks.addEventListener("click", function () {
  navLinks.classList.contains("nav-open") &&
    navLinks.classList.remove("nav-open");
  document.querySelector("html").style.overflow = "visible";
});

//////////////////////////////////////////////////////////////
//  Learn more scroll
////////////////////////////////////////////////////////
btnScrollTo.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

/////////////////////////////////////////////////////////
// Lazy  loading
///////////////////////////////////////////////////////
const loadImg = function (entries, observer) {
  const entry = entries[0];
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "250px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

/////////////////////////////////////////////////
// Slider
////////////////////////////////////////////////
let currentSlide = 0;
const maxSlide = slides.length - 1;

////////////////////////////////////////////
// Dots
////////////////////////////////////////////
function creatingDots() {
  slides.forEach((_, i) => {
    const dot = `<button class="dots-dot" data-slide="${i}"></button>`;
    dotContainer.insertAdjacentHTML("beforeend", dot);
  });
}
creatingDots();

//////////////////////////////////////
// Activate dots
/////////////////////////////////////

function activateDots(slide) {
  document
    .querySelectorAll(".dots-dot")
    .forEach((dot) => dot.classList.remove("dots-dot-active"));

  document
    .querySelector(`.dots-dot[data-slide="${slide}"]`)
    .classList.add("dots-dot-active");
}

activateDots(0);

function updateSlide(cs) {
  slides.forEach(
    (sl, i) => (sl.style.transform = `translateX(${100 * (i - cs)}%)`)
  );
}

updateSlide(0);

function updateSlide(cs) {
  slides.forEach(
    (sl, i) => (sl.style.transform = `translateX(${100 * (i - cs)}%)`)
  );
}

updateSlide(0);

function previousSlide() {
  if (currentSlide === 0) currentSlide = maxSlide;
  else currentSlide--;
  updateSlide(currentSlide);
  activateDots(currentSlide);
}

function nextSlide() {
  if (currentSlide === maxSlide) currentSlide = 0;
  else currentSlide++;
  updateSlide(currentSlide);
  activateDots(currentSlide);
}

/////////////////////////////////////////////
// dots handler
////////////////////////////////////////////
dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots-dot")) {
    activateDots(e.target.dataset.slide);
    updateSlide(e.target.dataset.slide);
  }
});

///////////////////////////////////////////
// button handles
///////////////////////////////////////////
btnLeft.addEventListener("click", previousSlide);
btnRight.addEventListener("click", nextSlide);

//////////////////////////////////////////
// keyboard
//////////////////////////////////////////

document.addEventListener("keydown", (e) => {
  e.key === "ArrowLeft" && previousSlide();
  e.key === "ArrowRight" && nextSlide();
});

/////////////////////////////////////////////////
// tabbed components
/////////////////////////////////////////////////
tabsContainer.addEventListener("click", function (e) {
  const btn = e.target.closest(".operations-tab");

  if (!btn) return;

  // Remove active classes

  tabs.forEach((tab) => tab.classList.remove("operations-tab-active"));
  tabsContent.forEach((content) =>
    content.classList.remove("operations-content-active")
  );

  // Activate tab

  btn.classList.add("operations-tab-active");
  document
    .querySelector(`.operations-content-${btn.dataset.tab}`)
    .classList.add("operations-content-active");
});
