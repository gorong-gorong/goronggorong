import { main } from '/layouts/main.js';
await main();

const prevButton = document.querySelector('.prev-button');

prevButton.addEventListener('click', () => {
  window.history.go(-1);
});
