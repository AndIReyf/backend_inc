import { db } from '../../db';
import {Response, Request} from 'express';
import { driversRepository } from '../../repositories';
import { IDriver } from '../../routes';

export const driverControllers = {
  getAllDrivers: async (req: Request, res: Response) => {
    res.status(200).send(db.drivers);
  },
  getDriverById: async (req: Request, res: Response) => {
    const driver = driversRepository.findDriverById(req.params.id);

    if (!driver) {
      res.status(404).send({ message: 'No driver found!' });
    }

    res.status(200).send(driver);
  },
  createNewDriver: async (req: Request, res: Response) => {
    const newDriver: IDriver = {
      ...driversRepository.createDriver(),
      ...req.body,
    }

    db.drivers.push(newDriver);

    res.status(200).send(newDriver);
  },
}