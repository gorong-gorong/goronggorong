import path from 'path';
import swaggerUi from 'swagger-ui-express';
// import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    // swagger 정보
    info: {
      version: '1.0.0',
      title: '고롱고롱 API',
      description: 'API 문서 사이트입니다.',
    },
    // 기본 루트 경로
    host: 'localhost:3000',
    basePath: '/api/v1',
  },
  // 라우트 경로(API 위치)
  apis: ['./src/routes/*.js'],
};

// const specs = swaggerJSDoc(options);

// export { swaggerUi, specs };
