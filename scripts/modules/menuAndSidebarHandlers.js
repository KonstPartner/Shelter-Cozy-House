import { getAllElementsByClass, getElementByClass } from './elementCache.js';

const setupMenuBtnClickEvents = (menuBtns) => {
  menuBtns.forEach(button => {
    button.addEventListener('click', () => clickMenuBtn());
  });
};

const setupSidebarLinkClickEvents = (sidebar) => {
  sidebar.addEventListener('click', (event) => {
    if (event.target.matches('.sidebar nav ul li a')) {
      clickAnchorElement(sidebar);
    }
  });
};

const clickMenuBtn = () => {
  const sidebar = getElementByClass('.sidebar');
  sidebar.classList.toggle('active');
  document.body.style.overflow = document.body.style.overflow === "hidden" ? "auto" : "hidden";
};

const clickAnchorElement = () => {
  const sidebar = getElementByClass('.sidebar');
  sidebar.classList.remove('active');
  document.body.style.overflow = "auto";
};

export const setupMenuAndSidebarHandlers = () => {
  const sidebar = getElementByClass('.sidebar');
  const menuBtn = getAllElementsByClass('.menu-btn');

  setupMenuBtnClickEvents(menuBtn);
  setupSidebarLinkClickEvents(sidebar);
};

export default setupMenuAndSidebarHandlers;
