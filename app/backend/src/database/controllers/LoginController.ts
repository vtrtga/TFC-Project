import { Request, Response } from 'express';
import bcryptCompare from '../../utils/Bcrypt';
import tokenGenerator from '../../utils/TokenGenerator';
import LoginService from '../services/LoginService';

class LoginController {
  private readonly loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await this.loginService.login(req.body);
    if (!result) throw new Error('Not found');

    const compare = await bcryptCompare(password, result.password);

    if (!compare) return res.status(401).json({ message: 'Incorrect email or password' });

    const token = tokenGenerator(email);

    return res.status(200).json({ token });
  };

  getUser = async (req: Request, res: Response) => {
    const { verif: { data: { email } } } = req.body;

    const user = {
      email,
      password: '',
    };

    const result = await this.loginService.login(user);

    if (!result) throw new Error('Not found');

    const payload = {
      role: result.role,
    };
    return res.status(200).json({ role: payload.role });
  };
}

export default LoginController;
