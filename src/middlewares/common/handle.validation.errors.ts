import { NextFunction, Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { IErrorMsg } from '../../core';
import { IError } from '../../core/types/error';

const formatErrors = (error: ValidationError) => {
  const err: IError = {};

  if ('path' in error) {
    err.message = error.msg;
    err.field = error.path;
  }

  return err;
};

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req)
    .formatWith(formatErrors)
    .array({ onlyFirstError: true });

  if (errors.length > 0) {
    res.status(400).send({ errorsMessages: errors } as IErrorMsg);
    return;
  }

  next();
};
