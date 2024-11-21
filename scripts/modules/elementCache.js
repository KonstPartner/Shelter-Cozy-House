const elementCache = {};

export const getElement = (id) => {
  if (!elementCache[id]) {
    elementCache[id] = document.getElementById(id);
  }
  return elementCache[id];
};

export const getAllElementsByClass = (selector) => {
  if (!elementCache[selector]) {
    elementCache[selector] = document.querySelectorAll(selector);
  }
  return elementCache[selector];
};

export const getElementByClass = (selector) => {
  if (!elementCache[selector]) {
    elementCache[selector] = document.querySelector(selector);
  }
  return elementCache[selector];
};