import express from 'express';
import { viewService } from '../services/index.js';

const router = express.Router();

// PRODUCT
router.use('/', viewService.serveStatics('home')); // 메인페이지
router.use('/products', viewService.serveStatics('detail')); // /products?id=0000
router.use('/products/:category', viewService.serveStatics('category')); // 카테고리별 상품 조회

// SIGN
router.use('/signin', viewService.serveStatics('sign-in')); // 로그인
router.use('/signin/find-password', viewService.serveStatics('find-pw')); // 비밀번호 찾기
router.use('/signup', viewService.serveStatics('sign-up')); // 회원가입

// MYPAGE
router.use('/mypage', viewService.serveStatics('mypage')); // 주문 내역 목록
router.use('/mypage/check-valid-user', viewService.serveStatics('check-valid-user')); // 비번 확인
router.use('/mypage/edit-user-info', viewService.serveStatics('edit-user-info')); // 회원정보 수정

// ORDER
router.use('/orders/cart', viewService.serveStatics('cart')); // 장바구니
router.use('/orders/payment', viewService.serveStatics('payment')); // 결제 페이지
router.use('/orders/payment/success', viewService.serveStatics('success')); // 결제 성공
router.use('/orders/:orderId', viewService.serveStatics('order-detail')); // 주문 상세 확인
router.use('/orders/:orderId/cancel-order', viewService.serveStatics('cancel')); // 주문 취소
router.use('/orders/:orderId/cancel-order/success', viewService.serveStatics('cancel-complete')); // 주문 취소 성공

// FOOTER, HEADER
router.use('/layouts', viewService.serveStatics('layouts')); // footer, header

export { router as viewRouter };
