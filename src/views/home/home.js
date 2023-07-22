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
  perPage: 12,
  maxPage: 1,
};

const renderItemList = async () => {
  // 아이템 데이터 요청
  const itemData = await getItemData(state.category, state.page, state.perPage);
  const items = itemData.productList;
  state.maxPage = Math.ceil(itemData.maxPage / state.perPage);
  amountAll.innerText = itemData.maxPage;

  // 아이템 리스트 렌더링
  prodList.innerHTML = ''; // 기존 아이템 삭제
  items.forEach((item) => {
    const itemElement = createItem(item);
    prodList.appendChild(itemElement);
  });

  // 페이지네이션
  leftButton.disabled = state.page === 1;
  rightButton.disabled = state.page === state.maxPage || state.maxPage === 1;

  createPagination(state.maxPage);
};

// 페이지네이션 - 왼쪽, 오른쪽 버튼
const leftButton = document.querySelector('.pagination__button-left');
const rightButton = document.querySelector('.pagination__button-right');
leftButton.addEventListener('click', async () => {
  state.page = Math.max(state.page - 1, 1);
  await renderItemList();
});
rightButton.addEventListener('click', async () => {
  state.page = Math.min(state.page + 1, state.maxPage);
  await renderItemList();
});

// 페이지네이션 - 페이지 숫자 버튼
const createPagination = (itemMaxPage) => {
  const pagination = document.querySelector('.pagination__count');
  pagination.innerHTML = '';

  for (let i = 1; i <= itemMaxPage; i++) {
    const pageCount = document.createElement('button');
    pageCount.innerText = `${i}`;
    if (i === state.page) {
      pageCount.classList.add('pagination__button-active');
    }

    pagination.appendChild(pageCount);
  }

  const paginationButtons = pagination.querySelectorAll('button');
  paginationButtons.forEach((pageButton) => {
    pageButton.addEventListener('click', async (e) => {
      state.page = Number(e.target.innerText);
      const prevActiveButton = document.querySelector('.pagination__button-active');
      prevActiveButton.classList.remove('pagination__button-active');
      e.target.classList.add('pagination__button-active');
      await renderItemList();
    });
  });
};
// 처음 페이지 연결 시 전체 아이템 리스트 렌더링
renderItemList();

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

  state.page = 1; // 페이지 초기화
  await renderItemList();
};

// 각 카테고리에 이벤트 등록
const categories = document.querySelectorAll('.nav__cate li');
categories.forEach((category) => {
  category.addEventListener('click', handleCategoryClick);
});
