import { main } from '/layouts/main.js';
await main();
import { getItemData } from '/lib/Fetcher.js';
import { createItem } from './create-item.js';

const amountAll = document.querySelector('.prod__item--amount');
const prodList = document.querySelector('.prod__list');
const bottom = document.querySelector('.bottom');

// 카테고리, 페이지 초깃값
let pageState = {
  category: '',
  page: 1,
  perPage: 20,
  maxPage: 1,
  totalProductsAmount: 0,
};

const renderItemList = async () => {
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

// 처음 페이지 연결 시 전체 아이템 리스트 렌더링
renderItemList();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && pageState.page < pageState.maxPage) {
      pageState.page++;
      renderItemList();
    }
  });
});
observer.observe(bottom);

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
    pageState.category = '';
  } else {
    pageState.category = selectedCategory;
  }
  pageState.page = 1;
  renderItemList();
};

// 각 카테고리에 이벤트 등록
const categories = document.querySelectorAll('.nav__cate li');
categories.forEach((category) => {
  category.addEventListener('click', handleCategoryClick);
});
