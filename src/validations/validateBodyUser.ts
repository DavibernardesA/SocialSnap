import Joi from 'joi';

export const schemaRegister = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  avatar: Joi.string(),
  bio: Joi.string()
}).messages({
  'string.base': 'Unsuccessful request, check the data provided. Email, name and string must be a string',
  'string.email': 'Invalid email format',
  'string.empty': 'Field cannot be empty',
  'string.min': 'Password must be at least {#limit} characters long',
  'any.required': 'Field is required'
});

export const schemaLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
}).messages({
  'string.base': 'Unsuccessful request, check the data provided. Email and password must be a string.',
  'string.email': 'Invalid email format',
  'string.empty': 'Field cannot be empty',
  'string.min': 'Password must be at least {#limit} characters long',
  'any.required': 'Field is required'
});

export const schemaUpdate = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  avatar: Joi.string(),
  bio: Joi.string()
})
  .min(1)
  .messages({
    'any.required': 'At least one field must be provided',
    'string.empty': 'Field cannot be empty',
    'string.email': 'Invalid email format',
    'string.min': 'Password must be at least {#limit} characters long',
    'object.min': 'At least one field must be provided'
  });
