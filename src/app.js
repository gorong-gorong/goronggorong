import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import { httpLogStream } from './utils';
import router from './routes';
import { errorHandler } from './middlewares';

const app = express();
const allowedOrigins = ['http://localhost', 'http://goronggorong.store'];
const corsOptions = {
  origin: allowedOrigins,
  exposeHeaders: ['Authorization'],
};

// ENV
const rootDir = path.join(__dirname, '..');
process.chdir(rootDir);
dotenv.config();
process.chdir(__dirname);

const port = process.env.PORT || 3000;

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(rootDir + '/public')); // public 폴더 접근
app.use(morgan('dev', { stream: httpLogStream })); // Log 생성기

// Swagger
const swaggerSpec = yaml.load(path.join(__dirname, '../build/build.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Database
mongoose.connect(process.env.DB_KEY);
const db = mongoose.connection;
db.on('connected', () => console.log('Connecting DB Success'));
db.on('error', (err) => console.error(err));

// Routes
app.use(router);
app.use(errorHandler);

// app.listen(port, process.env.HOST, () => {
app.listen(port, () => {
  console.log(`Connected to ${port}...`);
});
