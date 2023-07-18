import { customError } from './index.js';
import { authService } from '../services/index.js';

const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');

  try {
    if (!authHeader) {
      throw new customError(401, 'Authorization 헤더가 없습니다.');
    }

    req.decoded = authService.decodeToken(authHeader);

    console.log('🪙  Token has been verified!');

    next();
  } catch (err) {
    next(err);
  }
};

export default verifyToken;
