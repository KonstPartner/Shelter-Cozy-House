import { petCards } from "./petsInfo.js";

export const updateVisibleCards = (minAmount, middleAmount, maxAmount, visibleCards) => {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 470) {
    return [minAmount, visibleCards !== minAmount];
  } else if (screenWidth <= 768) {
    return [middleAmount, visibleCards !== middleAmount];
  } else {
    return [maxAmount, visibleCards !== maxAmount];
  }
};

export const setupResizeHandler = (cardsEvent, minCards, mediumCards, largeCards, state) => {
  window.addEventListener("resize", () => {
    [state.visibleCards, state.isCardsAmountChanged] = updateVisibleCards(minCards, mediumCards, largeCards, state.visibleCards);
    if (state.isCardsAmountChanged) {
      state.isCardsAmountChanged = false;
      state.currentStartIndex = 0;
      cardsEvent();
    }
  });
};


export const updateCards = (sliderCards, visibleCards, currentStartIndex) => {
  sliderCards.innerHTML = "";
  const visiblePets = petCards.slice(currentStartIndex, currentStartIndex + visibleCards);
  visiblePets.forEach(name => {
    sliderCards.innerHTML += `
      <div class="card">
        <div class="container-img">
          <img src="/assets/images/Card images/${name.toLowerCase()}.png" alt="${name} photo">
        </div>
        <p>${name}</p>
        <button class="card-modal-btn" card-data="${name}">Learn more</button>
      </div>
    `;
  });
};