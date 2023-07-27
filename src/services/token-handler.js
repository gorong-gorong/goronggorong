import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';
import { customError } from '../middlewares';

const tokenHandler = {
  // Access Token 유효성 검사 및 디코딩
  verifyAccessToken: function (req, res, next) {
    try {
      const authHeader = req.header('Authorization');
      const accessToken = authHeader ? authHeader.replace('Bearer ', '') : null;

      // Redis blacklist에서 검사해줘야 함.

      if (!accessToken) {
        throw new customError(StatusCodes.UNAUTHORIZED, 'Access Token이 없습니다.');
      }

      const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedAccessToken.exp <= currentTime) {
        throw new customError(StatusCodes.UNAUTHORIZED, 'Access Token을 새로 발급받아주세요.', true);
      }

      req.decoded = decodedAccessToken;
      console.log('🪙 Access Token has been verified!\n');

      next();
    } catch (err) {
      next(err);
    }
  },

  // Refresh Token 유효성 검사 및 만료일 검사
  verifyRefreshToken: function (req, res, next) {
    try {
      const authHeader = req.header('X-Refresh-Token');
      const refreshToken = authHeader ? authHeader.replace('Bearer ', '') : null;

      if (!refreshToken) {
        throw new customError(StatusCodes.UNAUTHORIZED, 'Refresh Token이 없습니다.');
      }

      // Redis에서 refreshToken 확인해줘야 함
      // 없으면 새로 로그인하라고 보내줘야 함
    } catch (err) {
      next(err);
    }
  },

  // Access Token 생성
  createAccessToken: function (data) {
    const newAccessToken = jwt.sign(
      {
        email: data.email,
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
  // 생성과 동시에 redis에 저장
  createRefreshToken: function () {
    const refreshId = new ObjectId().toString('hex'); // uuid
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
