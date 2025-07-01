import { NextFunction, Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { IErrorMsg } from '../../core';
import { IError } from '../../core/types/error';

const formatErrors = (error: ValidationError) => {
  const err: IError = {};

  if ('path' in error) {
    err.field = error.path;
    err.message = error.msg;
  }

  return err;
};

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req).formatWith(formatErrors).array();

  if (errors.length > 0) {
    res.status(400).send({ errorsMessages: errors } as IErrorMsg);
    return;
  }

  next();
};
