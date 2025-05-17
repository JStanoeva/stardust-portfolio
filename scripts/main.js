import { createStars } from './createStars.js';

function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction() {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function setCopyrightYear() {
  const yearSpan = document.getElementById('copyright-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  } else {
    console.error('Copyright year span not found!');
  }
}

const debouncedCreateStars = debounce(createStars, 250);

window.addEventListener('load', () => {
  setCopyrightYear();
  createStars();
});

window.addEventListener('resize', debouncedCreateStars);
