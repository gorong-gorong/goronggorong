import { productModel } from '../db/index.js';
import { customError } from '../middlewares/index.js';
import { productService } from '../services/index.js';

const productController = {
  // 모든 제품 목록 불러오기
  getProducts: async (req, res, next) => {
    try {
      // 한 페이지 기본값 설정
      const { skip, limit } = req.query; // /api/?skip=0&limit=20
      const products = await productService.checkSkipLimit(skip, limit);
      res.status(200).json({
        message: `전체 제품 목록 ${parseInt(skip) + 1} id 부터 ${parseInt(limit)} id 까지 불러왔습니다.`,
        info: products.slice(skip, limit),
      });
    } catch (err) {
      next(err);
    }
  },
  // 카테고리에 해당하는 모든 제품 불러오기
  getProductsByCategory: async (req, res, next) => {
    try {
      // category 해당하는 제품 찾기
      const { category } = req.params;
      const products = await productService.checkCategory(category);
      res.status(200).json({
        message: '선택한 카테고리에 해당하는 제품 목록을 불러왔습니다',
        info: products,
      });
    } catch (err) {
      next(err);
    }
  },
  // id 에 해당하는 제품 불러오기
  getProductById: async (req, res, next) => {
    try {
      // 아이디로 찾아서 JSON 으로 프론트에 쏴주기
      const { id } = req.query;
      const product = await productService.checkId(id);
      res.status(200).json({
        message: '해당 아이디 제품을 불러왔습니다',
        info: product,
      });
    } catch (err) {
      next(err);
    }
  },
  // 새로운 상품 등록하기
  addProduct: async (req, res, next) => {
    try {
      // 객체 destructuring
      const { id, category, name, price, description, amount, imgUrl } = req.body;
      const newProduct = await productService.addNewProduct(id, category, name, price, description, amount, imgUrl);
      // 이미지 추가 기능을 넣는다면 addProduct({...req.body, imgUrl: 'gcp url'})
      // 이런식으로 되어야 해서 imgUrl이 productInfo 가장 끝에 와야 할 듯
      res.status(200).json({
        message: '새로운 제품 등록을 완료했습니다',
        info: newProduct,
      });
    } catch (err) {
      next(err);
    }
  },

  //기존 상품 수정
  setProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { category, name, price, description, amount, imgUrl } = req.body;

      const updatedProduct = await productService.setExistProduct(
        id,
        category,
        name,
        price,
        description,
        amount,
        imgUrl,
      );
      res.status(200).json({
        message: '해당 제품 수정을 완료했습니다',
        info: updatedProduct,
      });
    } catch (err) {
      next(err);
    }
  },

  //기존 상품 삭제
  deleteProduct: async (req, res, next) => {
    try {
      const { id } = req.params;

      const deletedProduct = await productService.deleteExistProduct(id);

      res.status(200).json({
        message: '해당 제품 삭제를 완료했습니다',
        info: deletedProduct,
      });
    } catch (err) {
      next(err);
    }
  },
};

export default productController;
