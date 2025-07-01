import { Request, Response } from 'express';
import { IPostSchema, IPostRequest } from '../../routes';
import { postsDBCollection as db } from '../../db';

export const postControllersMdb = {
  getAllPosts: async (req: Request, res: Response) => {
    try {
      const result = await db.find({}, {projection: { _id: 0 }}).toArray();
      res.status(200).send(result);
    } catch (e) {
      console.error(e);
    }
  },
  getPostById: async (req: Request, res: Response) => {
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
  createPost: async (req: IPostRequest, res: Response) => {
    const { title, content, shortDescription, blogId, blogName } = req.body;
    const newPost: IPostSchema = {
      id: String(Date.now() + Math.random()),
      createdAt: new Date().toISOString(),
      blogName: blogName ?? '',
      blogId,
      title,
      content,
      shortDescription,
    };

    try {
      await db.insertOne(newPost);
      res.status(201).send(newPost);
    } catch (e) {
      console.error(e);
    }
  },
  updatePost: async (req: Request, res: Response) => {
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
  deletePost: async (req: Request, res: Response) => {
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
