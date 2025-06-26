import { NextFunction, Response } from 'express';
import { isValidDateString, isValidResolutionArray } from '../../core';
import { IVideoUpdateRequest } from '../../routes';

interface IError {
  message: string;
  field: string;
}

interface IErrorMsg {
  errorsMessages?: IError[];
}

export const inputValidationMiddleware = (
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
  const error: IErrorMsg = {};

  if (
    availableResolutions &&
    availableResolutions.length > 0 &&
    !isValidResolutionArray(availableResolutions)
  ) {
    error.errorsMessages?.push({
      message: 'Invalid Resolution ID',
      field: 'availableResolutions: ResolutionType[]',
    });
  }

  if (title && typeof title !== 'string') {
    error.errorsMessages?.push({
      message: 'Invalid title, should be type of string',
      field: 'title: string',
    });
  }

  if (author && typeof author !== 'string') {
    error.errorsMessages?.push({
      message: 'Invalid author, should be type of string',
      field: 'author: string',
    });
  }

  if (canBeDownloaded && typeof canBeDownloaded !== 'boolean') {
    error.errorsMessages?.push({
      message: 'Invalid canBeDownloaded, should be type of boolean',
      field: 'canBeDownloaded: boolean',
    });
  }

  if (!isValidDateString(publicationDate)) {
    error.errorsMessages?.push({
      message: 'Invalid publicationDate, should be type of string',
      field: 'publicationDate: string',
    });
  }

  if (minAgeRestriction && (minAgeRestriction < 1 || minAgeRestriction > 18)) {
    error.errorsMessages?.push({
      message:
        'Invalid minAgeRestriction, should be type of (Range1to18 | null)',
      field: 'minAgeRestriction: Range1to18 | null',
    });
  }

  if (Object.keys(error).length !== 0) {
    res.status(400).send(error);
  } else {
    next();
  }
};
