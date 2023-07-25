import { main } from '/layouts/main.js';
await main();
import { getItemData } from '/lib/Fetcher.js';
import { createItem } from './create-item.js';

const amountAll = document.querySelector('.prod__item--amount');
const prodList = document.querySelector('.prod__list');

let pageState = {
  category: '',
  page: 1,
  perPage: 20,
  maxPage: 1,
  totalProductsAmount: 0,
};

const renderPaginatedItemList = async (initPageState) => {
  // pageState 업데이트
  pageState = initPageState;
  // 아이템 데이터 요청
  const itemData = await getItemData(pageState.category, pageState.page, pageState.perPage);
  const items = itemData.productList;
  pageState.maxPage = Math.ceil(itemData.totalProductsAmount / pageState.perPage);

  pageState.totalProductsAmount = itemData.totalProductsAmount;
  amountAll.innerText = pageState.totalProductsAmount;

  // 아이템 리스트 렌더링
  prodList.innerHTML = ''; // 기존 아이템 삭제
  items.forEach((item) => {
    const itemElement = createItem(item);
    prodList.appendChild(itemElement);
  });

  // 현재 페이지에 따라 왼쪽, 오른쪽버튼 비활성화
  prevButton.disabled = pageState.page === 1;
  nextButton.disabled = pageState.page === pageState.maxPage || pageState.maxPage === 1;

  createPagination(pageState.maxPage);
};

// 페이지네이션 - 왼쪽, 오른쪽 버튼
const prevButton = document.querySelector('.pagination__button-prev');
const nextButton = document.querySelector('.pagination__button-next');

prevButton.addEventListener('click', () => {
  pageState.page = Math.max(pageState.page - 1, 1);
  renderPaginatedItemList(pageState);
});
nextButton.addEventListener('click', () => {
  pageState.page = Math.min(pageState.page + 1, pageState.maxPage);
  renderPaginatedItemList(pageState);
});

// 페이지네이션 - 페이지 숫자 버튼
const createPagination = (itemMaxPage) => {
  const paginationCount = document.querySelector('.pagination__count');
  paginationCount.innerHTML = '';

  for (let i = 1; i <= itemMaxPage; i++) {
    const pageCount = document.createElement('button');
    pageCount.innerText = `${i}`;
    if (i === pageState.page) {
      pageCount.classList.add('pagination__button-active');
    }

    paginationCount.appendChild(pageCount);
  }

  const paginationButtons = paginationCount.querySelectorAll('button');
  paginationButtons.forEach((pageButton) => {
    pageButton.addEventListener('click', (e) => {
      pageState.page = Number(e.target.innerText);
      const prevActiveButton = document.querySelector('.pagination__button-active');
      prevActiveButton.classList.remove('pagination__button-active');
      e.target.classList.add('pagination__button-active');
      renderPaginatedItemList(pageState);
    });
  });
};

export { renderPaginatedItemList };
