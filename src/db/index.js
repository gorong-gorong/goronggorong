import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { createClient } from 'redis';

// MongoDB
mongoose.connect(`${process.env.MONGODB_KEY}/${process.env.MONGODB_NAME}`);
const db = mongoose.connection;
db.on('connected', () => console.log('MongoDB Connected!'));
db.on('error', (err) => console.error('MongoDB Error', err));

async function insertProductData() {
  try {
  	const productsCollection = db.collection('products');

   	// product-data.json 파일 읽기
   	const filePath = path.join(__dirname, '../../data/product-data.json');
   	const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

   	// 데이터베이스에 데이터 삽입
   	const result = await productsCollection.insertMany(jsonData);
   	console.log(`MongoDB: Inserted ${result.insertedCount} records.`);

  } catch (error) {
    console.error('Error occurred:', error);
  }
}

insertProductData();

// Redis
let options = {};
if (process.env.NODE_ENV === 'production') {
  options = {
    url: process.env.REDIS_KEY,
  };
}
const redisClient = createClient(options);

(async () => {
  redisClient.on('connect', () => {
    console.log('Redis connected!');
  });
  redisClient.on('error', (error) => {
    console.error('Redis Client Error', error);
  });

  await redisClient.connect();
})();

export { redisClient };
export * from './models';
