import { Router, Response, Request } from 'express';
import { AppRoutes } from '../../core';
import { db } from '../../db';

export const testingRouter = Router();

testingRouter.delete(AppRoutes.allData, (req: Request, res: Response) => {
  db.videos = [];
  db.drivers = [];
  db.blogs = [];
  db.posts = [];
  res.status(204).send('All data is deleted');
});
