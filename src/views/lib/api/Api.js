import { getToken, setAccessToken } from '/lib/api/Token.js';

// axios 인스턴스 생성 -> axios.create([config])
const api = axios.create({
  baseURL: '/api/v1',
});

// 요청 인터셉터 설정
api.interceptors.request.use(
  async (config) => {
    // 요청 헤더에 토큰 추가
    const { accessToken, refreshToken } = getToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    config.headers['x-refresh-token'] = refreshToken;

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터 설정
api.interceptors.response.use(
  (response) => {
    // 요청 url이 signin이거나 tokens인 경우 헤더값을 리턴
    if (response.config.url === 'auth/signin' || response.config.url === 'auth/tokens') {
      return response.headers;
    }
    // 기타 요청들은 data.data값을 리턴
    return response.data.data;
  },

  async (error) => {
    const originalRequest = error.config;
    // 토큰 만료로 인한 401 에러인 경우 에러 처리
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // 액세스 토큰 갱신 요청
        const response = await api.post('auth/tokens');
        // 새로운 토큰 저장
        setAccessToken(response);

        // 원래 요청 다시 시도
        return api(originalRequest);
      } catch (error) {
        // 토큰 갱신에 실패한 경우 처리
        alert('일정 시간이 지나 로그아웃되었습니다. 다시 로그인해주세요🔐');
        window.location.href = '/signin';

        return Promise.reject(error);
      }
    }

    // 다른 에러인 경우 에러 메세지 알림
    alert(error.response.data.message);
    return Promise.reject(error);
  },
);

export default api;
