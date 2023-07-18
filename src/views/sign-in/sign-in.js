import { postSignin } from '../lib/Fetcher.js';

const id = document.querySelector('.form__id');
const pw = document.querySelector('.form__pw');
const submitBtn = document.querySelector('.form__submit');

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = {
    email: id.value.trim(),
    password: pw.value.trim(),
  };
  const userToken = await postSignin(data);
  localStorage.setItem('userToken', userToken);
  window.location.href = '/';
};
submitBtn.addEventListener('click', handleSubmit);
