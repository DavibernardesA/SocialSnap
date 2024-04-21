import { Router } from 'express';
import { UserController } from '../controllers/userController';

const routes: Router = Router();

const userController: UserController = new UserController();

routes.get('/user', userController.index);

export default routes;
