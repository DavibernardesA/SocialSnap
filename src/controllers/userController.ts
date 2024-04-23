import { Request, Response } from 'express';
import { User } from '../entities/User';
import { userRepository } from '../repositories/userRepository';
import { NotFoundError } from '../helpers/api-error';

export class UserController {
  public async index(_: Request, res: Response) {
    const users: User[] = await userRepository.find();
    users.length >= 1
      ? res.status(200).json(users)
      : (() => {
          throw new NotFoundError('users not found');
        })();
  }
}
