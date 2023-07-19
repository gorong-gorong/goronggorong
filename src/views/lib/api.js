async function request({ endpoint, method, params = '', data = {} }) {
  const apiUrl = params ? `${endpoint}/${params}` : endpoint;
  const userToken = localStorage.getItem('userToken');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken ? `Bearer ${userToken}` : null,
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
        response = await axios.delete(apiUrl, data, { headers });
        break;

      default:
        throw new Error('잘못된 메소드 접근입니다.');
    }

    if (params === 'auth/signin' || params === '/mypage/edit-user-info') {
      return response.data.data.token;
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
