import { NextFunction, Response, Request } from 'express';

const USER_TOKEN = 'dXNlciAxMjM='; // user 123

export const authValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  let unauthorized = false;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    unauthorized = token === USER_TOKEN;
  }

  if (!unauthorized) {
    res.status(401).send('Unauthorized');
  } else {
    next();
  }
};
