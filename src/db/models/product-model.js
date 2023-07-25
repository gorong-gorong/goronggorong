import { Product } from '../schemas';

const productModel = {
  // 페이지네이션에 해당하는 상품
  findProductsWithLimit: async function (page, perPage) {
    const productList = await Product.find({})
      .skip((page - 1) * perPage)
      .limit(perPage);

    return productList;
  },

  // 페이지네이션에 해당하는 카테고리별 상품
  findCategoryProductsWithLimit: async function (category, page, perPage) {
    const categoryProductList = await Product.find({
      category,
    })
      .skip((page - 1) * perPage)
      .limit(perPage);

    return categoryProductList;
  },

  // ID로 상품 검색
  findById: async function (id) {
    const foundProduct = await Product.findOne({ id });

    return foundProduct;
  },

  // 상품 개수 계산
  countProducts: async function () {
    const amount = await Product.countDocuments({});

    return amount;
  },

  // 카테고리별 상품 개수 계산
  countCategoryProducts: async function (category) {
    const amount = await Product.countDocuments({ category });

    return amount;
  },
};

export default productModel;
