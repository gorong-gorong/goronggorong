import { StatusCodes } from 'http-status-codes';
import { productModel } from '../db';
import { customError } from '../middlewares';
import { productsService } from '../services';

const productsController = {
  // /products
  getProducts: async (req, res, next) => {
    try {
      // /api/v1?page=number&perPage=number
      // /api/v1?category=string&page=number&perPage=number
      const { category, page, perPage } = req.query;
      const productList = await productsService.pagination(category, page, perPage);
      const productAmount = productList.length;
      const maxPage = await productsService.calculateMaximumPage(category);

      res.status(StatusCodes.OK).json({
        message: `${page}페이지의 ${productAmount}개의 상품을 불러왔습니다.`,
        data: {
          productList,
          maxPage,
        },
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
      const product = await productsService.checkId(id);
      res.status(200).json({
        message: '해당 아이디 제품을 불러왔습니다',
        data: product,
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
      const newProduct = await productsService.addNewProduct(id, category, name, price, description, amount, imgUrl);
      // 이미지 추가 기능을 넣는다면 addProduct({...req.body, imgUrl: 'gcp url'})
      // 이런식으로 되어야 해서 imgUrl이 productInfo 가장 끝에 와야 할 듯
      res.status(200).json({
        message: '새로운 제품 등록을 완료했습니다',
        data: newProduct,
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

      const updatedProduct = await productsService.setExistProduct(
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
        data: updatedProduct,
      });
    } catch (err) {
      next(err);
    }
  },

  //기존 상품 삭제
  deleteProduct: async (req, res, next) => {
    try {
      const { id } = req.params;

      const deletedProduct = await productsService.deleteExistProduct(id);

      res.status(200).json({
        message: '해당 제품 삭제를 완료했습니다',
        data: deletedProduct,
      });
    } catch (err) {
      next(err);
    }
  },
};

export default productsController;
