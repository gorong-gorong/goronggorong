//item 리스트 컴포넌트 만들기
export function createItem(item) {
  const itemElement = document.createElement('li');
  itemElement.classList.add('prod__item');

  const link = document.createElement('a');
  link.classList.add('prod__link');
  link.setAttribute('href', `/products?id=${item.id}`);

  const thumb = document.createElement('img');
  thumb.classList.add('prod__link-thumb');
  thumb.setAttribute('src', item.imgUrl);
  thumb.setAttribute('alt', `${item.name} 대표 이미지`);
  //이미지 로드 실패 시 디폴트 이미지
  thumb.onerror = () => {
    thumb.onerror = null;
    thumb.setAttribute('src', '../img/error.png');
    thumb.style.border = '1px solid #e8e8e8';
  };

  const info = document.createElement('div');
  info.classList.add('prod__info');

  const title = document.createElement('p');
  title.classList.add('prod__title');
  title.innerText = item.name;

  const order = document.createElement('div');
  order.classList.add('prod__order');

  const price = document.createElement('span');
  price.innerHTML = `<strong class="prod__order-price">${item.price.toLocaleString()}</strong>원`;

  order.appendChild(price);
  info.appendChild(title);
  info.appendChild(order);
  link.appendChild(thumb);
  link.appendChild(info);
  itemElement.appendChild(link);

  return itemElement;
}
