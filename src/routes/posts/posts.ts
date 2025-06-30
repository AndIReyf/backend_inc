import { Router } from 'express';
import { postControllersMdb as postControllers } from '../../controllers';
import { AppRoutes } from '../../core';
import { authValidation, postsValidation } from '../../middlewares';

export const postsRouter = Router();

postsRouter.get(AppRoutes.default, postControllers.getAllPosts);
postsRouter.get(AppRoutes.byId, postControllers.getPostById);

postsRouter.post(
  AppRoutes.default,
  authValidation,
  postsValidation,
  postControllers.createPost,
);

postsRouter.put(
  AppRoutes.byId,
  authValidation,
  postsValidation,
  postControllers.updatePost,
);

postsRouter.delete(AppRoutes.byId, authValidation, postControllers.deletePost);
