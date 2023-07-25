const addressForm = document.querySelector('.change-delivery-address input');

export function getJoinedAddress() {
  return [...addressForm.children]
    .filter((item) => item.tagName === 'INPUT')
    .map((item) => item.value)
    .join(',');
}
