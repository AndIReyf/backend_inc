import { Router, Response } from 'express';
import { videoControllers } from '../../controllers';
import { AppRoutes } from '../../core';
import { db } from '../../db';
import { videoValidationMiddleware } from '../../middlewares';
import { IVideoCreateRequest, IVideos, IVideoUpdateRequest } from './types';

export const videosRouter = Router();

videosRouter.get(AppRoutes.default, videoControllers.getVideos);
videosRouter.get(AppRoutes.byId, videoControllers.getVideoById);

videosRouter.post(
  AppRoutes.default,
  videoValidationMiddleware,
  videoControllers.createNewVideo,
);

videosRouter.put(
  AppRoutes.byId,
  videoValidationMiddleware,
  videoControllers.updateVideoById,
);

videosRouter.delete(AppRoutes.byId, videoControllers.deleteVideoById);
