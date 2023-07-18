import { postValidUser } from '/lib/Fetcher.js';

const pw = document.querySelector('.form__pw');
const submit = document.querySelector('.form__submit');

const data = {
  password: pw.value,
};
const handleSubmit = async (e) => {
  e.preventDefault();

  await postValidUser(data);
  window.location.href = '/mypage/edit-user-info';
};
submit.addEventListener('click', handleSubmit);
