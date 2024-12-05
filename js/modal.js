"use strict"

const body = document.querySelector('body');
const modalWindow = document.querySelector('.modal');
let gifts;

fetch('./data/gifts.json')
  .then(response => response.json())
  .then(data => {
    gifts = data
  })
  .catch(error => {
    console.log("Ошибка загрузки gifts.json:", error);
  });

export function modal() {
  body.addEventListener('click', function (event) {
    const currentElement = event.target;

    // Check if the clicked element is a gift card
    if (isGiftsCard(currentElement)) {
      const currentCard = event.target.closest('.card');

      modalToggle(); // Toggle the modal open/close state
      modalRender(currentCard);  // Render the content inside the modal
    }
  })

  // Close the modal if clicked outside or on the close button
  modalWindow.addEventListener('click', function (event) {
    const currentElement = event.target;
    if (currentElement.classList.contains('modal-open')) {
      modalToggle();
    } else if (currentElement.closest('.close-btn')) {
      modalToggle();
    }
  })
}

// Function to check if the clicked element is a gift card
function isGiftsCard(element) {
  return element.closest('.card');
}

// Toggle the modal open/close state
function modalToggle() {
  modalWindow.classList.toggle('modal-open');
  body.classList.toggle('modal-open');
}

// Render the content inside the modal window
function modalRender(card) {
  const myGift = getGiftObjByName(card.dataset.name);

  let myCategory;

  // Determine the category of the gift
  if (myGift.category === 'For Work') {
    myCategory = 'work'
  } else if (myGift.category === 'For Health') {
    myCategory = 'health';
  } else {
    myCategory = 'harmony';
  }

  const categoryElement = modalWindow.querySelector('[data-modal="category"]');

  // Remove all previous categories and add the new one
  categoryElement.classList.remove('work', 'health', 'harmony');
  categoryElement.classList.add(myCategory)


  // Set the background image of the modal based on the category
  modalWindow.querySelector('.modal-top').style.background = `url(./assets/img/gift-for-${myGift.category.split(' ')[1].toLowerCase()}.png) 0 -33px / cover no-repeat`;

  // Fill in the modal content (name, description, category)
  modalWindow.querySelector('[data-modal="name"]').innerHTML = myGift.name;
  modalWindow.querySelector('[data-modal="description"]').innerHTML = myGift.description;
  categoryElement.innerHTML = myGift.category;

  // Loop through superpowers and set the values
  modalWindow.querySelectorAll('[data-modal="supperpowerValue"]').forEach((element, index) => {
    const keys = Object.keys(myGift.superpowers);
    if (index < keys.length) {
      element.textContent = myGift.superpowers[keys[index]];
    }
  });

  // Paint the snowflakes based on the superpowers
  paintSnowflakes(myGift)
}

// Function to get the gift object by its name
function getGiftObjByName(cardName) {
  return gifts.find((element) => element.name === cardName);
}

// Function to paint snowflakes based on superpowers
function paintSnowflakes(gift) {
  const rowsOfSnowflakes = modalWindow.querySelectorAll('.snowflakes');
  const snowflakes = modalWindow.querySelectorAll('.snowflakes path');

  // Set the opacity of all snowflakes to 0.1 (invisible)
  snowflakes.forEach((element) => {
    element.style.fillOpacity = '0.1';
  })

  let j = 0;
  for (let prop in gift.superpowers) {
    // Get the number of snowflakes to paint based on superpower value
    let countOfPaintedSnowflakes = gift.superpowers[prop].split('')[1];
    for (let i = 0; i < countOfPaintedSnowflakes; i++) {
      rowsOfSnowflakes[j].querySelectorAll('path')[i].style.fillOpacity = '1';  // Set opacity to 1
    }
    j++;
  }
}