import { db } from '../../db';
import { Request, Response } from 'express';
import { IBlogs, IBlogsRequest } from '../../routes';

export const blogControllers = {
  getAllBlogs: async (req: Request, res: Response) => {
    res.status(200).send(db.blogs);
  },
  getBlogById: async (req: Request, res: Response) => {
    const blog = db.blogs.find((blog) => blog.id === req.params.id);

    if (!blog) {
      res.status(404).send('Not Found');
      return;
    }

    res.status(200).send(blog);
  },
  createBlog: async (req: IBlogsRequest, res: Response) => {
    const newBlog: IBlogs = {
      ...req.body,
      id: db.blogs.length ? String(db.blogs.length + 1) : '1',
    };

    res.status(201).send(newBlog);
  },
  updateBlog: async (req: Request, res: Response) => {
    const blog = db.blogs.find((blog) => blog.id === req.params.id);

    if (!blog) {
      res.status(404).send('Not Found');
      return;
    }

    res.status(204).end();
  },
  deleteBlog: async (req: Request, res: Response) => {
    const blog = db.blogs.find((blog) => blog.id === req.params.id);

    if (!blog) {
      res.status(404).send('Not Found');
      return;
    }

    db.blogs = db.blogs.filter((blog) => blog.id !== req.params.id);

    res.status(204).end();
  },
};
