import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { loggedInUser } from '../middlewares/loggedInUser';
import { validateBodyRequest } from '../schema/validateBody';
import { schemaLogin, schemaRegister } from '../validations/validateBodyUser';

const routes: Router = Router();

const userController: UserController = new UserController();

routes.post('/auth/login', validateBodyRequest(schemaLogin), userController.login);
routes.post('/auth/register', validateBodyRequest(schemaRegister), userController.store);
routes.get('/user', loggedInUser, userController.index);
routes.get('/user/:id', loggedInUser, userController.show);

export default routes;
