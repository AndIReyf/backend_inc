import { driverControllers } from '../../controllers';
import { AppRoutes } from '../../core';
import { Router } from 'express';

export const driversRouter = Router();

driversRouter.get(AppRoutes.default, driverControllers.getAllDrivers);
driversRouter.get(AppRoutes.byId, driverControllers.getDriverById);
driversRouter.post(AppRoutes.default, driverControllers.createNewDriver);
