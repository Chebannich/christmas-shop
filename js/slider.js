"use strict"

export function sliderScroll() {
  if (!document.querySelector('.slider')) return;

  // Find the slider elements in DOM
  const slider = document.querySelector('.slider');
  const sliderRow = document.querySelector('.slider__content');
  const sliderControls = document.querySelectorAll('.btn-slider');

  // Initialize the current position, number of clicks, and step width
  let sliderCurrentPosition = 0;
  let countOfClicks;
  let stepWidth;

  // Event listeners for slider setup
  // Trigger the update function on window load and resize
  window.addEventListener('load', updateSliderParameters);
  window.addEventListener('resize', updateSliderParameters);

  // Event listener for slider button clicks
  slider.addEventListener('click', handleButtonClick);

  // Function to update slider parameters based on window size
  // This function is triggered on load and resize
  function updateSliderParameters() {
    const sliderVisibleAreaWidth = sliderRow.clientWidth;
    const sliderFullWidth = sliderRow.scrollWidth;
    countOfClicks = window.innerWidth > 768 ? 3 : 6;
    stepWidth = (sliderFullWidth - sliderVisibleAreaWidth) / countOfClicks;

    // Reset slider to initial position on resize or page load
    sliderCurrentPosition = 0;
    sliderRow.style.transform = 'translateX(0px)';
    updateButtonState();
  }

  // Function to handle slider button actions (left or right scroll)
  function handleButtonClick(event) {
    const button = event.target.closest('.btn-slider');
    if (!button || button.classList.contains('inactive')) return;

    const direction = button.dataset.direction;
    let newPosition = sliderCurrentPosition;

    // Move slider depending on the direction
    if (direction === 'left') {
      newPosition--;
      if (newPosition < 0) return;
    } else if (direction === 'right') {
      newPosition++;
      if (newPosition > countOfClicks) return;
    }

    // Update slider position based on the new position
    sliderRow.style.transform = `translateX(${-stepWidth * newPosition}px)`;
    sliderCurrentPosition = newPosition;

    updateButtonState();
  }

  // Function to update inactive state of buttons (left or right)
  function updateButtonState() {
    sliderControls.forEach((element) => {
      const direction = element.dataset.direction;
      if (direction === 'left' && sliderCurrentPosition === 0) {
        // Disable the left button if at the first slide
        element.classList.add('inactive');
      } else if (direction === 'right' && sliderCurrentPosition === countOfClicks) {
        // Disable the right button if at the last slide
        element.classList.add('inactive');
      } else {
        // Enable the button if not at the edges
        element.classList.remove('inactive');
      }
    });
  }
}