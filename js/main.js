"use strict"

import { setupBurgerMenu } from './burgerMenu.js';
import { sliderScroll } from './slider.js';
import { timer } from './timer.js';
import { randomGift } from './randomGifts.js';
import { categorySwitch } from './categorySwitch.js';
import { scrollToTop } from './scrollToTop.js';
import { modal } from './modal.js';

setupBurgerMenu();
sliderScroll();
setInterval(timer, 1000);
randomGift();
categorySwitch();
scrollToTop();
modal();

