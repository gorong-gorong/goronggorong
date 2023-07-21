import { Router } from 'express';
import { productsController } from '../controllers';

const productsRouter = Router();

// 페이지네이션 -> 나중에 /products
// pagination 추가 (예시 : api/v1?page=1&perPage=20, api/v1?category=Food&page=1&perPage=20)
productsRouter.get('/products', productsController.getProducts);

// 카테고리별 상품 불러오기 -> 페이지네이션 때문에 나중에 /products?category
// productsRouter.get('/products/:category', productsController.getProductsByCategory);

// 상품 상세 정보 -> 나중에 /products/:id
productsRouter.get('/products/:id', productsController.getProductById);

// 관리자: 제품 수정 -> 나중에 /products/:id
// productsRouter.put('/products/:category/:id', productsController.setProduct);

// 관리자: 제품 삭제 -> 나중에 /products/:id
// productsRouter.delete('/products/:category/:id', productsController.deleteProduct);

// 관리자: 제품 등록
// productRouter.post('/products/add', productController.addProduct);

export default productsRouter;
