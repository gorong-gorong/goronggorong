import { getUserInfo, putUserInfo, deleteUserInfo } from '/lib/Fetcher.js';
import { getJoinedAddress } from '/lib/utils/get-joined-address.js';

const userName = document.querySelector('.form__name');
const id = document.querySelector('.form__id');
const password = document.querySelector('.form__pw');
const passwordCheck = document.querySelector('.form__pw-check');
const phone = document.querySelector('.form__phone');
const submitBtn = document.querySelector('.form__submit');
const deleteBtn = document.querySelector('.delete-btn');
const addressForm = document.querySelectorAll('.change-delivery-address input');
console.log('🚀 ~ file: edit-user-info.js:12 ~ address:', addressForm);

// 기존 회원정보
const data = await getUserInfo();
id.value = data.email;
phone.value = data.phone;
userName.value = data.name;
addressForm.forEach((addressInput, index) => {
  const addressValue = data.address.split(',')[index];
  addressInput.value = addressValue;
});

// 회원정보 업데이트
const handleSubmit = async (e) => {
  e.preventDefault();
  const data = {
    name: userName.value,
    password: password.value,
    phone: phone.value,
    address: getJoinedAddress(),
  };
  const userToken = await putUserInfo(data);
  alert(`회원정보가 수정되었습니다.`);
  window.location.href = '/mypage';
  // 토큰 업데이트
  // localStorage.setItem('userToken', userToken);
};
submitBtn.addEventListener('click', handleSubmit);

// 회원탈퇴 로직
const handleDeleteClick = async () => {
  if (!password.value || !passwordCheck.value) {
    alert('비밀번호를 입력 해 주세요');
  } else if (passwordCheck.value !== password.value) {
    alert('입력하신 비밀번호가 일치하지 않습니다.');
  } else if (confirm('탈퇴하시겠습니까?')) {
    await deleteUserInfo();
    window.alert(`탈퇴되었습니다`);
    localStorage.removeItem('userToken');
    window.location.href = '/';
  }
};
deleteBtn.addEventListener('click', handleDeleteClick);
