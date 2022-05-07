// javascript for faqs section
let questions = document.getElementsByClassName("question");

for (let i = 0; i < questions.length; i++) {
  questions[i].addEventListener("click", () => {
    let answers = document.getElementsByClassName("answer");
    let icons = document.querySelectorAll(".icon i");
    icons[i].classList.toggle("rotate-180");

    answers[i].classList.toggle("h-0");
    answers[i].classList.toggle("h-40");
    answers[i].classList.toggle("py-3");
  });
}

//javascript for carousel

const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__next-button");
const previousButton = document.querySelector(".carousel__previous-button");

const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};

slides.forEach(setSlidePosition);

// now by cliking on the next button next slide should be visible
// for that i will select the button from dom and add an event listner in that i will select the slide with active class and translate the track by its width and i eill shift that active class to next slide

const moveToSlide = (currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("active-slide");
  targetSlide.classList.add("active-slide");
  const targetIndex = slides.findIndex((slide) => slide === targetSlide);
  if (targetIndex === slides.length - 2) {
    nextButton.classList.toggle("hidden");
  } else if (targetIndex >= 1 && targetIndex <= slides.length - 2) {
    previousButton.classList.remove("hidden");
    nextButton.classList.remove("hidden");
  } else {
    previousButton.classList.add("hidden");
  }
};

nextButton.addEventListener("click", () => {
  const presentSlide = track.querySelector(".active-slide");
  const nextSlide = presentSlide.nextElementSibling;
  moveToSlide(presentSlide, nextSlide);
});

previousButton.addEventListener("click", () => {
  const presentSlide = track.querySelector(".active-slide");
  const previousSlide = presentSlide.previousElementSibling;
  moveToSlide(presentSlide, previousSlide);
});

// javascript for mobile navbar(sidebar)

const hamburger = document.querySelector(".hamburger");
const closeNav = document.querySelector(".close");
const mobileNavbar = document.querySelector(".navbar-mobile");
const navLinks = document.querySelectorAll(".navbar-mobile li");
const toggleNav = () => {
  mobileNavbar.classList.toggle("translate-x-[0px]");
};
hamburger.addEventListener("click", toggleNav);
closeNav.addEventListener("click", toggleNav);
navLinks.forEach((link) => {
  link.addEventListener("click", toggleNav);
});

const changeNavbar = () => {
  const navbars = document.querySelectorAll(".navbar");
  if (window.scrollY >= window.innerHeight / 2) {
    navArray = Array.from(navbars);
    navArray.forEach((navbar) => {
      navbar.classList.add("bg-white");
      navbar.classList.add("border-b-2");
      navbar.classList.remove("text-white");
    });
  } else {
    navArray = Array.from(navbars);
    navArray.forEach((navbar) => {
      navbar.classList.remove("bg-white");
      navbar.classList.remove("border-b-2");
      navbar.classList.add("text-white");
    });
  }
};

window.addEventListener("scroll", changeNavbar);

// animations to slide items from left to right on scroll

const toRightItems = document.querySelectorAll(".left-to-right");
const toLeftItems = document.querySelectorAll(".right-to-left");

const animateToLeft = () => {
  toRightItems.forEach((item) => {
    const height = item.getBoundingClientRect().height;
    const isHalfVisible =
      window.scrollY + window.innerHeight - height / 2 >= item.offsetTop;
    if (isHalfVisible) {
      item.classList.remove("translate-x-[-120%]");
      item.classList.add("translate-x-[0%]");
    }
  });
};

const animateToRight = () => {
  toLeftItems.forEach((item) => {
    const height = item.getBoundingClientRect().height;
    const isHalfVisible =
      window.scrollY + window.innerHeight - height / 2 >= item.offsetTop;
    if (isHalfVisible) {
      item.classList.remove("translate-x-[120%]");
      item.classList.add("translate-x-[0%]");
    }
  });
};
window.addEventListener("scroll", animateToLeft);
window.addEventListener("scroll", animateToRight);

// animations to increase numbers count

const countContainer = document.querySelector(".count-container");
const countContainerHeight = countContainer.getBoundingClientRect().height;

const updateCount = () => {
  if (
    window.scrollY + window.innerHeight - countContainerHeight >=
    countContainer.offsetTop
  ) {
    const counters = document.querySelectorAll(".counter");

    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-count");
      const count = +counter.innerText;

      // Lower inc to slow and higher to slow
      const inc = 50;

      // console.log(inc);
      // console.log(count);

      // Check if target is reached
      if (count < target) {
        // Add inc to count and output in counter
        counter.innerText = count + inc;
        // Call function every ms
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
      }
    });
  }
};

window.addEventListener("scroll", updateCount);
