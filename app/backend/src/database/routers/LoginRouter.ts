import { Router } from 'express';
import validateToken from '../../middlewares/validateToken';
import LoginController from '../controllers/LoginController';
import { searchUser, validateFields } from '../../middlewares/login';

const LoginRouter = Router();
const { login, getUser } = new LoginController();

LoginRouter.post('/', validateFields, searchUser, login);
LoginRouter.get('/validate', validateToken, getUser);

export default LoginRouter;
