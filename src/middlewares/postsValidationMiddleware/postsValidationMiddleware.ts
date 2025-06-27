import { body, ValidationChain } from 'express-validator';
import { handleValidationErrors } from '../handleValidationErrors/handleValidationErrors';

const postValidationRules: ValidationChain[] = [
  body('title').notEmpty().isString().isLength({ min: 1, max: 30 }),
  body('shortDescription').notEmpty().isString().isLength({ min: 1, max: 100 }),
  body('content').notEmpty().isString().isLength({ min: 1, max: 1000 }),
  body('blogId').notEmpty().isString(),
];

export const postsValidationMiddleware = [
  ...postValidationRules,
  handleValidationErrors,
];
