import { Router, Response } from 'express';
import { AppRoutes } from '../../core';
import { db } from '../../db';
import { inputValidationMiddleware } from '../../middlewares';
import { IVideoCreateRequest, IVideos, IVideoUpdateRequest } from './types';

export const videosRouter = Router();

videosRouter.get(AppRoutes.default, (req, res) => {
  res.status(200).send(db.videos);
});
videosRouter.get(AppRoutes.byId, (req, res) => {
  const video = db.videos.find((video) => video.id === +req.params.id);

  if (!video) {
    res.status(404);
    return;
  }

  res.status(200).send(video);
});

videosRouter.post(
  AppRoutes.default,
  inputValidationMiddleware,
  (req: IVideoCreateRequest, res: Response) => {
    const { title, author, availableResolutions } = req.body;

    const newVideo: IVideos = {
      id: db.videos.length ? db.videos.length + 1 : 1,
      title,
      author,
      availableResolutions,
      canBeDownloaded: true,
      minAgeRestriction: null,
      createdAt: new Date().toISOString(),
      publicationDate: new Date().toISOString(),
    };

    db.videos.push(newVideo);

    res.status(201).send(newVideo);
  },
);

videosRouter.put(
  AppRoutes.byId,
  inputValidationMiddleware,
  (req: IVideoUpdateRequest, res: Response) => {
    const videoIndex = db.videos.findIndex(
      (video) => video.id === +req.params.id,
    );

    if (videoIndex === -1) {
      res.status(404).send('Not Found');
      return;
    }

    db.videos[videoIndex] = { ...db.videos[videoIndex], ...req.body };

    res.status(204).send(db.videos[videoIndex]);
  },
);

videosRouter.delete(AppRoutes.byId, (req, res) => {
  const videoExist = db.videos.find((video) => video.id === +req.params.id);

  if (!videoExist) {
    res.status(404).send('Not found');
    return;
  }

  db.videos = db.videos.filter((video) => video.id !== +req.params.id);

  res.status(204);
});
