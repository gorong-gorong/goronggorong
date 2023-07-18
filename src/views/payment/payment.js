import { main } from '/layouts/main.js';
await main();

// 결제완료 시 서버에 보낼 데이터
const reqBody = (() => {
  const OrderSchema = {
    receiver: {
      name: {},
      phone: {},
      address: {},
      requestMessage: {},
    },
    products: [],
    totalPrice: {},
    paymentMethod: {
      paymentType: {
        // card, account
      },
      creditInfo: {
        company: {},
        cardNumber: {},
        expiryDate: {},
        cvc: {},
        cardOwner: {},
      },
    },
  };
  const getValue = () => {
    return OrderSchema;
  };
  const setValue = (target, change) => {
    return (OrderSchema[target] = change);
  };
  return { getValue, setValue };
})();

// 로컬스토리지로 주문 정보를 받음
const localStorageOrders = JSON.parse(localStorage.getItem('orders'));
const totalPrice = document.querySelectorAll('.total-price');
reqBody.setValue('totalPrice', Number(localStorageOrders[1].replace(',', '')));
totalPrice[0].innerHTML = localStorageOrders[1];
totalPrice[1].innerHTML = localStorageOrders[1];
[...localStorageOrders[0]].forEach((item) => {
  reqBody.setValue('products', [...reqBody.getValue().products, { id: item.id, amount: item.amount }]);
});

const inputNumberTypeCheck = (event, middleFnc) => {
  // 입력된 값에서 공백을 제거
  let targetNumber = event.target.value.replace(/\s/g, '');
  // 입력된 값이 숫자로만 이루어져 있는지 확인
  if (!/^\d*$/.test(targetNumber)) {
    targetNumber = targetNumber.replace(/[^\d]/g, '');
  }
  targetNumber = middleFnc(targetNumber);
  // 입력된 값을 다시 input 태그에 설정
  event.target.value = targetNumber.trim();
};

const useVirtualAccount = document.querySelector('.use-virtual-account');
const useCard = document.querySelector('.use-card');
const cardInfoWrap = document.querySelector('.card-info');
const virtualAccountInfo = document.querySelector('.virtual-account-info');

useVirtualAccount.addEventListener('change', () => {
  virtualAccountInfo.classList.add('open');
  cardInfoWrap.classList.remove('open');
  reqBody.setValue('paymentMethod', { ...reqBody.getValue().paymentMethod, paymentType: 'account' });
  reqBody.setValue('paymentMethod', {
    ...reqBody.getValue().paymentMethod,
    creditInfo: {},
  });
});

const cardInfoWarp = {
  cardNumber: document.querySelector('.card-number'),
  expireDate: document.querySelector('.expir-date'),
  cvcNumber: document.querySelector('.cvc-number'),
  company: document.querySelector('.bank'),
  nameOnCard: document.querySelector('.name-on-card'),
};

useCard.addEventListener('change', () => {
  cardInfoWrap.classList.add('open');
  virtualAccountInfo.classList.remove('open');
  reqBody.setValue('paymentMethod', { ...reqBody.getValue().paymentMethod, paymentType: 'card' });

  cardInfoWarp.cardNumber.addEventListener('input', (e) => {
    inputNumberTypeCheck(e, (targetNumber) => {
      // 숫자 4자리마다 공백을 삽입
      targetNumber = targetNumber.replace(/(.{4})/g, '$1 ');
      return targetNumber;
    });
  });

  cardInfoWarp.expireDate.addEventListener('input', (e) => {
    inputNumberTypeCheck(e, (targetNumber) => {
      // 숫자 2자리마다 공백을 삽입
      targetNumber = targetNumber.replace(/(.{2})/g, '$1 ');
      return targetNumber;
    });
  });

  cardInfoWarp.cvcNumber.addEventListener('input', (e) => {
    inputNumberTypeCheck(e, (targetNumber) => {
      return targetNumber;
    });
  });

  cardInfoWarp.nameOnCard.addEventListener('input', (e) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z]/gi, '');
  });
});

const deliveryInfoWrap = {
  info: document.querySelector('.delivery-info'),
  address: document.querySelector('.delivery-address'),
  name: document.querySelector('.delivery-target-name'),
  phone: document.querySelector('.delivery-target-phone'),
  option: document.querySelector('.delivery-request-option'),
};

const changeDeliveryInfoWrap = {
  info: document.querySelector('.change-delivery-info'),
  name: document.querySelector('.change-delivery-target-name'),
  phone: document.querySelector('.change-delivery-target-phone'),
  addressWrap: document.querySelector('.change-delivery-address'),
  address() {
    return [...this.addressWrap.children]
      .filter((item) => item.tagName === 'INPUT')
      .map((item) => item.value)
      .join(' ');
  },
};

// 주문정보의 기본 배송지 설정
const userToken = localStorage.getItem('userToken');
const getUserInfo = async (userToken) => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/auth/get-user-info',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    const userName = document.querySelector('.user-name');
    const userPhone = document.querySelector('.user-phone');
    const { address, name, phone } = res.data.info;
    deliveryInfoWrap.address.innerHTML = address;
    deliveryInfoWrap.name.innerHTML = name;
    deliveryInfoWrap.phone.innerHTML = phone;
    userName.innerHTML = name;
    userPhone.innerHTML = phone;
  } catch (err) {
    console.log(err);
  }
};
getUserInfo(userToken);

changeDeliveryInfoWrap.phone.addEventListener('input', (e) => {
  inputNumberTypeCheck(e, (targetNumber) => {
    return targetNumber;
  });
});

changeDeliveryInfoWrap.name.addEventListener('input', (e) => {
  const regex = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
  const result = e.target.value.match(regex);
  e.target.value = result ? result.join('') : '';
});

const changeDeliveryInfoBtn = document.querySelector('#change-delivery-info-btn');
changeDeliveryInfoBtn.addEventListener('click', (e) => {
  e.currentTarget.classList.toggle('change');

  if (e.currentTarget.className === 'change') {
    deliveryInfoWrap.info.classList.add('close');
    changeDeliveryInfoWrap.info.classList.remove('close');
    e.currentTarget.innerHTML = '완료';
  } else {
    if (changeDeliveryInfoWrap.address().length <= 3) {
      alert('주소를 확인해주세요');
      return;
    }
    if (changeDeliveryInfoWrap.name.value.length <= 0) {
      alert('이름을 확인해주세요');
      return;
    }
    if (changeDeliveryInfoWrap.phone.value.length !== 11) {
      alert('번호를 확인해주세요');
      return;
    }
    deliveryInfoWrap.info.classList.remove('close');
    changeDeliveryInfoWrap.info.classList.add('close');
    e.currentTarget.innerHTML = '배송지 변경';

    deliveryInfoWrap.address.innerHTML = changeDeliveryInfoWrap.address();
    deliveryInfoWrap.name.innerHTML = changeDeliveryInfoWrap.name.value;
    deliveryInfoWrap.phone.innerHTML = changeDeliveryInfoWrap.phone.value;
  }
});

const paymentBtn = document.querySelector('.payment-btn');
paymentBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (
    deliveryInfoWrap.name.innerHTML.length > 0 &&
    deliveryInfoWrap.phone.innerHTML.length === 11 &&
    deliveryInfoWrap.address.innerHTML.length > 0
  ) {
    reqBody.setValue('receiver', { ...reqBody.getValue().receiver, name: deliveryInfoWrap.name.innerHTML });
    reqBody.setValue('receiver', {
      ...reqBody.getValue().receiver,
      phone: deliveryInfoWrap.phone.innerHTML,
    });
    reqBody.setValue('receiver', { ...reqBody.getValue().receiver, address: deliveryInfoWrap.address.innerHTML });
    reqBody.setValue('receiver', {
      ...reqBody.getValue().receiver,
      requestMessage: deliveryInfoWrap.option.value,
    });
  } else {
    alert('배송정보를 확인해주세요');
    return;
  }

  //카드 선택 시
  if (reqBody.getValue().paymentMethod.paymentType === 'card') {
    const setCardInfo = (target, change) => {
      const cardInfo = reqBody.getValue().paymentMethod.cardInfo;
      reqBody.setValue('paymentMethod', {
        ...reqBody.getValue().paymentMethod,
        creditInfo: { ...cardInfo, [target]: change },
      });
    };
    if (cardInfoWarp.cardNumber.value.length === 19) {
      setCardInfo('cardNumber', cardInfoWarp.cardNumber.value.replace(/ /g, ''));
    } else {
      alert('카드번호를 확인해주세요');
      return;
    }
    if (cardInfoWarp.expireDate.value.length === 5) {
      setCardInfo('expiryDate', cardInfoWarp.expireDate.value.replace(/ /g, ''));
    } else {
      alert('카드 만료일을 확인해주세요');
      return;
    }
    if (cardInfoWarp.cvcNumber.value.length === 3) {
      setCardInfo('cvc', cardInfoWarp.cvcNumber.value);
    } else {
      alert('CVC를 확인해주세요');
      return;
    }
    if (cardInfoWarp.nameOnCard.value.length > 0) {
      setCardInfo('cardOwner', cardInfoWarp.nameOnCard.value);
    } else {
      alert('카드에 적힌 이름을 확인해주세요');
      return;
    }

    setCardInfo('company', cardInfoWarp.company.value);
  } else if (reqBody.getValue().paymentMethod.paymentType !== 'account') {
    alert('결제 수단을 선택해주세요.');
    return;
  }

  localStorage.setItem(
    'deliveryInfo',
    JSON.stringify({
      ...reqBody.getValue().receiver,
      totalPrice: reqBody.getValue().totalPrice,
      paymentType: reqBody.getValue().paymentMethod.paymentType,
    }),
  );
  localStorage.removeItem('orders');
  postPayment(userToken);
});

const postPayment = async (userToken) => {
  try {
    const res = await axios({
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      url: '/api/v1/orders/payment',
      data: reqBody.getValue(),
    });
    window.location.href = '/orders/payment/success/';
  } catch (err) {
    alert(err.status);
    if (err.status === 500) window.location.href = '/signin';
  }
};
