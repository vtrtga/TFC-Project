import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import { searchUser, validateFields } from '../../middlewares/login';

const loginController = new LoginController();
const LoginRouter = Router();

LoginRouter.post('/', validateFields, searchUser, loginController.login);
LoginRouter.get('/validate');

export default LoginRouter;
