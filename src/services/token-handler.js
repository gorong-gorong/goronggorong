import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { customError } from '.';

const tokenHandler = {
  // 엑세스 토큰 만료 확인 및 디코딩
  verifyAccessToken: function (req, res, next) {
    try {
      const authHeader = req.header('Authorization');
      const accessToken = authHeader ? authHeader.replace('Bearer ', '') : null;

      if (!accessToken) {
        throw new customError(StatusCodes.UNAUTHORIZED, '토큰이 없습니다.');
      }

      req.decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
      console.log('🪙  Token has been verified!');

      next();
    } catch (err) {
      next(err);
    }
  },

  // 토큰 생성
  createAccessToken: function (user) {
    const newAccessToken = jwt.sign(
      {
        // _id: user.id,
        // name: user.name,
        email: user.email,
      },
      process.env.ACCESS_SECRET_KEY,
      {
        issuer: process.env.ISSUER,
      },
    );

    return newAccessToken;
  },
};

export default tokenHandler;
