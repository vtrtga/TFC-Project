import { Router } from 'express';
import loginMiddleware from '../../middlewares/login';
import LoginController from '../controllers/LoginController';

const loginController = new LoginController();
const LoginRouter = Router();

LoginRouter.post('/', loginMiddleware, loginController.login);

export default LoginRouter;
