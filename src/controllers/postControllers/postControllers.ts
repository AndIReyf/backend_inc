import { db } from '../../db';
import { Request, Response } from 'express';
import { IPost, IPostRequest } from '../../routes';

export const postControllers = {
  getAllPosts: async (req: Request, res: Response) => {
    res.status(200).send(db.posts);
  },
  getPostById: async (req: Request, res: Response) => {
    const post = db.posts.find((post) => post.id === req.params.id);

    if (!post) {
      res.status(404).send('Not Found');
      return;
    }

    res.status(200).send(post);
  },
  createPost: async (req: IPostRequest, res: Response) => {
    const newPost: IPost = {
      id: db.posts.length ? String(db.posts.length + 1) : '1',
      blogName: 'Blog Name',
      ...req.body,
    };

    db.posts.push(newPost);

    res.status(201).send(newPost);
  },
  updatePost: async (req: Request, res: Response) => {
    const postIndex = db.posts.findIndex((post) => post.id === req.params.id);

    if (postIndex === -1) {
      res.status(404).send('Not Found');
      return;
    }

    db.posts[postIndex] = { ...db.posts[postIndex], ...req.body };

    res.status(204).end();
  },
  deletePost: async (req: Request, res: Response) => {
    const post = db.posts.find((post) => post.id === req.params.id);

    if (!post) {
      res.status(404).send('Not Found');
      return;
    }

    db.posts = db.posts.filter((post) => post.id !== req.params.id);

    res.status(204).end();
  },
};
