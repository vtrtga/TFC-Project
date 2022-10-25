import { NextFunction, Request, Response } from 'express';
import * as Jwt from 'jsonwebtoken';

require('dotenv');

const secret = process.env.JWT_SECRET || 'jwt_secret';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  try {
    Jwt.verify(authorization, secret);
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
  next();
};

export default validateToken;
