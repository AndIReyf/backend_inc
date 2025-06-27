import { NextFunction, Response } from 'express';
import { IErrorMsg } from '../../core';
import { IPostRequest } from '../../routes';

export const postsValidationMiddleware = (
  req: IPostRequest,
  res: Response,
  next: NextFunction,
) => {
  const { title, content, shortDescription, blogId } = req.body;
  const error: IErrorMsg = { errorsMessages: [] };

  if (typeof title !== 'string' || (title && title.length > 30)) {
    error.errorsMessages.push({
      message: 'Invalid title, should be type of string',
      field: 'title',
    });
  }

  if (
    typeof shortDescription !== 'string' ||
    (shortDescription && shortDescription.length > 100)
  ) {
    error.errorsMessages.push({
      message: 'Invalid shortDescription, should be type of string',
      field: 'shortDescription',
    });
  }

  if (typeof content !== 'string' || (content && content.length > 1000)) {
    error.errorsMessages.push({
      message: 'Invalid content, should be type of string',
      field: 'content',
    });
  }

  if (typeof blogId !== 'string') {
    error.errorsMessages.push({
      message: 'Invalid blogId, should be type of string',
      field: 'blogId',
    });
  }

  if (error.errorsMessages.length > 0) {
    res.status(400).send(error);
  } else {
    next();
  }
};
