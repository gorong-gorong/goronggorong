import { Router } from 'express';
import { viewService } from '../services/index.js';

const viewRouter = Router();

// 메인페이지
viewRouter.use('/', viewService.serveStatics('home'));

// 제품 상세페이지
viewRouter.use('/products', viewService.serveStatics('detail'));

// 카테고리별 상품 조회
viewRouter.use('/products/:category', viewService.serveStatics('category'));

// 로그인
viewRouter.use('/signin', viewService.serveStatics('sign-in'));

// 비밀번호 찾기
viewRouter.use('/signin/find-password', viewService.serveStatics('find-pw'));

// 회원가입
viewRouter.use('/signup', viewService.serveStatics('sign-up'));

// 주문 내역 목록
viewRouter.use('/mypage', viewService.serveStatics('mypage'));

// 비번 확인
viewRouter.use('/mypage/check-valid-user', viewService.serveStatics('check-valid-user'));

// 회원정보 수정
viewRouter.use('/mypage/edit-user-info', viewService.serveStatics('edit-user-info'));

// 장바구니
viewRouter.use('/orders/cart', viewService.serveStatics('cart'));

// 결제 페이지
viewRouter.use('/orders/payment', viewService.serveStatics('payment'));

// 결제 성공
viewRouter.use('/orders/payment/success', viewService.serveStatics('success'));

// 주문 상세 확인
viewRouter.use('/orders/:orderId', viewService.serveStatics('order-detail'));

// 주문 취소
viewRouter.use('/orders/:orderId/cancel-order', viewService.serveStatics('cancel'));

// 주문 취소 성공
viewRouter.use('/orders/:orderId/cancel-order/success', viewService.serveStatics('cancel-complete'));

// FOOTER, HEADER
viewRouter.use('/layouts', viewService.serveStatics('layouts'));

// 라이브러리
viewRouter.use('/lib', viewService.serveStatics('lib'));

export default viewRouter;
