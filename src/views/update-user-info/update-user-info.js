import { removeToken } from '/lib/api/Token.js';
import { getUserInfo, putUserInfo, deleteUserInfo } from '/lib/api/Fetcher.js';
import { formatAddress } from '/lib/utils/format-address.js';

const nameInput = document.querySelector('.form__name');
const idInput = document.querySelector('.form__id');
const phoneInput = document.querySelector('.form__phone');
const signForm = document.querySelector('.sign__form');
const deleteButton = document.querySelector('.delete-btn');
const addressInputs = document.querySelectorAll('.form__address-data input');

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
    phone: phoneInput.value,
    address: formatAddress(),
  };
  await putUserInfo(data);
  alert(`회원정보가 수정되었어요.`);
  window.location.href = '/mypage';
};
signForm.addEventListener('submit', handleSubmit);

// 회원탈퇴 로직
const handleDeleteClick = async () => {
  if (confirm('정말 탈퇴하실건가요?😹\n 탈퇴 시 주문 내역 및 개인정보가 모두 삭제되니 주의해주세요.')) {
    await deleteUserInfo();
    removeToken();
    window.alert(`탈퇴되었어요😿`);
    window.location.href = '/';
  }
};
deleteButton.addEventListener('click', handleDeleteClick);
