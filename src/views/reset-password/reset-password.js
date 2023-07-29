import { passwordReset } from '/lib/api/Fetcher.js';

const nameInput = document.querySelector('.form__name');
const idInput = document.querySelector('.form__id');
const phoneInput = document.querySelector('.form__phone');
const signForm = document.querySelector('.sign__form');

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = {
    name: nameInput.value,
    email: idInput.value,
    phone: phoneInput.value,
  };
  const newPassword = await passwordReset(data);
  modal.classList.add('is-active');
  newPasswordInput.value = newPassword.resetPassword;
};
signForm.addEventListener('submit', handleSubmit);

// 모달관련 dom요소
const modal = document.querySelector('.modal');
const exitButton = document.querySelector('.delete');
const copyButton = document.querySelector('.modal-copy');
const signinButton = document.querySelector('.modal-signin');
const newPasswordInput = document.querySelector('.new-pw--value');

//모달 관련 이벤트
const handleExitClick = () => {
  modal.classList.remove('is-active');
};

const handleCopyClick = async () => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(newPasswordInput.value);
      alert('비밀번호가 복사되었습니다.\n로그인 후 비밀번호를 변경해주세요!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('비밀번호 복사에 실패했습니다.');
    }
  } else {
    //clipboard api를 지원하지 않는 브라우저의 경우 execCommand를 사용
    newPasswordInput.select();
    document.execCommand('copy');
    alert('비밀번호가 복사되었습니다.\n로그인 후 비밀번호를 변경해주세요!');
  }
};

const handleSigninClick = () => {
  window.location.href = '/signin';
};
exitButton.addEventListener('click', handleExitClick);
copyButton.addEventListener('click', handleCopyClick);
signinButton.addEventListener('click', handleSigninClick);
