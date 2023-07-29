FROM node:18.12.0

# 작업 디렉토리 생성 및 설정
WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]

