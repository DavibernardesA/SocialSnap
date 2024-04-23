import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export const validateBodyRequest = (joiSchema: Schema) => async (req: Request, res: Response, next: NextFunction) => {
  await joiSchema.validateAsync(req.body);
  next();
};
