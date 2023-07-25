const addressForm = document.querySelector('.form__address-data');

export function formatAddress() {
  return [...addressForm.children]
    .filter((item) => item.tagName === 'INPUT')
    .map((item) => item.value)
    .join(',');
}
