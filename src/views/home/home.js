import { main } from '/layouts/main.js';
await main();
import { renderInfiniteItemList } from './render-infinite.js';
import { renderPaginatedItemList } from './render-pagination.js';

const itemViewCount = document.querySelector('.prod__item--view');
const pagination = document.querySelector('.pagination');

// 초기 페이지 설정
let initPageState = {
  category: '',
  page: 1,
  perPage: 20,
};

// 처음 페이지 연결 시 아이템 리스트 렌더링
renderPaginatedItemList(initPageState);

// 페이지당 표시 할 아이템 수 선택
const handleSelectViewCount = (e) => {
  if (e.target.value === 'all') {
    pagination.style.display = 'none';
    renderInfiniteItemList(initPageState);
  } else {
    initPageState.perPage = Number(e.target.value);
    renderPaginatedItemList(initPageState);
  }
};
itemViewCount.addEventListener('change', handleSelectViewCount);

// 카테고리 선택
const handleCategoryClick = (e) => {
  //클릭한 카테고리에 on 클래스 추가
  document.querySelector('.nav__cate--on').classList.remove('nav__cate--on');
  if (e.target.tagName === 'A') {
    e.target.parentElement.classList.add('nav__cate--on');
  } else {
    e.target.classList.add('nav__cate--on');
  }

  const selectedCategory = e.target.dataset.category;
  if (selectedCategory === 'All') {
    initPageState.category = '';
  } else {
    initPageState.category = selectedCategory;
  }

  initPageState.page = 1; // 페이지 초기화
  renderPaginatedItemList(initPageState);
};

// 각 카테고리에 이벤트 등록
const categories = document.querySelectorAll('.nav__cate li');
categories.forEach((category) => {
  category.addEventListener('click', handleCategoryClick);
});
