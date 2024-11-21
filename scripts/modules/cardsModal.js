import { getElement } from "./elementCache.js";
import { petInfo } from "./petsInfo.js";


const updateCardModalContent = (currentCardData) => {
  getElement("capture").innerHTML = `<img src="/assets/images/Card images/${currentCardData.toLowerCase()}.png" alt="${currentCardData} photo">`;
  getElement("pet-name").textContent = currentCardData;
  getElement("pet-type").textContent = petInfo[currentCardData].type;
  getElement("pet-bio").textContent = petInfo[currentCardData].bio;
  getElement("pet-age").textContent = petInfo[currentCardData].age;
  getElement("pet-diseases").textContent = petInfo[currentCardData].diseases;
  getElement("pet-inoculations").textContent = petInfo[currentCardData].inoculations;
  getElement("pet-parasites").textContent = petInfo[currentCardData].parasites;
};

const showCardModal = () => {
  const cardModal = getElement("card-modal");
  cardModal.showModal();
  document.body.style.overflow = "hidden";
  cardModal.style.display = "flex";
};

const updateCardModals = () => {
  document.addEventListener("click", (event) => {
    if (event.target.matches(".card-modal-btn")) {
      const currentCardData = event.target.getAttribute("card-data");
      updateCardModalContent(currentCardData);
      showCardModal();
    }
  });
};

const closeCardModal = () => {
  const cardModal = getElement("card-modal");
  cardModal.close();
  cardModal.style.display = "none";
  document.body.style.overflow = "auto";
};

const setupCloseCardModalHandler = () => {
  const closeCardModalBtn = getElement("close-card-modal")
  closeCardModalBtn.addEventListener("click", closeCardModal);
}

export { updateCardModals, setupCloseCardModalHandler};