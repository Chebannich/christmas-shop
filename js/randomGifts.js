"use strict"

// Select the row where the gift cards will be displayed in the DOM
const giftsRow = document.querySelector('.best-gifts__row');
let gifts;

export async function randomGift() {
  if (!document.querySelector('.best-gifts')) return;

  try {
    if (!gifts) {
      const response = await fetch('./data/gifts.json');
      gifts = await response.json();
    }

    // Select all the card elements inside the row
    const cards = giftsRow.querySelectorAll('.card');
    let giftNumbers = [];

    // Select 4 unique random gifts
    do {
      let curentNum = getRandomInt(gifts.length);
      if (!giftNumbers.includes(curentNum)) {
        giftNumbers.push(curentNum);
      }
    } while (giftNumbers.length < 4)

    // Loop through each card element and populate it with gift data
    cards.forEach((element, index) => {
      // Get the gift object based on the random index
      const gift = gifts[giftNumbers[index]];
      const category = gift.category.split(' ')[1].toLowerCase();
      const description = element.querySelector('.card_discription');

      // Set the gift name and category in the card
      element.querySelector('[data-name]').innerHTML = gift.name;
      element.querySelector('[data-category]').innerHTML = gift.category;

      // Set the image source based on the category
      element.querySelector('img').src = `assets/img/gift-for-${category}.png`

      // Remove any previous category classes and add the new category class for styling
      description.classList.remove('health', 'work', 'harmony');
      description.classList.add(category);

      // Set a custom data attribute with the gift's name
      element.dataset.name = gift.name;
    })
  } catch (error) {
    console.log("Ошибка загрузки gifts.json:", error);
  }
}

// Helper function to generate a random integer between 0 and maxValue 
function getRandomInt(maxValue) {
  return Math.floor(Math.random() * maxValue);
}
