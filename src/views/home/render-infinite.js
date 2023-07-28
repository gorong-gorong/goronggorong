import { main } from '/layouts/main.js';
await main();
import { getItemData } from '/lib/api/Fetcher.js';
import { createItem } from './create-item.js';

const amountAll = document.querySelector('.prod__item--amount');
const prodList = document.querySelector('.prod__list');
const bottom = document.querySelector('.bottom');

let pageState = {
  category: '',
  page: 1,
  perPage: 20,
  maxPage: 1,
  totalProductsAmount: 0,
};

const renderInfiniteItemList = async (initPageState) => {
  // pageState 업데이트
  pageState = initPageState;
  // 아이템 데이터 요청
  const itemData = await getItemData(pageState.category, pageState.page, pageState.perPage);
  const items = itemData.productList;
  pageState.maxPage = Math.ceil(itemData.totalProductsAmount / pageState.perPage);
  pageState.totalProductsAmount = itemData.totalProductsAmount;
  amountAll.innerText = pageState.totalProductsAmount;
  // 아이템 리스트 렌더링
  if (pageState.page === 1) {
    prodList.innerHTML = ''; // 기존 아이템 삭제
  }
  items.forEach((item) => {
    const itemElement = createItem(item);
    prodList.appendChild(itemElement);
  });
};

// 브라우저 화면에 bottom 요소가 들어오면 다음페이지 api 요청
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && pageState.page < pageState.maxPage) {
      pageState.page++;
      renderInfiniteItemList(pageState);
    }
  });
});
observer.observe(bottom);

export { renderInfiniteItemList };
