import { Request } from 'express';

export interface IBlog {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
}

export interface IBlogRequest extends Request {
  body: IBlog;
}
