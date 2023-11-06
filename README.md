# 🐕 반려동물용품 쇼핑몰: 고롱고롱 🐈

<div align="center">

https://github.com/gorong-gorong/goronggorong/assets/126763111/d971f48e-34e6-452b-a097-9d351f2c06e0


</div>

### 서비스 기획

- **페르소나:** 반려동물용품에 관심이 있는 사람
- **목적:** 반려동물용품을 잘 모르는 사람도 간편하고 쉽게 관련 제품을 구매 할 수 있는 온라인 쇼핑몰 서비스

### 기능

- 회원가입, 로그인, 로그아웃 등의 사용자 관련 기능
- 제품 목록과 제품 상세 정보 조회 기능
- 장바구니를 이용한 상품주문 기능
- 주문 내역 조회 및 취소 기능

### 데모 사이트

- [🔗 배포 사이트(http://www.goronggorong.store)](http://www.goronggorong.store/)
  | 테스트 아이디 | test@test.com | 
  | --- | --- |
  | **테스트 비밀번호** | **#test1234** |

- [🔗 API 문서(Swagger)](http://www.goronggorong.store/api-docs)

- **시연 영상** https://youtu.be/2-nOUlkWqxg

## Stacks

### FrontEnd

<div>
  <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white">
  <img alt="CSS" src="https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css3&logoColor=white">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white">
</div>

### BackEnd

<div>
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white">
  <img alt="Express" src="https://img.shields.io/badge/Express-000000?style=flat&logo=Express&logoColor=white">
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=MongoDB&logoColor=white">
  <img alt="Mongoose" src="https://img.shields.io/badge/Mongoose-880000?style=flat&logo=Mongoose&logoColor=white">
  <img alt="Babel" src="https://img.shields.io/badge/Babel-F9DC3E?style=flat&logo=Babel&logoColor=white">
  <img alt="Redis" src="https://img.shields.io/badge/Redis-DC382D?style=flat&logo=Redis&logoColor=white">
  <img alt="JWT" src="https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white">
  <img alt="Swagger" src="https://img.shields.io/badge/Swagger-85EA2D?style=flat&logo=Swagger&logoColor=white">
</div>

### Deploy

<div>
  <img alt="NGINX" src="https://img.shields.io/badge/NGINX-009639?style=flat&logo=NGINX&logoColor=white">
  <img alt="Docker" src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=Docker&logoColor=white">
  <img alt="AWS Lightsail" src="https://img.shields.io/badge/AWS Lightsail-E17107?style=flat&logoColor=white">
</div>

### Tools

<div>
  <img alt="Git" src="https://img.shields.io/badge/Git-F05032?style=flat&logo=Git&logoColor=white">
  <img alt="Notion" src="https://img.shields.io/badge/Notion-000000?style=flat&logo=Notion&logoColor=white">
</div>

## SetUp

### Requirement

<div>
  <img alt="Docker" src="https://img.shields.io/badge/Docker-24.0.7-2496ED?style=flat&logo=Docker&logoColor=white">
  <img alt="Docker Compose" src="https://img.shields.io/badge/Docker Compose-2.21.0-2496ED?style=flat&logo=Docker Compose&logoColor=white">
</div>

### Installation

```bash
$ git clone https://github.com/gorong-gorong/goronggorong.git
$ cd goronggorong

# 실행
$ docker compose up

# 종료
$ docker compose down
```

### 환경변수

```
PORT=
HOST=
NODE_ENV=

# MongoDB
MONGODB_NAME=
MONGODB_KEY=

# Redis
REDIS_KEY=

# Token
REFRESH_TOKEN_SECRET_KEY=
REFRESH_TOKEN_EXPIRE=
REFRESH_REDIS_EXPIRE=

ACCESS_TOKEN_SECRET_KEY=
ACCESS_TOKEN_EXPIRE=

ISSUER=
```

## Architecture

<div align="center">

![Goronggorong Architecture](https://github.com/gorong-gorong/goronggorong/assets/67633810/0a0df318-2a8e-4609-afe1-e8272bfc393d)

</div>

```
.
├── data
├── deploy
│   ├── nginx
│   └── node
├── public
│   ├── 404
│   └── img
└── src
    ├── controllers
    ├── db
    │   ├── models
    │   └── schemas
    ├── middlewares
    ├── routes
    ├── services
    ├── swagger
    │   ├── components
    │   └── paths
    ├── utils
    └── views
        ├── cart
        ├── check-valid-user
        ├── detail
        ├── home
        ├── layouts
        ├── lib
        │   ├── api
        │   └── utils
        ├── mypage
        ├── order-detail
        ├── payment
        ├── reset-password
        ├── sign-in
        ├── sign-up
        ├── update-password
        └── update-user-info
```
