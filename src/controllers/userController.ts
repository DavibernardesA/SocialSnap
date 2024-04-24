import { Request, Response } from 'express';
import { User } from '../entities/User';
import { userRepository } from '../repositories/userRepository';
import { InvalidFormatError, NotFoundError, UnauthorizedError } from '../helpers/api-error';
import { envChecker } from '../utils/envChecker';

export class UserController {
  public async index(_: Request, res: Response) {
    const users: User[] = await userRepository.find();
    users.length >= 1
      ? res.status(200).json(users)
      : (() => {
          throw new NotFoundError('users not found');
        })();
  }

  public async show(req: Request, res: Response) {
    const user: User | null = await userRepository.findById(req.params.id);
    user
      ? res.status(200).json(user)
      : (() => {
          throw new NotFoundError('user not found');
        })();
  }
  public async store(req: Request, res: Response) {
    const { name, email, password, avatar, bio } = req.body;

    const existIndb = await userRepository.findByEmail(email);

    if (existIndb.length >= 1) {
      throw new UnauthorizedError('user already exists');
    }

    const encryptedPassword = await userRepository.encryptPassword(password);
    const newUser: User = await userRepository.create({
      name,
      email,
      password: encryptedPassword,
      avatar, //implements file upload
      bio,
      followers: 0,
      following: 0,
      publications: 0
    });
    await userRepository.save(newUser);
    res.status(201).json('user created successfully.');
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new InvalidFormatError('Invalid request: check the provided data.');
    }

    const users: User[] = await userRepository.findByEmail(String(email));

    if (users.length < 1) {
      throw new NotFoundError('Invalid request: check the provided data.');
    }

    const user: User = users[0];

    if (!user.id) {
      throw new InvalidFormatError('invalid user');
    }

    const correctPassword: boolean = await userRepository.checkPassword(password, user.password);

    if (!correctPassword) {
      throw new InvalidFormatError('Invalid request: check the provided data.');
    }

    const jwtPass: string = envChecker(process.env.JWT_PASS);

    const token = await userRepository.createToken(user.id, jwtPass, '8h');
    const { password: _, ...userData } = user;

    return res.status(200).json({ user: userData, token });
  }
}
