import { getUserInfo, putUserInfo, deleteUserInfo } from '/lib/Fetcher.js';
import { getJoinedAddress } from '/lib/utils/get-joined-address.js';

const nameInput = document.querySelector('.form__name');
const idInput = document.querySelector('.form__id');
const passwordInput = document.querySelector('.form__pw');
const passwordCheckInput = document.querySelector('.form__pw-check');
const phoneInput = document.querySelector('.form__phone');
const submitButton = document.querySelector('.form__submit');
const deleteButton = document.querySelector('.delete-btn');
const addressInputs = document.querySelectorAll('.change-delivery-address input');

// 기존 회원정보
const data = await getUserInfo();
const { email, phone, name, address } = data;
idInput.value = email;
phoneInput.value = phone;
nameInput.value = name;
addressInputs.forEach((addressInput, index) => {
  const addressValue = address.split(',')[index];
  addressInput.value = addressValue;
});

// 회원정보 업데이트
const handleSubmit = async (e) => {
  e.preventDefault();
  const data = {
    name: nameInput.value,
    password: passwordInput.value,
    phone: phoneInput.value,
    address: getJoinedAddress(),
  };
  const userToken = await putUserInfo(data);
  alert(`회원정보가 수정되었습니다.`);
  window.location.href = '/mypage';
  // 토큰 업데이트
  // localStorage.setItem('userToken', userToken);
};
submitButton.addEventListener('click', handleSubmit);

// 회원탈퇴 로직
const handleDeleteClick = async () => {
  if (!passwordInput.value || !passwordCheckInput.value) {
    alert('비밀번호를 입력 해 주세요');
  } else if (passwordCheckInput.value !== passwordInput.value) {
    alert('입력하신 비밀번호가 일치하지 않습니다.');
  } else if (confirm('탈퇴하시겠습니까?')) {
    await deleteUserInfo();
    window.alert(`탈퇴되었습니다`);
    localStorage.removeItem('userToken');
    window.location.href = '/';
  }
};
deleteButton.addEventListener('click', handleDeleteClick);
