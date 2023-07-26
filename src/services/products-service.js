import { StatusCodes } from 'http-status-codes';
import { productModel } from '../db';
import { customError } from '../middlewares';

const productsService = {
  // 페이지네이션(모든 상품, 카테고리별)
  pagination: async function (category, page, perPage) {
    [page, perPage] = [Number(page), Number(perPage)];
    let productList;

    if (category) {
      productList = await productModel.findCategoryProductsWithLimit(category, page, perPage);
    } else {
      productList = await productModel.findProductsWithLimit(page, perPage);
    }

    if (!productList) {
      throw new customError(StatusCodes.BAD_REQUEST, '상품을 불러오는데 실패했습니다.');
    }

    return productList;
  },

  // 총 상품 수량 계산
  calculateTotalProductsAmount: async function (category) {
    let totalProductsAmount = 0;

    if (category) {
      totalProductsAmount = productModel.countCategoryProducts(category);
    } else {
      totalProductsAmount = productModel.countProducts();
    }

    return totalProductsAmount;
  },

  // 상품 검색
  searchProduct: async function (productId) {
    const product = await productModel.findById(productId);

    return product;
  },
};

export default productsService;
