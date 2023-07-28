// 액세스 토큰과 리프레시 토큰을 브라우저에 저장
export function setToken(responseHeaders) {
  const accessToken = responseHeaders.authorization.split(' ')[1]; // Bearer 제외
  const refreshToken = responseHeaders['x-refresh-token'];

  localStorage.setItem('accessToken', accessToken);
  document.cookie = `refreshToken=${refreshToken}; path=/`;
}

// 브라우저에 저장된 토큰 값 가져오기
export function getToken() {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = getCookieValue('refreshToken');

  return { accessToken, refreshToken };
}

// key값으로 해당쿠키를 찾아서 value값을 리턴
function getCookieValue(cookieKey) {
  const cookieList = document.cookie.split('; ');
  const cookie = cookieList.find((cookie) => cookie.startsWith(`${cookieKey}=`));

  if (cookie) {
    return cookie.split('=')[1];
  }
  return null;
}

// 브라우저에 저장된 토큰 삭제
export function removeToken() {
  localStorage.removeItem('accessToken');
  document.cookie = `refreshToken=; path=/`;
}
