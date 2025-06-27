import { Request } from 'express';

export interface IBlogs {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
}

export interface IBlogsRequest extends Request {
  body: IBlogs;
}
