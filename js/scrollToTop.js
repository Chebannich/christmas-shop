"use strict"

// Get "Scroll to Top" button from the DOM
const btnUp = document.querySelector('.btn-up');

export function scrollToTop() {
  if (!btnUp) return;

  // Add event listener for the scroll event
  window.addEventListener('scroll', toggleButtonVisibility)

  // Add event listener for the resize event
  window.addEventListener('resize', toggleButtonVisibility);

  // Add event listener for the click event on the button
  btnUp.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  function toggleButtonVisibility() {
    // If the page is scrolled more than 300 pixels and the window width is <= 768px
    if (window.scrollY > 300 && window.innerWidth <= 768) {
      btnUp.classList.add('active');
    } else {
      btnUp.classList.remove('active');
    }
  }
}