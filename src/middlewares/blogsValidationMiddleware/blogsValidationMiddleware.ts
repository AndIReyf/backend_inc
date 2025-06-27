import { body, ValidationChain } from 'express-validator';
import { urlPattern } from '../../core';
import { handleValidationErrors } from '../handleValidationErrors/handleValidationErrors';

const blogsValidationRules: ValidationChain[] = [
  body('name').notEmpty().isString().isLength({ min: 1, max: 15 }),
  body('description').notEmpty().isString().isLength({ min: 1, max: 500 }),
  body('websiteUrl')
    .notEmpty()
    .isString()
    .custom((websiteUrl: string): boolean => {
      return urlPattern.test(websiteUrl);
    })
    .withMessage('Invalid websiteUrl, should be valid URL string'),
];

export const blogsValidationMiddleware = [
  ...blogsValidationRules,
  handleValidationErrors,
];
