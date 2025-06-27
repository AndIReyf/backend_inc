import { Request } from 'express';
import { ResolutionType } from '../../core';

type Range1to18 =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18;

export interface IVideo {
  id: number;
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: Range1to18 | null;
  createdAt: string;
  publicationDate: string;
  availableResolutions: ResolutionType[];
}

interface IVideoCreateParams
  extends Pick<IVideo, 'title' | 'author' | 'availableResolutions'> {}

interface IVideoUpdateParams extends Omit<IVideo, 'id' | 'createdAt'> {}

export interface IVideoCreateRequest extends Request {
  body: IVideoCreateParams;
}

export interface IVideoUpdateRequest extends Request {
  body: IVideoUpdateParams;
}
