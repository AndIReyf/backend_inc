import { Router } from 'express';
import { AppRoutes } from '../../core';
import { db } from '../../db';

export const testingRouter = Router();

testingRouter.delete(AppRoutes.allData, (req, res) => {
  db.videos = [];
  db.drivers = [];
  res.status(204).send('All data is deleted');
});
