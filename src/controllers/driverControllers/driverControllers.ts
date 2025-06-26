import { db } from '../../db';
import { Response, Request } from 'express';
import { driversRepository } from '../../repositories';
import { IDriver } from '../../routes';

export const driverControllers = {
  getAllDrivers: (req: Request, res: Response) => {
    res.status(200).send(db.drivers);
  },
  getDriverById: (req: Request, res: Response) => {
    const driver = driversRepository.findDriverById(req.params.id);

    if (!driver) {
      res.status(404).send({ message: 'No driver found!' });
      return;
    }

    res.status(200).send(driver);
  },
  createNewDriver: (req: Request, res: Response) => {
    const newDriver: IDriver = {
      ...driversRepository.createDriver(),
      ...req.body,
    };

    db.drivers.push(newDriver);

    res.status(200).send(newDriver);
  },
};
