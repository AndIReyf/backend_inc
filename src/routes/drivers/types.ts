export enum DriverStatus {
  Online = 'Online',
  Offline = 'Offline',
}

export interface IDriver {
  id: string;
  status: DriverStatus;
  createdAt: Date;
}
