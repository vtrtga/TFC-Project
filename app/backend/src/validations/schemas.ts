import * as Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

export default loginSchema;
