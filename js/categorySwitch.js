"use strict"

// Select the tabs container and the gifts row wrapper from the DOM
const giftTabs = document.querySelector('.tabs');
const giftCardWrapper = document.querySelector('.gifts_row');

// Declare variables for active category and gifts data
let activeCategory;
let gifts;

export async function categorySwitch() {
  if (!giftTabs) return;

  try {
    if (!gifts) {
      const response = await fetch('./data/gifts.json');
      gifts = await response.json();
    }
  } catch (error) {
    console.log("Ошибка загрузки gifts.json:", error);
  }

  // Get all the category names from the cards
  const cardCategoryName = giftCardWrapper.querySelectorAll('.header-4');

  // If no cards are rendered, call renderCards to display them
  if (!giftCardWrapper.lastChild) renderCards();

  // Display cards that match the active category
  cardCategoryName.forEach((element) => {
    const card = element.closest('.card');
    // If the active category is 'All' or matches the category name, show the card
    if (activeCategory === 'All' || activeCategory === element.textContent.trim()) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  })
}

if (giftTabs) {
  activeCategory = giftTabs.querySelector('.active').textContent.trim();

  // Add an event listener to handle tab switching
  giftTabs.addEventListener('click', function (event) {
    // If the clicked tab isn't already active, update the active tab
    if (!event.target.classList.contains('active')) {
      // Remove 'active' class from all tabs
      giftTabs.querySelectorAll('div').forEach((element) => {
        element.classList.remove('active');
      });
      // Add 'active' class to the clicked tab
      event.target.classList.add('active');
      // Update the active category based on the clicked tab
      activeCategory = event.target.innerHTML.trim();
      // Switch categories and display relevant cards
      categorySwitch();
    }
  });
}

function renderCards() {
  const fragment = document.createDocumentFragment();

  // Loop through the gifts data and create a card for each gift
  gifts.forEach((element) => {
    // Create the gift the card
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = element.name;

    // Create and append image to the card
    const img = document.createElement('img');
    img.src = `assets/img/gift-for-${element.category.split(' ')[1].toLowerCase()}.png`;
    img.alt = 'gift';
    card.appendChild(img);

    // Create and append description to the card
    const cardDescription = document.createElement('div');
    cardDescription.classList.add('card_discription', element.category.split(' ')[1].toLowerCase());

    const h4 = document.createElement('h4');
    h4.classList.add('header-4');
    h4.textContent = element.category;
    cardDescription.appendChild(h4);

    const h3 = document.createElement('h3');
    h3.classList.add('header-3');
    h3.textContent = element.name;
    cardDescription.appendChild(h3);

    // Append  description to the card and the card to the fragment
    card.appendChild(cardDescription);
    fragment.appendChild(card);
  });

  giftCardWrapper.appendChild(fragment);
}