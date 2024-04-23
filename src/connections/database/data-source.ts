import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { envChecker } from '../../utils/envChecker';

export const AppDataSource: DataSource = new DataSource({
  type: 'postgres',
  host: envChecker(process.env.DB_HOST),
  port: envChecker(process.env.DB_PORT) as unknown as number,
  username: envChecker(process.env.DB_USER),
  password: envChecker(process.env.DB_PASS),
  database: envChecker(process.env.DB_NAME),
  migrations: [`${__dirname}/../../migrations/*.{ts,js}`],
  entities: [`${__dirname}/../../entities/*.{ts,js}`]
});
