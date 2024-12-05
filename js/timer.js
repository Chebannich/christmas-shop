"use strict"

// Find the timer elements in DOM
const timerDays = document.querySelector('[data-time="days"]');
const timerHours = document.querySelector('[data-time="hours"]');
const timerMinutes = document.querySelector('[data-time="minutes"]');
const timerSeconds = document.querySelector('[data-time="seconds"]');

export function timer() {
  const cta = document.querySelector('.cta');

  if (!cta) return;

  // Get the current date and the target end date (January 1, 2025, 00:00:00 UTC)
  let currentDate = new Date();
  const endDate = new Date(Date.UTC(2025, 0, 1, 0, 0, 0));;

  // Calculate the difference in seconds between the target and current date
  let timeLeft = (endDate.getTime() - currentDate.getTime()) / 1000;

  // Calculate and display days, hours, minutes, and seconds
  // Subtract the calculated days from the remaining time
  const daysLeft = Math.floor(timeLeft / (24 * 60 * 60));
  timerDays.textContent = daysLeft;

  timeLeft -= daysLeft * 24 * 60 * 60;
  const hoursLeft = Math.floor(timeLeft / (60 * 60));
  timerHours.textContent = hoursLeft;

  timeLeft -= hoursLeft * 60 * 60;
  const minutesLeft = Math.floor(timeLeft / 60);
  timerMinutes.textContent = minutesLeft;

  timeLeft -= minutesLeft * 60;
  const secondsLeft = Math.floor(timeLeft);
  timerSeconds.textContent = secondsLeft;
}