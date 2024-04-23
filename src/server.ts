import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import { AppDataSource } from './connections/database/data-source';
import cors from 'cors';
import routes from './routes/routes';
import { rateLimitRequest } from './security/rateLimitConfig';
import { errorMiddleware } from './middlewares/errorMiddleware';

const app = express();

AppDataSource.initialize()
  .then(async () => {
    console.log('Database OK');

    app.use(rateLimitRequest);
    app.use(cors());
    app.use(express.json());
    app.use(routes);
    app.use(errorMiddleware);
  })
  .catch(error => console.log(`error initializing database: ${error.message}`));

export default app;
