import Joi from 'joi';

export const schemaRegister = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  avatar: Joi.string(),
  bio: Joi.string()
});
