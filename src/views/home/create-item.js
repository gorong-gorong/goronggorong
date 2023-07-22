//item 리스트 컴포넌트 만들기
export function createItem(item) {
  const itemElement = document.createElement('li');
  itemElement.classList.add('prod__item');

  const link = document.createElement('a');
  link.classList.add('prod__link');
  link.setAttribute('href', `/products?id=${item.id}`);

  // 이미지 lazy loading 적용
  const thumb = document.createElement('img');
  thumb.classList.add('prod__link-thumb');
  thumb.setAttribute('data-src', item.imgUrl);
  thumb.setAttribute('alt', `${item.name} 대표 이미지`);

  // Intersection Observer option 설정
  const options = {
    root: null,
    rootMargin: '0px 0px 40px 0px',
    threshold: 0,
  };
  //  Intersection Observer 등록
  const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      // 관찰 대상이 viewport 안에 들어온 경우 image로드
      if (entry.isIntersecting) {
        // data-src에 저장한 정보를 실제 src 속성에 설정
        entry.target.src = entry.target.dataset.src;
        // 이미지가 로드되었으므로 관찰 중지
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // 각 이미지 요소를 관찰 대상으로 등록
  lazyLoadObserver.observe(thumb);

  // 이미지 로드 실패 시 디폴트 이미지
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
