import { db } from '../../db';
import { DriverStatus, IDriver } from '../../routes';

export const driversRepository = {
  findDriverById(id: string) {
    return db.drivers.find((d) => d.id === id);
  },
  createDriver(): IDriver {
    return {
      id: `${db.drivers.length ? db.drivers.length + 1 : 1}`,
      status: DriverStatus.Online,
      createdAt: new Date(),
    };
  },
};
