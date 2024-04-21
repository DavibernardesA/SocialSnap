import { expect, test } from 'vitest';
import request from 'supertest';
import app from '../../server';
import 'express-async-errors';
import { Request, Response } from 'express';

app.get('/', (_: Request, res: Response) => res.status(200).json('server ok'));

test('server running correctly', async () => {
  const response = await request(app).get('/');
  expect(response.status).toBe(200);
});
