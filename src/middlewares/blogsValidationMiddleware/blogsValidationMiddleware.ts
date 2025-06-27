import { NextFunction, Response } from 'express';
import { IErrorMsg, urlPattern } from '../../core';
import { IBlogsRequest } from '../../routes';

export const blogsValidationMiddleware = (
  req: IBlogsRequest,
  res: Response,
  next: NextFunction,
) => {
  const { name, description, websiteUrl } = req.body;
  const error: IErrorMsg = { errorsMessages: [] };

  if (typeof name !== 'string' || (name && name.length > 20)) {
    error.errorsMessages.push({
      message: 'Invalid name, should be type of string',
      field: 'name',
    });
  }

  if (typeof description !== 'string') {
    error.errorsMessages.push({
      message: 'Invalid description, should be type of string',
      field: 'description',
    });
  }

  if (typeof websiteUrl !== 'string' || !urlPattern.test(websiteUrl)) {
    error.errorsMessages.push({
      message: 'Invalid websiteUrl, should be valid URL string',
      field: 'websiteUrl',
    });
  }

  if (error.errorsMessages.length > 0) {
    res.status(400).send(error);
  } else {
    next();
  }
};
