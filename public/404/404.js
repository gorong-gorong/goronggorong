import { main } from '/layouts/main.js';
await main();

const prevButton = document.querySelector('.error__redirect-prev');

prevButton.addEventListener('click', () => {
  window.history.go(-1);
});
