import { getUserInfo, putUserInfo } from '/lib/Fetcher.js';

const userName = document.querySelector('.form__name');
const id = document.querySelector('.form__id');
const pw = document.querySelector('.form__pw');
const phone = document.querySelector('.form__phone');
const submitBtn = document.querySelector('.form__submit');
const deleteBtn = document.querySelector('.delete-btn');
const addressWrap = document.querySelector('.change-delivery-address');
const address = () => {
  return [...addressWrap.children]
    .filter((item) => item.tagName === 'INPUT')
    .map((item) => item.value)
    .join(' ');
};

const userToken = localStorage.getItem('userToken');

//기존 회원정보(변경불가능 값)
const data = await getUserInfo();
id.value = data.email;
phone.value = data.phone;
userName.value = data.name;

//회원정보 업데이트
const handleSubmit = async (e) => {
  e.preventDefault();
  const data = {
    name: userName.value,
    password: pw.value,
    phone: phone.value,
    address: address(),
  };
  const userToken = await putUserInfo(data);
  alert(`회원정보가 수정되었습니다.`);
  window.location.href = '/mypage';
  localStorage.setItem('userToken', userToken);
};
submitBtn.addEventListener('click', handleSubmit);

//회원탈퇴 로직
const handleDeleteClick = () => {
  if (confirm('탈퇴하시겠습니까?')) {
    deleteUserInfo(userToken);
  }
};
deleteBtn.addEventListener('click', handleDeleteClick);

const deleteUserInfo = async (userToken) => {
  try {
    const res = axios({
      method: 'delete',
      url: '/api/v1/mypage/delete-user-info',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (res.status === 200) {
      window.alert(`탈퇴되었습니다`);
      localStorage.removeItem('userToken');
      window.location.href = '/';
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};
