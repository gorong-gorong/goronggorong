import { Router } from 'express';
import { productsController } from '../controllers';

const productsRouter = Router();

/**
 * 모든 상품, 카테고리 페이지네이션
 * 모든 상품: /api/v1?page=number&perPage=number
 * 카테고리별 상품: /api/v1?category=string&page=number&perPage=number
 */
productsRouter.get('/products', productsController.getProducts);

// 상품 상세 정보
productsRouter.get('/products/:id', productsController.getProductById);

export default productsRouter;
