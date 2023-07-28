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
    if (error.response) {
      alert(error.response.data.message);
      const { status } = error.response;
      throw new Error(status);
    } else {
      alert(error.message);
    }
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
