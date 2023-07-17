import path from 'path';

const swaggerDefinition = {
  // swagger 정보
  info: {
    title: '고롱고롱 API',
    version: '1.0.0',
    description: 'API 문서 사이트입니다.',
  },
  // 기본 루트 경로
  basePath: '/api',
  // 모든 API에 대한 공통 정의
  components: {
    res: {
      Forbidden: { description: '권한이 없습니다.' },
      NotFound: { description: '존재하지 않는 정보입니다.' },
    },
  },
  // 사용 가능한 통신 방식
  schemes: ['http'],
};

export default {
  swaggerDefinition,
  // 라우트 경로(API 위치)
  apis: [path.join(__dirname + '/../routes/*.js')],
};
