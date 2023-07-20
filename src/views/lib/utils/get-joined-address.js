const addressWrap = document.querySelector('.change-delivery-address');

export function getJoinedAddress() {
  return [...addressWrap.children]
    .filter((item) => item.tagName === 'INPUT')
    .map((item) => item.value)
    .join(' ');
}
