import { Router } from 'express';
import { blogControllers } from '../../controllers';
import { AppRoutes } from '../../core';
import {
  authValidationMiddleware,
  blogsValidationMiddleware,
} from '../../middlewares';

export const blogsRouter = Router();

blogsRouter.get(AppRoutes.default, blogControllers.getAllBlogs);
blogsRouter.get(AppRoutes.byId, blogControllers.getBlogById);

blogsRouter.post(
  AppRoutes.default,
  authValidationMiddleware,
  blogsValidationMiddleware,
  blogControllers.createBlog,
);

blogsRouter.put(
  AppRoutes.byId,
  authValidationMiddleware,
  blogsValidationMiddleware,
  blogControllers.updateBlog,
);

blogsRouter.delete(
  AppRoutes.byId,
  authValidationMiddleware,
  blogControllers.deleteBlog,
);
