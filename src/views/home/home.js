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
};

const renderItemList = async () => {
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

  createPagination(itemData.maxPage);
};

// 페이지네이션
const createPagination = (itemMaxPage) => {
  const pagination = document.querySelector('.pagination__count');
  pagination.innerHTML = '';
  const maxPage = Math.ceil(itemMaxPage / state.perPage);
  for (let i = 1; i <= maxPage; i++) {
    const pageCount = document.createElement('button');
    pageCount.innerText = `${i}`;
    console.log(state.page);
    if (i === state.page) {
      pageCount.classList.add('pagination__button-active');
    }
    pagination.appendChild(pageCount);

    const paginationButtons = pagination.querySelectorAll('button');
    paginationButtons.forEach((pageButton) => {
      pageButton.addEventListener('click', async (e) => {
        state.page = Number(e.target.innerText);
        const activeButton = document.querySelector('.pagination__button-active');
        activeButton.classList.remove('pagination__button-active');
        e.target.classList.add('pagination__button-active');
        await renderItemList();
      });
    });
  }
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

  if (state.page !== 1) {
    state.page = 1; // 페이지 초기화
    await renderItemList();
  }
};

// 각 카테고리에 이벤트 등록
const categories = document.querySelectorAll('.nav__cate li');
categories.forEach((category) => {
  category.addEventListener('click', handleCategoryClick);
});
