"use strict"

// Select elements for burger button, navigation list, and body
const burgerBtn = document.querySelector('.nav-burger');
const navList = document.querySelector('.nav-list-768px');
const body = document.querySelector('body');

export function setupBurgerMenu() {
  // Add event listener to burger button to toggle the menu when clicked
  burgerBtn.addEventListener('click', toggleMenu);

  // Add event listener to navigation list to toggle the menu when clicked (optional for closing menu)
  navList.addEventListener('click', toggleMenu);

  // Add event listener to handle window resizing and update menu visibility accordingly
  window.addEventListener('resize', handleResize);
};


// Function to toggle the open/close state of the burger menu
function toggleMenu() {
  burgerBtn.classList.toggle('open-burger-menu');
  navList.classList.toggle('open-burger-menu');
  body.classList.toggle('open-burger-menu');
};

// Function to handle window resizing and update menu visibility based on screen width
function handleResize() {
  if (window.innerWidth > 768) {
    navList.style.display = 'none';
  } else {
    navList.style.display = 'flex';
  }
}