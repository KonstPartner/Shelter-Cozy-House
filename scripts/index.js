import { setupResizeHandler, updateCards, updateVisibleCards } from "./modules/cards.js";
import { setupCloseCardModalHandler, updateCardModals } from "./modules/cardsModal.js"
import { getAllElementsByClass, getElement } from "./modules/elementCache.js";
import { setupMenuAndSidebarHandlers } from "./modules/menuAndSidebarHandlers.js";
import { petCards } from "./modules/petsInfo.js";

const leftArrowbtn = getElement("arrow-left");
const rightArrowbtn = getElement("arrow-right");
const sliderCards = getElement("slider-cards");
const btnPrimary = getAllElementsByClass(".btn-primary");


const state = {
  visibleCards: 0,
  currentStartIndex: 0,
  isCardsAmountChanged: false,
};


const checkActiveArrows = () => {
  leftArrowbtn.classList.toggle("inactive", state.currentStartIndex === 0);
  rightArrowbtn.classList.toggle("inactive", state.currentStartIndex >= petCards.length - state.visibleCards);
}

const cardsEvent = () => {
  updateCards(sliderCards, state.visibleCards, state.currentStartIndex);
  updateCardModals();
  checkActiveArrows();
}


const handleNavigation = (direction) => {
  if (direction === 'left' && state.currentStartIndex > 0) {
    state.currentStartIndex -= state.visibleCards;
  } else if (direction === 'right' && state.currentStartIndex < petCards.length - state.visibleCards) {
    state.currentStartIndex += state.visibleCards;
  }
  cardsEvent();
};

leftArrowbtn.addEventListener("click", () => handleNavigation('left'));
rightArrowbtn.addEventListener("click", () => handleNavigation('right'));


btnPrimary.forEach(button => {
  button.addEventListener("click", () => window.location.href = './pets.html');
});




[state.visibleCards] = updateVisibleCards(1, 2, 3, state.visibleCards);
cardsEvent();
setupMenuAndSidebarHandlers();
setupCloseCardModalHandler();
setupResizeHandler(cardsEvent, 1, 2, 3, state);