import express from 'express';
import dotenv from 'dotenv/config';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import { httpLogStream } from './utils';
import router from './routes';
import { errorHandler } from './middlewares';

const app = express();

const port = process.env.PORT || 3000;

// Middlewares
const allowedOrigins = ['http://localhost', 'http://goronggorong.store'];
const corsOptions = {
  origin: allowedOrigins,
  exposeHeaders: ['Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(morgan('dev', { stream: httpLogStream }));

// Swagger
const swaggerSpec = yaml.load(path.join(__dirname, '../build/build.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Connected to ${port}...`);
});
