import { Request, Response } from 'express';
import { User } from '../entities/User';
import { userRepository } from '../repositories/userRepository';
import { InvalidFormatError, NotFoundError, UnauthorizedError } from '../helpers/api-error';
import fileUpload from '../services/fileUpload';
import fileUpdate from '../services/fileUpdate';
import fileDelete from '../services/fileDelete';

class UserController {
  public async index(_: Request, res: Response) {
    const users: Omit<User, 'password'>[] = await userRepository
      .createQueryBuilder('users')
      .select(['users.id', 'users.name', 'users.email', 'users.avatar', 'users.bio', 'users.followers', 'users.following', 'users.publications'])
      .getMany();

    if (users.length >= 1) {
      res.status(200).json(users);
    } else {
      throw new NotFoundError('users not found');
    }
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
    const { name, email, password, bio } = req.body;
    let avatar: Express.Multer.File | undefined = req.file;

    const existIndb = await userRepository.findByEmail(email);

    if (existIndb.length >= 1) {
      throw new UnauthorizedError('user already exists');
    }
    const encryptedPassword = await userRepository.encryptPassword(password);

    let newImage: Express.Multer.File | string = '';
    avatar ? (newImage = await fileUpload(name, `profiles/${email}/${name}`, avatar)) : (newImage = '');

    const newUser: User = await userRepository.create({
      name,
      email,
      password: encryptedPassword,
      avatar: newImage,
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

    const users: User[] = await userRepository.findByEmail(String(email));

    if (users.length < 1) {
      throw new NotFoundError('Invalid request: check the provided data.');
    }

    let user;
    users.length < 1
      ? (() => {
          throw new NotFoundError('Invalid request: check the provided data.');
        })()
      : (user = users[0]);

    if (!user.id) {
      throw new InvalidFormatError('invalid user');
    }

    const correctPassword: boolean = await userRepository.checkPassword(password, user.password);

    if (!correctPassword) {
      throw new InvalidFormatError('Invalid request: check the provided data.');
    }
    const token = await userRepository.createToken(user.id, '8h');
    const { password: _, ...userData } = user;
    return res.status(200).json({ user: userData, token });
  }

  async update(req: Request, res: Response) {
    const { name, email, password, bio } = req.body;
    const avatar: Express.Multer.File | undefined = req.file;

    if (!String(req.user.id)) {
      throw new UnauthorizedError('You must be logged in');
    }

    const user: User | null = await userRepository.findById(String(req.user.id));

    if (!user) {
      throw new NotFoundError('user not found');
    }

    let encryptedPassword;
    if (password) {
      encryptedPassword = await userRepository.encryptPassword(password);
    }

    let newImage: string = '';
    avatar ? (newImage = await fileUpdate(user, `profiles/${user.email}/${user.name}`, avatar)) : (newImage = '');

    const userData: Omit<User, 'id'> = {
      name: name || user.name,
      email: email || user.email,
      password: encryptedPassword ? encryptedPassword : user.password,
      avatar: newImage === '' ? user.avatar : newImage,
      bio: bio || user.bio,
      followers: user.followers,
      following: user.following,
      publications: user.publications
    };

    Object.assign(user, userData);

    await userRepository.save(user);
    res.status(200).json('user updated successfully.');
  }

  async destroy(req: Request, res: Response) {
    if (!req.user || !req.user.id) {
      throw new UnauthorizedError('You must be logged in');
    }

    const user: User | null = await userRepository.findById(String(req.user.id));

    if (!user) {
      throw new NotFoundError('User not found');
    }

    await fileDelete(user.avatar, `profiles/${user.email}/${user.name}`);
    await userRepository.delete(user);

    return res.status(200).json('User deleted successfully');
  }
}

export default UserController;
