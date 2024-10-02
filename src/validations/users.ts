import Joi from 'joi';
import expressJoiValidation from 'express-joi-validation';
import { string } from './schema';

const validator = expressJoiValidation.createValidator({ passError: true });

const loginSchema = Joi.object({
  email: string.required(),
  password: string.required().min(6).max(32),
});

const registerSchema = Joi.object({
  email: string.required(),
  password: string.required().min(6).max(32),
  confirm: string.required().valid(Joi.ref('password')),
});

export const registerValidator = validator.body(registerSchema);
export const loginValidator = validator.body(loginSchema);
