import Joi from 'joi';
import expressJoiValidation from 'express-joi-validation';
import { mongooseId, string } from './schema';

const validator = expressJoiValidation.createValidator({ passError: true });

const createSchema = Joi.object({
  name: string.required(),
  description: string.allow(''),
});

const updateSchema = Joi.object({
  name: string.allow(''),
  description: string.allow(''),
});

const idSchema = Joi.object({
  id: mongooseId.required(),
});

export const createValidator = validator.body(createSchema);
export const updateValidator = validator.body(updateSchema);
export const categoryIdValidator = validator.params(idSchema);
