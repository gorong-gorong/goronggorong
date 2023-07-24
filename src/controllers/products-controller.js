import { StatusCodes } from 'http-status-codes';
import { productsService } from '../services';

const productsController = {
  // get /products
  getProducts: async function (req, res, next) {
    try {
      const { category, page, perPage } = req.query;
      const productList = await productsService.pagination(category, page, perPage);
      const productListAmount = productList.length;
      const totalProductsAmount = await productsService.calculateTotalProductsAmount(category);

      res.status(StatusCodes.OK).json({
        message: `${page}페이지의 ${productListAmount}개의 상품을 불러왔습니다.`,
        data: {
          productList,
          totalProductsAmount,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  // get /products/:id
  getProductById: async function (req, res, next) {
    try {
      const { id } = req.params;
      const product = await productsService.searchProduct(id);

      res.status(StatusCodes.OK).json({
        message: '해당 아이디 상품을 불러왔습니다.',
        data: { product },
      });
    } catch (err) {
      next(err);
    }
  },
};

export default productsController;
