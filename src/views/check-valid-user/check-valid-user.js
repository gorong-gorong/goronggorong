import { postValidUser } from '/lib/Fetcher.js';

const pw = document.querySelector('.form__pw');
console.log('🚀 ~ file: check-valid-user.js:4 ~ pw:', pw.value);
const submit = document.querySelector('.form__submit');

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = {
    password: pw.value,
  };

  await postValidUser(data);
  window.location.href = '/mypage/edit-user-info';
};
submit.addEventListener('click', handleSubmit);
