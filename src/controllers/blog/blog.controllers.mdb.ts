import { Request, Response } from 'express';
import { blogsDBCollection as db } from '../../db';
import { IBlogSchema, IBlogRequest } from '../../routes';

export const blogControllersMdb = {
  getAllBlogs: async (req: Request, res: Response) => {
    try {
      const result = await db.find({}, {projection: { _id: 0 }}).toArray();
      res.status(200).send(result);
    } catch (e) {
      console.error(e);
    }
  },
  getBlogById: async (req: Request, res: Response) => {
    try {
      const result = await db.findOne({ id: req.params.id }, {projection: { _id: 0 }});

      if (!result) {
        res.status(404).send('Not Found');
        return;
      }

      res.status(200).send(result);
    } catch (e) {
      console.error(e);
    }
  },
  createBlog: async (req: IBlogRequest, res: Response) => {
    const { name, description, websiteUrl } = req.body;
    const newBlog: IBlogSchema = {
      id: String(Date.now() + Math.random()),
      isMembership: false,
      createdAt: new Date().toISOString(),
      name,
      description,
      websiteUrl,
    };

    try {
      await db.insertOne(newBlog);
      res.status(201).send(newBlog);
    } catch (e) {
      console.error(e);
    }
  },
  updateBlog: async (req: Request, res: Response) => {
    try {
      const { matchedCount } = await db.updateOne(
        { id: req.params.id },
        { $set: req.body },
      );

      if (matchedCount === 0) {
        res.status(404).send('Not Found');
        return;
      }

      res.status(204).end();
    } catch (e) {
      console.error(e);
    }
  },
  deleteBlog: async (req: Request, res: Response) => {
    try {
      const { deletedCount } = await db.deleteOne({ id: req.params.id });

      if (deletedCount === 0) {
        res.status(404).send('Not Found');
        return;
      }

      res.status(204).end();
    } catch (e) {
      console.error(e);
    }
  },
};
