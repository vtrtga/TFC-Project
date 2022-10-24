import { Request, Response } from 'express';
import tokenGenerator from '../../utils/TokenGenerator';
import LoginService from '../services/LoginService';

class LoginController {
  private readonly loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  async login(req: Request, res: Response) {
    const { password } = req.body;
    const result = await this.loginService.login(req.body);
    const token = tokenGenerator(password);
    if (!result) return res.status(400).json({ message: 'Username or password invalid' });

    return res.status(200).json({ token });
  }
}

export default LoginController;
