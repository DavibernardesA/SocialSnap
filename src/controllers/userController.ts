import { Request, Response } from 'express';

export class UserController {
  public async index(req: Request, res: Response) {
    res.send('Hello World!');
  }
}
