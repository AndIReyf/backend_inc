import { body, ValidationChain } from 'express-validator';
import { handleValidationErrors } from '../handleValidationErrors/handleValidationErrors';

const postValidationRules: ValidationChain[] = [
  body('title').trim().notEmpty().isString().isLength({ min: 1, max: 30 }),
  body('shortDescription').trim().notEmpty().isString().isLength({ min: 1, max: 100 }),
  body('content').trim().notEmpty().isString().isLength({ min: 1, max: 1000 }),
  body('blogId').trim().notEmpty().isString(),
];

export const postsValidationMiddleware = [
  ...postValidationRules,
  handleValidationErrors,
];
