import * as Joi from 'joi';
import UserLogin from '../interfaces/User';

const loginSchema = (body: UserLogin) => Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(6).required(),
}).validate(body);

export default loginSchema;
