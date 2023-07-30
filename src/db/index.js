import mongoose from 'mongoose';
import { createClient } from 'redis';

// Mongoose
mongoose.connect(process.env.DB_KEY);

const db = mongoose.connection;

db.on('connected', () => console.log('MongoDB Connected!'));
db.on('error', (err) => console.error('MongoDB Error', err));

// Redis
let redisClient = createClient({
  host: 'redis',
  port: 6379,
});

redisClient.on('connect', () => {
  console.log('Redis connected!');
});
redisClient.on('error', (error) => {
  console.error('Redis Client Error', error);
});

export { redisClient };
export * from './models';
