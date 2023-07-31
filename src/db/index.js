import mongoose from 'mongoose';
import { createClient } from 'redis';

// Mongoose
mongoose.connect('mongodb://mongodb:27017');

const db = mongoose.connection;

db.on('connected', () => console.log('MongoDB Connected!'));
db.on('error', (err) => console.error('MongoDB Error', err));

// Redis
let options = {};
if (process.env.NODE_ENV === 'production') {
  options = {
    url: 'redis://redis:6379',
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
