import { Router } from 'express';
import { productController } from '../controllers/index.js';
const router = Router();

// 제품 불러오기 API
// pagination 추가 (예시 : api/?skip=0&limit=20 )
router.get('/', productController.getProducts);
router.get('/products/:category', productController.getProductsByCategory);
router.get('/products', productController.getProductById);

// 제품 등록 API
router.post('/products/add', productController.addProduct);

// 제품 수정 API
router.put('/products/:category/:id', productController.setProduct);

// 제품 삭제 API
router.delete('/products/:category/:id', productController.deleteProduct);

export { router as productRouter };
