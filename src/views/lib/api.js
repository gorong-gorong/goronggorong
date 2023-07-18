export async function getItemData() {
  try {
    const res = await axios({
      method: 'get',
      url: `/api/v1`,
    });

    return res.data.info;
  } catch (err) {
    alert(err.response.data.message);
  }
}

export async function getItemById(itemId) {
  try {
    const res = await axios({
      method: 'get',
      url: `/api/v1/products?id=${itemId}`,
    });

    return res.data.info;
  } catch (err) {
    alert(err.response.data.message);
  }
}

export async function getItemByCategory(category) {
  try {
    const res = await axios({
      method: 'get',
      url: `/api/v1/products/${category}`,
    });

    return res.data.info;
  } catch (err) {
    alert(err);
  }
}
