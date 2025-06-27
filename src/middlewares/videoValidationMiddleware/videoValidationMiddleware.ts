import { NextFunction, Response } from 'express';
import {
  IErrorMsg,
  isValidISOString,
  isValidResolutionArray,
} from '../../core';
import { IVideoUpdateRequest } from '../../routes';

export const videoValidationMiddleware = (
  req: IVideoUpdateRequest,
  res: Response,
  next: NextFunction,
) => {
  const {
    title,
    author,
    availableResolutions,
    canBeDownloaded,
    publicationDate,
    minAgeRestriction,
  } = req.body;
  const error: IErrorMsg = { errorsMessages: [] };

  if (!isValidResolutionArray(availableResolutions)) {
    error.errorsMessages.push({
      message: 'Invalid Resolution ID',
      field: 'availableResolutions',
    });
  }

  if (typeof title !== 'string' || (title && title.length > 40)) {
    error.errorsMessages.push({
      message: 'Invalid title, should be type of string',
      field: 'title',
    });
  }

  if (typeof author !== 'string' || (author && author.length > 20)) {
    error.errorsMessages.push({
      message: 'Invalid author, should be type of string',
      field: 'author',
    });
  }

  if (canBeDownloaded !== undefined && typeof canBeDownloaded !== 'boolean') {
    error.errorsMessages.push({
      message: 'Invalid canBeDownloaded, should be type of boolean',
      field: 'canBeDownloaded',
    });
  }

  if (publicationDate && !isValidISOString(publicationDate)) {
    error.errorsMessages.push({
      message: 'Invalid publicationDate, should be type of string',
      field: 'publicationDate',
    });
  }

  if (minAgeRestriction && (minAgeRestriction < 1 || minAgeRestriction > 18)) {
    error.errorsMessages.push({
      message:
        'Invalid minAgeRestriction, should be type of (Range1to18 | null)',
      field: 'minAgeRestriction',
    });
  }

  if (error.errorsMessages.length > 0) {
    res.status(400).send(error);
  } else {
    next();
  }
};
