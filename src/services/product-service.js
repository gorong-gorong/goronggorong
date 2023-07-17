import { productModel } from '../db/index.js';
import { customError } from '../middlewares/index.js';

const productService = {
  checkSkipLimit: async (skip, limit) => {
    const products = await productModel.findAll(parseInt(skip), parseInt(limit));
    if (parseInt(skip) >= parseInt(limit) || products.slice(skip, limit).length === 0) {
      throw new customError(400, '잘못된 목록 설정입니다');
    }
    return products;
  },
  checkCategory: async (category) => {
    if (!['Food', 'Snack', 'Toy', 'Toilet', 'Fashion'].includes(category)) {
      throw new customError(400, '잘못된 카테고리 입니다');
    }
    const products = await productModel.findByCategory(category);
    if (!products) {
      throw new customError(400, '해당 상품이 존재하지 않습니다');
    }
    return products;
  },

  checkId: async (id) => {
    const product = await productModel.findById(id);
    if (!product) {
      throw new customError(400, '해당 상품이 존재하지 않습니다');
    }
    return product;
  },

  addNewProduct: async (id, category, name, price, description, amount, imgUrl) => {
    const requiredKeys = ['id', 'category', 'name', 'price', 'description', 'amount', 'imgUrl'];
    // req.body 엔 필수 속성이 다 있어야 함
    if (
      !requiredKeys.every((key) =>
        Object.keys({ id, category, name, price, description, amount, imgUrl }).includes(key),
      )
    ) {
      // 모든 필수 키 값이 존재하지 않으면
      throw new customError(400, '등록할 내용을 모두 작성해주세요');
    }
    // 이외 json 데이터는 mongodb에 저장
    const productSameId = await productModel.findById(id);
    const productSameName = await productModel.findByName(name);
    if (productSameId) {
      throw new customError(400, '이미 존재하는 id 입니다');
    }
    if (!['Food', 'Snack', 'Toy', 'Toilet', 'Fashion'].includes(category)) {
      throw new customError(400, '잘못된 카테고리 입니다');
    }
    if (productSameName) {
      throw new customError(400, '이미 존재하는 name 입니다');
    }
    const newProduct = await productModel.create({
      id,
      category,
      name,
      price,
      description,
      amount,
      imgUrl,
    });
    return newProduct;
  },

  setExistProduct: async (id, category, name, price, description, amount, imgUrl) => {
    // 앞에 카테고리 대문자
    const requiredKeys = ['category', 'name', 'price', 'description', 'amount', 'imgUrl'];
    // req.body 엔 id 빼고 다 있어야 함
    if (
      !requiredKeys.every((key) => Object.keys({ category, name, price, description, amount, imgUrl }).includes(key))
    ) {
      // 모든 필수 키 값이 존재하지 않으면
      throw new customError(400, '수정할 내용을 모두 작성해주세요');
    }

    const product = await productModel.findById(id);
    const productSameName = await productModel.findByName(name);

    if (!product) {
      throw new customError(400, '수정할 상품이 존재하지 않습니다');
    }
    if (!['Food', 'Snack', 'Toy', 'Toilet', 'Fashion'].includes(category)) {
      throw new customError(400, '잘못된 카테고리 입니다');
    }
    if (productSameName) {
      throw new customError(400, '이미 존재하는 name 입니다');
    }

    const updatedProduct = await productModel.update(id, { category, name, price, description, amount, imgUrl });
    return updatedProduct;
  },

  deleteExistProduct: async (id) => {
    const productToDelete = await productModel.findById(id);
    if (!productToDelete) {
      throw new customError(400, '수정할 상품이 존재하지 않습니다');
    }
    const deletedProduct = await productModel.delete(id);
    return deletedProduct;
  },
};

export default productService;
