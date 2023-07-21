import { Product } from '../schemas/index.js';

const productModel = {
  // 상품 Document 생성
  create: async (productInfo) => {
    const newProduct = await Product.create(productInfo);

    return newProduct;
  },

  // 페이지네이션에 해당하는 상품
  findProductsWithLimit: async function (page, perPage) {
    const productList = await Product.find({})
      .skip((page - 1) * perPage)
      .limit(perPage);

    return productList;
  },

  // 페이지네이션에 해당하는 카테고리별 상품
  findCategoryProductsWithLimit: async (category, page, perPage) => {
    const categoryProductList = await Product.find({
      category,
    })
      .skip((page - 1) * perPage)
      .limit(perPage);

    return categoryProductList;
  },

  findById: async (id) => {
    const foundProduct = await Product.findOne({ id });

    return foundProduct;
  },

  findByName: async (name) => {
    const foundProduct = await Product.findOne({ name });

    return foundProduct;
  },

  update: async (id, update) => {
    const updatedProduct = await Product.findOneAndUpdate({ id: id }, update, { new: true });

    return updatedProduct;
  },

  delete: async (id) => {
    const deletedProduct = await Product.findOneAndDelete({ id: id }, { returnOriginal: false });

    return deletedProduct;
  },

  countProducts: async function () {
    const amount = await Product.countDocuments({});

    return amount;
  },

  countCategoryProducts: async function (category) {
    const amount = await Product.countDocuments({ category });

    return amount;
  },
};

export default productModel;
