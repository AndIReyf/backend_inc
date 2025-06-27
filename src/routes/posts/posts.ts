import { Router } from 'express';
import { postControllers } from '../../controllers';
import { AppRoutes } from '../../core';
import {
  authValidationMiddleware,
  postsValidationMiddleware,
} from '../../middlewares';

export const postsRouter = Router();

postsRouter.get(AppRoutes.default, postControllers.getAllPosts);
postsRouter.get(AppRoutes.byId, postControllers.getPostById);

postsRouter.post(
  AppRoutes.default,
  authValidationMiddleware,
  postsValidationMiddleware,
  postControllers.createPost,
);

postsRouter.put(
  AppRoutes.byId,
  authValidationMiddleware,
  postsValidationMiddleware,
  postControllers.updatePost,
);

postsRouter.delete(
  AppRoutes.byId,
  authValidationMiddleware,
  postControllers.deletePost,
);
