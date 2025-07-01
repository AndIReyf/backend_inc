import { Request } from 'express';

export interface IBlogSchema {
  id: string;
  createdAt: string;
  isMembership: boolean;
  name: string;
  description: string;
  websiteUrl: string;
}

export interface IBlogRequest extends Request {
  body: Omit<IBlogSchema, 'id' | 'isMembership' | 'createdAt'>;
}
