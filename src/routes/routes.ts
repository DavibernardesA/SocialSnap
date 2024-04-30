import { Router } from 'express';
import UserController from '../controllers/userController';
import { loggedInUser } from '../middlewares/loggedInUser';
import { validateBodyRequest } from '../schema/validateBody';
import { schemaLogin, schemaRegister, schemaUpdate } from '../validations/validateBodyUser';
import multer from '../middlewares/multer';

const routes: Router = Router();

routes.post('/auth/login', validateBodyRequest(schemaLogin), new UserController().login);
routes.post('/auth/register', validateBodyRequest(schemaRegister), multer.single('avatar'), new UserController().store);
routes.get('/user', loggedInUser, new UserController().index);
routes.get('/user/:id', loggedInUser, new UserController().show);
routes.put('/profile/:id', loggedInUser, validateBodyRequest(schemaUpdate), multer.single('avatar'), new UserController().update);
routes.delete('/user/delete', loggedInUser, new UserController().destroy);

export default routes;
