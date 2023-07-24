import jwt from 'jsonwebtoken';

const jwtUtils = {
  // 토큰 생성
  createToken: function (user) {
    const newToken = jwt.sign(
      {
        _id: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.SECRET_KEY,
      {
        issuer: process.env.ISSUER,
      },
    );

    return newToken;
  },

  // 토큰 Decoding
  decodeToken: function (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    return decodedToken;
  },
};

export default jwtUtils;
