import { Router } from 'express';
import { productController } from '../controllers/index.js';

const productRouter = Router();

// 제품 불러오기 API
// pagination 추가 (예시 : api/?skip=0&limit=20 )
productRouter.get('/', productController.getProducts);
productRouter.get('/products/:category', productController.getProductsByCategory);
productRouter.get('/products', productController.getProductById);

// 제품 등록 API
productRouter.post('/products/add', productController.addProduct);

// 제품 수정 API
productRouter.put('/products/:category/:id', productController.setProduct);

// 제품 삭제 API
productRouter.delete('/products/:category/:id', productController.deleteProduct);

export default productRouter;
