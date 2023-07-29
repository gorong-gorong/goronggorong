import { putUserInfo } from '/lib/api/Fetcher.js';

const signForm = document.querySelector('.sign__form');
const passwordInput = document.querySelector('.form__pw');
const passwordCheckInput = document.querySelector('.form__pw-check');

// 비밀번호 업데이트
const handleSubmit = async (e) => {
  e.preventDefault();
  const data = {
    password: passwordInput.value,
  };
  if (passwordInput.value === passwordCheckInput.value) {
    await putUserInfo(data);
    alert(`비밀번호가 변경되었어요.`);
    window.location.href = '/mypage';
  } else {
    alert('입력하신 비밀번호가 일치하지 않아요.\n다시 확인해주세요.');
  }
};
signForm.addEventListener('submit', handleSubmit);
