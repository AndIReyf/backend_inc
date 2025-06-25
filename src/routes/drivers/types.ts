import { DriverStatus } from '../../db';

export interface IDriver {
  id: string;
  status: DriverStatus;
  createdAt: Date;
}
