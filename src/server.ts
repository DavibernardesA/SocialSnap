import 'express-async-errors';
import express from 'express';
import { AppDataSource } from './connections/database/data-source';

const app = express();

AppDataSource.initialize()
  .then(async () => {
    console.log('Database OK');
    app.use(express.json());
  })
  .catch(error => console.log(`error initializing database: ${error.message}`));

export default app;
