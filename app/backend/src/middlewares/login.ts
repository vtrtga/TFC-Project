import { NextFunction, Request, Response } from 'express';
import loginSchema from '../validations/schemas';

const loginMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginSchema(req.body);
  if (error) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  next();
};

export default loginMiddleware;
