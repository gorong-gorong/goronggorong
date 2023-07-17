import { main } from '/layouts/main.js';
await main();

const userToken = localStorage.getItem('usrToken');

const getSuccess = async (userToken) => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/orders/payment/success',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    const { name, phone, address, requestMessage, paymentType, totalPrice } = JSON.parse(
      localStorage.getItem('deliveryInfo'),
    );
    const receiverName = document.querySelector('.receiver-name');
    const receiverAddress = document.querySelector('.receiver-address');
    const receiverPhone = document.querySelector('.receiver-phone');
    const receiverRequest = document.querySelector('.receiver-request');
    const totalPriceNumber = document.querySelector('.total-price');
    const paymentTypeEl = document.querySelector('.payment-type');
    receiverName.innerHTML = name;
    receiverAddress.innerHTML = address;
    receiverPhone.innerHTML = phone;
    receiverRequest.innerHTML = requestMessage;
    totalPriceNumber.innerHTML = totalPrice.toLocaleString();
    paymentTypeEl.innerHTML = paymentType === 'account' ? '무통장입금' : '카드';
  } catch (err) {
    alert(err);
  }
};
getSuccess(userToken);

const deleteLocalStorage = () => {
  localStorage.removeItem('deliveryInfo');
};

const goMyPage = document.querySelector('.go-my-page');
const goMainPage = document.querySelector('.go-main-page');
goMyPage.addEventListener('click', deleteLocalStorage);
goMainPage.addEventListener('click', deleteLocalStorage);
