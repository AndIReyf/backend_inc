import { NextFunction, Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { IErrorMsg } from '../../core';

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const error: IErrorMsg = { errorsMessages: [] };
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.array({ onlyFirstError: true }).forEach((err: ValidationError) => {
      if ('path' in err) {
        error.errorsMessages.push({ field: err.path, message: err.msg });
      }
    });

    res.status(400).send(error);
    return;
  }

  next();
};
