import { db } from '../../db';
import { Request, Response } from 'express';
import { IBlog, IBlogRequest } from '../../routes';

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
  createBlog: async (req: IBlogRequest, res: Response) => {
    const newBlog: IBlog = {
      ...req.body,
      id: db.blogs.length ? String(db.blogs.length + 1) : '1',
    };

    db.blogs.push(newBlog);

    res.status(201).send(newBlog);
  },
  updateBlog: async (req: Request, res: Response) => {
    const blogIndex = db.blogs.findIndex((blog) => blog.id === req.params.id);

    if (blogIndex === -1) {
      res.status(404).send('Not Found');
      return;
    }

    db.blogs[blogIndex] = { ...db.blogs[blogIndex], ...req.body };

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
