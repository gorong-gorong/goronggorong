import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { customError } from '../middlewares';

const tokenHandler = {
  // 엑세스 토큰 만료 확인 및 디코딩
  verifyAccessToken: function (req, res, next) {
    try {
      const authHeader = req.header('Authorization');
      const accessToken = authHeader ? authHeader.replace('Bearer ', '') : null;

      if (!accessToken) {
        throw new customError(StatusCodes.UNAUTHORIZED, '토큰이 없습니다.');
      }

      const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedAccessToken.exp >= currentTime) {
        throw new customError(StatusCodes.UNAUTHORIZED, '토큰을 새로 발급받아주세요.', true);
      }

      req.decoded = decodedAccessToken;
      console.log('🪙  Token has been verified!');

      next();
    } catch (err) {
      next(err);
    }
  },

  // Access Token 생성
  createAccessToken: function (user) {
    const newAccessToken = jwt.sign(
      {
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      {
        issuer: process.env.ISSUER,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
      },
    );

    return newAccessToken;
  },

  // Refresh Token 생성
  createRefreshToken: function () {
    const refreshId = ''; // uuid
    const newRefreshToken = jwt.sign(
      {
        type: 'refresh',
        refreshId,
      },
      process.env.REFRESH_TOKEN_SECRET_KEY,
      {
        issuer: process.env.ISSUER,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
      },
    );

    return newRefreshToken;
  },
};

export default tokenHandler;
