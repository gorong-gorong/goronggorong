import { Router } from 'express';
import { serveStatics } from '../utils';
import path from 'path';
const viewsRouter = Router();

// 메인페이지
viewsRouter.use('/', serveStatics('home'));

// 제품 상세페이지
viewsRouter.use('/products', serveStatics('detail'));

// 카테고리별 상품 조회
viewsRouter.use('/products/:category', serveStatics('category'));

// 로그인
viewsRouter.use('/signin', serveStatics('sign-in'));

// 비밀번호 찾기
viewsRouter.use('/signin/reset-password', serveStatics('reset-password'));

// 회원가입
viewsRouter.use('/signup', serveStatics('sign-up'));

// 주문 내역 목록
viewsRouter.use('/mypage', serveStatics('mypage'));

// 비번 확인
viewsRouter.use('/mypage/check-valid-user', serveStatics('check-valid-user'));

// 회원정보 수정
viewsRouter.use('/mypage/update-user-info', serveStatics('update-user-info'));

// 비밀번호 변경
viewsRouter.use('/mypage/update-password', serveStatics('update-password'));

// 장바구니
viewsRouter.use('/orders/cart', serveStatics('cart'));

// 결제 페이지
viewsRouter.use('/orders/payment', serveStatics('payment'));

// 주문 상세 확인
viewsRouter.use('/orders/:orderId', serveStatics('order-detail'));

// 주문 취소
viewsRouter.use('/orders/:orderId/cancel-order', serveStatics('cancel'));

// 주문 취소 성공
viewsRouter.use('/orders/:orderId/cancel-order/success', serveStatics('cancel-complete'));

// FOOTER, HEADER
viewsRouter.use('/layouts', serveStatics('layouts'));

// 라이브러리
viewsRouter.use('/lib', serveStatics('lib'));

// 404 페이지
viewsRouter.use(function (req, res, next) {
  res.status(404).sendFile(path.join(__dirname, '../../public/404/404.html'));
});

export default viewsRouter;
