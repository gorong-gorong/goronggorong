import axios from 'axios';

export const getItemData = async () => {
  try {
    const res = await axios.get('/api/v1');
    return res.data.info;
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const getItemById = async (itemId) => {
  try {
    const res = await axios.get(`/api/v1/products?id=${itemId}`);
    return res.data.info;
  } catch (err) {
    alert(err.response.data.message);
  }
};
