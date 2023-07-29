import { getToken } from '/lib/api/Token.js';

// 로그인 상태인 유저가 로그인, 회원가입페이지 접근 시 마이페이지로 리다이렉트
export const redirectToMyPageIfLoggedIn = () => {
  const { accessToken } = getToken();
  if (accessToken) {
    window.location.href = '/mypage';
  }
};

// 로그인 하지 않은 유저가 토큰이 필요한 페이지 접근 시 로그인페이지로 리다이렉트
export const redirectToSignInIfLoggedOut = () => {
  const { accessToken } = getToken();
  if (!accessToken) {
    window.location.href = '/signin';
  }
};
