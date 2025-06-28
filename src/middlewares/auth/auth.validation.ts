import { NextFunction, Response, Request } from 'express';

const USER_TOKEN = 'YWRtaW46cXdlcnR5'; // admin qwerty

export const authValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  let unauthorized = false;

  if (authHeader && authHeader.startsWith('Basic ')) {
    const token = authHeader.substring(6);
    unauthorized = token === USER_TOKEN;
  }

  if (!unauthorized) {
    res.status(401).send('Unauthorized');
  } else {
    next();
  }
};
