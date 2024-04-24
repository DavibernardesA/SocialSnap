import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../helpers/api-error';
import { envChecker } from '../utils/envChecker';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../entities/User';
import { userRepository } from '../repositories/userRepository';

export const loggedInUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError('Unauthorized.');
  }

  const token: string = authorization.split(' ')[1];

  const jwtPass: string = envChecker(process.env.JWT_PASS);

  const { id } = jwt.verify(token, jwtPass) as JwtPayload;

  const user: User | null = await userRepository.findOne({ where: { id } });

  if (!user) {
    throw new UnauthorizedError('Unauthorized');
  }

  req.user = user;

  next();
};
