import { sign, SignOptions } from 'jsonwebtoken';

require('dotenv');

const secret = process.env.JWT_SECRET || 'jwt_secret';

const jwtConfig: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const tokenGenerator = (password: string) => {
  const token = sign({ data: { password } }, secret, jwtConfig);

  return token;
};

export default tokenGenerator;
