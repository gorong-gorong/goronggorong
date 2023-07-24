import { StatusCodes } from 'http-status-codes';
import { customError } from '.';
import { jwtUtils } from '../utils';

const verifyToken = function (req, res, next) {
  try {
    const authHeader = req.header('Authorization');
    const token = authHeader ? authHeader.replace('Bearer ', '') : null;

    if (!token) {
      throw new customError(StatusCodes.UNAUTHORIZED, '토큰이 없습니다.');
    }

    req.decoded = jwtUtils.decodeToken(token);
    console.log('🪙  Token has been verified!');

    next();
  } catch (err) {
    next(err);
  }
};

export default verifyToken;
