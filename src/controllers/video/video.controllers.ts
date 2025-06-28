import { Response, Request } from 'express';
import { db } from '../../db';
import { IVideoCreateRequest, IVideo, IVideoUpdateRequest } from '../../routes';

export const videoControllers = {
  getVideos: (req: Request, res: Response) => {
    res.status(200).send(db.videos);
  },
  getVideoById: (req: Request, res: Response) => {
    const video = db.videos.find((video) => video.id === +req.params.id);

    if (!video) {
      res.status(404).send('Not Found');
      return;
    }

    res.status(200).send(video);
  },
  createNewVideo: (req: IVideoCreateRequest, res: Response) => {
    const { title, author, availableResolutions } = req.body;

    const newVideo: IVideo = {
      id: db.videos.length ? db.videos.length + 1 : 1,
      title,
      author,
      availableResolutions,
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: '2025-06-27T15:57:07.215Z',
      publicationDate: '2025-06-28T15:57:07.215Z',
    };

    db.videos.push(newVideo);

    res.status(201).send(newVideo);
  },
  updateVideoById: (req: IVideoUpdateRequest, res: Response) => {
    const videoIndex = db.videos.findIndex(
      (video) => video.id === +req.params.id,
    );

    if (videoIndex === -1) {
      res.status(404).send('Not Found');
      return;
    }

    db.videos[videoIndex] = { ...db.videos[videoIndex], ...req.body };

    res.status(204).end();
  },
  deleteVideoById: (req: Request, res: Response) => {
    const videoExist = db.videos.find((video) => video.id === +req.params.id);

    if (!videoExist) {
      res.status(404).send('Not found');
      return;
    }

    db.videos = db.videos.filter((video) => video.id !== +req.params.id);

    res.status(204).end();
  },
};
