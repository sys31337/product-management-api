import Joi from 'joi';
import expressJoiValidation from 'express-joi-validation';
import { mongooseId, number, string } from './schema';

const validator = expressJoiValidation.createValidator({ passError: true });

const createSchema = Joi.object({
  name: string.required(),
  description: string.allow(''),
  price: number.required(),
  quantity: number.min(1).required(),
  category: mongooseId.required(),
});

const updateSchema = Joi.object({
  name: string.allow(''),
  description: string.allow(''),
  price: number,
  quantity: number,
  category: mongooseId,
});

const idSchema = Joi.object({
  id: mongooseId.required(),
});

export const createValidator = validator.body(createSchema);
export const updateValidator = validator.body(updateSchema);
export const productIdValidator = validator.params(idSchema);
