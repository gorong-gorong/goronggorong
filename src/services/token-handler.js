import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';
import { customError } from '../middlewares';
import { redisClient } from '../db';

const tokenHandler = {
  /** MiddleWares */
  // Access Token 유효성 검사 및 디코딩
  verifyAccessToken: async function (req, res, next) {
    try {
      const authHeader = req.header('Authorization');
      const accessToken = authHeader ? authHeader.replace('Bearer ', '') : null;
      if (!accessToken) {
        throw new customError(StatusCodes.UNAUTHORIZED, 'Access Token이 없습니다.');
      }

      // Redis blacklist에서 검사(bl_accessToken)
      const isBlacklist = await redisClient.get(`bl_${accessToken}`);
      if (isBlacklist) {
        throw new customError(StatusCodes.UNAUTHORIZED, 'Access Token을 새로 발급받아주세요.', true);
      }

      // Access Token 만료됐는지 확인
      const decodedAccessToken = jwt.decode(accessToken);
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
  verifyRefreshToken: async function (req, res, next) {
    try {
      const authHeader = req.header('X-Refresh-Token');
      const refreshToken = authHeader ? authHeader.replace('Bearer ', '') : null;

      if (!refreshToken) {
        throw new customError(StatusCodes.UNAUTHORIZED, 'Refresh Token이 없습니다.');
      }

      // Redis에서 refreshToken 유효성 확인
      const { refreshId } = jwt.decode(refreshToken);
      const isValid = await redisClient.get(`refresh_${refreshId}`);
      if (!isValid) {
        throw new customError(StatusCodes.UNAUTHORIZED, '새로 로그인 해주세요.', true);
      }

      next();
    } catch (err) {
      next(err);
    }
  },

  /** Services */
  // 만료시 새로운 Access Token 발급
  getNewAccessToken: function (req, res, next) {
    try {
      const authHeader = req.header('Authorization');
      const accessToken = authHeader ? authHeader.replace('Bearer ', '') : null;

      const { email: userEmail } = jwt.decode(accessToken);
      const newAccessToken = tokenHandler.createAccessToken(userEmail);

      res.header('Authorization', `Bearer ${newAccessToken}`);

      res.status(StatusCodes.OK).json({
        message: '새 Access Token을 발급했습니다.',
      });
    } catch (err) {
      next(err);
    }
  },

  // Refresh Token: Redis 삭제, Access Token: 블랙리스트 추가
  deleteTokens: async function (req, res, next) {
    try {
      // Refresh Token Redis 삭제
      let authHeader = req.header('X-Refresh-Token');
      const refreshToken = authHeader ? authHeader.replace('Bearer ', '') : null;

      const { refreshId } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
      const refreshTokenKey = `refresh_${refreshId}`;
      await redisClient.del(refreshTokenKey);

      // Access Token Blacklist
      authHeader = req.header('Authorization');
      const accessToken = authHeader ? authHeader.replace('Bearer ', '') : null;

      const { exp } = jwt.decode(accessToken);
      const currentTime = Math.floor(Date.now() / 1000);
      if (exp >= currentTime) {
        const accessTokenKey = `bl_${accessToken}`;
        const expireTime = exp - currentTime;

        await redisClient.set(accessTokenKey, accessToken);
        await redisClient.expire(accessTokenKey, expireTime);
      }

      res.status(StatusCodes.OK).json({
        message: '토큰을 차단했습니다.',
      });
    } catch (error) {
      next(error);
    }
  },

  // Access Token 생성
  createAccessToken: function (userEmail) {
    const newAccessToken = jwt.sign(
      {
        email: userEmail,
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
  createRefreshToken: async function () {
    const refreshId = new ObjectId().toString('hex');
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

    // Redis에 저장(만료기간 설정)
    const refreshTokenKey = `refresh_${refreshId}`;
    const result1 = await redisClient.set(refreshTokenKey, newRefreshToken);
    const result2 = await redisClient.expire(refreshTokenKey, Number(process.env.REFRESH_REDIS_EXPIRE));
    if (!result1 || !result2) {
      throw new customError(StatusCodes.BAD_REQUEST, 'Redis 저장 실패');
    }

    return newRefreshToken;
  },

  // Refresh, Access Token 생성
  signToken: async function (userEmail) {
    const refreshToken = await tokenHandler.createRefreshToken();
    const accessToken = tokenHandler.createAccessToken(userEmail);

    return { refreshToken, accessToken };
  },
};

export default tokenHandler;
