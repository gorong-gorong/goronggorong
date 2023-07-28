import { getToken } from '/lib/Token.js';

async function request({ endpoint, method, params = '', data = {} }) {
  const apiUrl = params ? `${endpoint}/${params}` : endpoint;
  const { accessToken, refreshToken } = getToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: accessToken ? `Bearer ${accessToken}` : null,
    'x-refresh-token': refreshToken,
  };

  try {
    let response;
    switch (method) {
      case 'GET':
        response = await axios.get(apiUrl, { headers });
        break;

      case 'POST':
        response = await axios.post(apiUrl, data, { headers });
        break;

      case 'PUT':
        response = await axios.put(apiUrl, data, { headers });
        break;

      case 'DELETE':
        response = await axios.delete(apiUrl, { headers });
        break;

      default:
        throw new Error('잘못된 메소드 접근입니다.');
    }

    if (params === 'auth/signin') {
      return response.headers;
    }
    return response.data.data;
  } catch (error) {
    if (error.response.data.isTokenNeedRefresh) {
      alert('일정 시간이 지나 자동으로 로그아웃되었어요. 다시 로그인해주세요🔐');
      window.location.href = '/signin';
    }
    alert(error.response.data.message);
  }
}

export async function Get(endpoint, params = '') {
  return await request({ endpoint, method: 'GET', params });
}

export async function Post(endpoint, params = '', data) {
  return await request({ endpoint, method: 'POST', params, data });
}

export async function Put(endpoint, params = '', data) {
  return await request({ endpoint, method: 'PUT', params, data });
}

export async function Delete(endpoint, params = '', data) {
  return await request({ endpoint, method: 'DELETE', params, data });
}
