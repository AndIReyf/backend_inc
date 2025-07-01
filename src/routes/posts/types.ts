import { Request } from 'express';

export interface IPostSchema {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: string;
}

export interface IPostRequest extends Request {
  body: Omit<IPostSchema, 'id' | 'createdAt'>;
}
