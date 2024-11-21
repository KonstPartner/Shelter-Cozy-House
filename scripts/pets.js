import { setupResizeHandler, updateCards, updateVisibleCards } from "./modules/cards.js";
import { setupCloseCardModalHandler, updateCardModals } from "./modules/cardsModal.js"
import { getAllElementsByClass, getElement } from "./modules/elementCache.js";
import { petCards } from "./modules/petsInfo.js";
import { setupMenuAndSidebarHandlers } from "./modules/menuAndSidebarHandlers.js";

const sliderCards = getElement("slider-cards");
const previousPageBtn = getElement("previous-page-btn");
const nextPageBtn = getElement("next-page-btn");
const firstPageBtn = getElement("first-page-btn");
const lastPageBtn = getElement("last-page-btn");
const pageNumberBtn = getElement("page-number-btn");
const linkLogo = getAllElementsByClass('.link-logo');


const state = {
  visibleCards: 0,
  currentStartIndex: 0,
  isCardsAmountChanged: false,
};


const updatePageNumber = () => {
  const currentPage = Math.floor(state.currentStartIndex / state.visibleCards) + 1;
  pageNumberBtn.textContent = currentPage;
};


const checkActiveBtns = () => {
  previousPageBtn.classList.toggle("inactive", state.currentStartIndex === 0);
  nextPageBtn.classList.toggle("inactive", state.currentStartIndex >= petCards.length - state.visibleCards);
  firstPageBtn.classList.toggle("inactive", state.currentStartIndex === 0);
  lastPageBtn.classList.toggle("inactive", state.currentStartIndex >= petCards.length - state.visibleCards);
  updatePageNumber();
};


const cardsEvent = () => {
  updateCards(sliderCards, state.visibleCards, state.currentStartIndex);
  updateCardModals();
  checkActiveBtns();
};


const handleNavigation = (direction) => {
  if (direction === 'previous' && state.currentStartIndex > 0) {
    state.currentStartIndex -= state.visibleCards;
  } else if (direction === 'next' && state.currentStartIndex < petCards.length - state.visibleCards) {
    state.currentStartIndex += state.visibleCards;
  } else if (direction === 'first' && state.currentStartIndex !== 0) {
    state.currentStartIndex = 0;
  } else if (direction === 'last') {
    const totalCards = petCards.length;
    const lastPageStartIndex = Math.floor((totalCards - 1) / state.visibleCards) * state.visibleCards;
    if (state.currentStartIndex !== lastPageStartIndex) {
      state.currentStartIndex = lastPageStartIndex;
    }
  }
  cardsEvent();
};


previousPageBtn.addEventListener("click", () => handleNavigation('previous'));
nextPageBtn.addEventListener("click", () => handleNavigation('next'));
firstPageBtn.addEventListener("click", () => handleNavigation('first'));
lastPageBtn.addEventListener("click", () => handleNavigation('last'));


linkLogo.forEach(image => {
  image.addEventListener("click", () => window.location.href = './index.html');
});


[state.visibleCards] = updateVisibleCards(3, 6, 8, state.visibleCards);
cardsEvent();
setupMenuAndSidebarHandlers();
setupCloseCardModalHandler();
setupResizeHandler(cardsEvent, 3, 6, 8, state);