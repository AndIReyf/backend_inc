import {DriverStatus} from "../drivers";

export interface IDriver {
  id: string;
  status: DriverStatus;
  createdAt: Date;
}

interface IDB {
  drivers: IDriver[];
}

export const db: IDB = {
  drivers: [
    {
      id: '1',
      status: DriverStatus.Online,
      createdAt: new Date(),
    }
  ]
}