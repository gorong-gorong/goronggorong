import { main } from '/layouts/main.js';
await main();
import { getItemData, getItemByCategory } from '/lib/Fetcher.js';
import { createItem } from './create-item.js';

const amountAll = document.querySelector('.prod__item--amount');
const list = document.querySelector('.prod__list');

// 전체 아이템 렌더링
const items = await getItemData();
amountAll.innerText = items.length;

items.forEach((item) => {
  const itemElement = createItem(item);
  list.appendChild(itemElement);
});

// 카테고리별 아이템 렌더링
const categories = document.querySelectorAll('.nav__cate li');

categories.forEach((category) => {
  const renderProducts = (e) => {
    //기존 on카테고리에서 on클래스 삭제하고
    document.querySelector('.nav__cate--on').classList.remove('nav__cate--on');
    //클릭한 카테고리에 on 클래스 추가
    if (e.target.tagName === 'A') {
      e.target.parentElement.classList.add('nav__cate--on');
    } else {
      e.target.classList.add('nav__cate--on');
    }
    const selectedCategory = category.dataset.category;
    if (selectedCategory === 'All') {
      window.location.href = '/';
      return;
    } else {
      renderCategoryItem(selectedCategory);
    }
  };
  category.addEventListener('click', renderProducts);
});

const renderCategoryItem = async (selectedCategory) => {
  const CategoryItems = await getItemByCategory(selectedCategory);
  amountAll.innerText = CategoryItems.length;
  const list = document.querySelector('.prod__list');
  list.innerHTML = ''; //기존 상품 목록 초기화
  CategoryItems.forEach((item) => {
    const itemElement = createItem(item);
    list.appendChild(itemElement);
  });
};
