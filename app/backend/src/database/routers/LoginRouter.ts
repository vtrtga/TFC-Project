import { Router } from 'express';
import validateToken from '../../middlewares/validateToken';
import LoginController from '../controllers/LoginController';
import { searchUser, validateFields } from '../../middlewares/login';

const loginController = new LoginController();
const LoginRouter = Router();

LoginRouter.post('/', validateFields, searchUser, loginController.login);
LoginRouter.get('/validate', validateToken, loginController.getUser);

export default LoginRouter;
