import { DriverStatus, IDriver } from '../routes';

interface IDB {
  drivers: IDriver[];
}

export const db: IDB = {
  drivers: [
    {
      id: '1',
      status: DriverStatus.Online,
      createdAt: new Date(),
    },
    {
      id: '2',
      status: DriverStatus.Offline,
      createdAt: new Date(),
    },
    {
      id: '3',
      status: DriverStatus.Online,
      createdAt: new Date(),
    },
  ],
};
