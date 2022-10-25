import { Request, Response } from 'express';
// import validateToken from '../../middlewares/validateToken';
import bcryptCompare from '../../utils/Bcrypt';
import tokenGenerator from '../../utils/TokenGenerator';
import LoginService from '../services/LoginService';

class LoginController {
  private readonly loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  login = async (req: Request, res: Response) => {
    const { password } = req.body;
    const result = await this.loginService.login(req.body);
    if (!result) throw new Error('Not found');

    const compare = await bcryptCompare(password, result.password);

    if (!compare) return res.status(401).json({ message: 'Incorrect email or password' });

    const token = tokenGenerator(password);

    return res.status(200).json({ token });
  };

  getUser = async (req: Request, res: Response) => {
    const result = await this.loginService.login(req.body);
    if (!result) throw new Error('Not found');
    const payload = {
      role: result.role,
    };
    return res.status(200).json({ role: payload.role });
  };
}

export default LoginController;
