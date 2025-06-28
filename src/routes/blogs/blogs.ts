import { Router } from 'express';
import { blogControllers } from '../../controllers';
import { AppRoutes } from '../../core';
import {
  authValidation,
  blogsValidation,
} from '../../middlewares';

export const blogsRouter = Router();

blogsRouter.get(AppRoutes.default, blogControllers.getAllBlogs);
blogsRouter.get(AppRoutes.byId, blogControllers.getBlogById);

blogsRouter.post(
  AppRoutes.default,
  authValidation,
  blogsValidation,
  blogControllers.createBlog,
);

blogsRouter.put(
  AppRoutes.byId,
  authValidation,
  blogsValidation,
  blogControllers.updateBlog,
);

blogsRouter.delete(
  AppRoutes.byId,
  authValidation,
  blogControllers.deleteBlog,
);
