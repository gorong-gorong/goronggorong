import { main } from '/layouts/main.js';
await main();
import { getItemData } from '/lib/Fetcher.js';
import { createItem } from './create-item.js';

const amountAll = document.querySelector('.prod__item--amount');
const prodList = document.querySelector('.prod__list');

// 카테고리, 페이지 초깃값
let state = {
  category: '',
  page: 1,
  perPage: 10,
};
// const itemData = await getItemData(state.category, state.page, state.perPage);
// const items = itemData.productList;
// amountAll.innerText = itemData.maxPage;
// // 아이템 리스트 렌더링
// prodList.innerHTML = ''; // 기존 아이템 삭제
// items.forEach((item) => {
//   const itemElement = createItem(item);
//   prodList.appendChild(itemElement);
// });
const handleCategoryClick = async (e) => {
  //클릭한 카테고리에 on 클래스 추가
  document.querySelector('.nav__cate--on').classList.remove('nav__cate--on');
  if (e.target.tagName === 'A') {
    e.target.parentElement.classList.add('nav__cate--on');
  } else {
    e.target.classList.add('nav__cate--on');
  }

  const selectedCategory = e.target.dataset.category;
  if (selectedCategory === 'All') {
    state.category = '';
  } else {
    state.category = selectedCategory;
  }

  // 아이템 데이터 요청
  const itemData = await getItemData(state.category, state.page, state.perPage);
  const items = itemData.productList;
  amountAll.innerText = itemData.maxPage;

  // 아이템 리스트 렌더링
  prodList.innerHTML = ''; // 기존 아이템 삭제
  items.forEach((item) => {
    const itemElement = createItem(item);
    prodList.appendChild(itemElement);
  });
};

// 각 카테고리에 이벤트 등록
const categories = document.querySelectorAll('.nav__cate li');
categories.forEach((category) => {
  category.addEventListener('click', handleCategoryClick);
});
