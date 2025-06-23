import { Router } from 'express';
import { UserController } from '../controller/UserController';

const routes = Router();
const userController = new UserController();

routes.get('/Users', userController.list);
routes.post('/Users', userController.create);
routes.get('/Users/:id', userController.show);
routes.put('/Users/:id', userController.update);
routes.delete('/Users/:id', userController.delete);
routes.post('/UsersLogin', userController.login);

export default routes;