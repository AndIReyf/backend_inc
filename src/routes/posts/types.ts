import { Request } from 'express';

export interface IPost {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
}

export interface IPostRequest extends Request {
  body: Omit<IPost, 'id' | 'blogName'>;
}
