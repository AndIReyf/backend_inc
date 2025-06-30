import { Request, Response } from 'express';
import { IPost, IPostRequest } from '../../routes';
import { postsDBCollection as db } from '../../db';

export const postControllersMdb = {
  getAllPosts: async (req: Request, res: Response) => {
    try {
      const result = await db.find({}).toArray();
      res.status(200).send(result);
    } catch (e) {
      console.error(e);
    }
  },
  getPostById: async (req: Request, res: Response) => {
    try {
      const result = await db.findOne({ id: req.params.id });

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
    const newPost: IPost = {
      id: String(Date.now() + Math.random()),
      blogName: 'Blog Name',
      ...req.body,
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
