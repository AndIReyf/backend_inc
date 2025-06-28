import { Router, Response } from 'express';
import { videoControllers } from '../../controllers';
import { AppRoutes } from '../../core';
import { db } from '../../db';
import { videoValidation } from '../../middlewares';
import { IVideoCreateRequest, IVideo, IVideoUpdateRequest } from './types';

export const videosRouter = Router();

videosRouter.get(AppRoutes.default, videoControllers.getVideos);
videosRouter.get(AppRoutes.byId, videoControllers.getVideoById);

videosRouter.post(
  AppRoutes.default,
  videoValidation,
  videoControllers.createNewVideo,
);

videosRouter.put(
  AppRoutes.byId,
  videoValidation,
  videoControllers.updateVideoById,
);

videosRouter.delete(AppRoutes.byId, videoControllers.deleteVideoById);
