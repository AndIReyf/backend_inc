import { IDriver, IVideo, IBlogSchema, IPostSchema } from '../routes';

export enum DriverStatus {
  Online = 'Online',
  Offline = 'Offline',
}

interface IDB {
  drivers: IDriver[];
  videos: IVideo[];
  blogs: IBlogSchema[];
  posts: IPostSchema[];
}

export const db: IDB = {
  drivers: [
    {
      id: '1',
      status: DriverStatus.Online,
      createdAt: new Date(),
    },
    {
      id: '2',
      status: DriverStatus.Offline,
      createdAt: new Date(),
    },
    {
      id: '3',
      status: DriverStatus.Online,
      createdAt: new Date(),
    },
  ],
  videos: [
    {
      id: 1,
      title: 'string',
      author: 'string',
      canBeDownloaded: true,
      minAgeRestriction: null,
      createdAt: new Date().toISOString(),
      publicationDate: new Date().toISOString(),
      availableResolutions: ['P144'],
    },
  ],
  blogs: [
    {
      id: '1',
      name: 'Typescript',
      description: 'Some descriptions',
      websiteUrl: 'https://www.typescriptlang.org',
    },
    {
      id: '2',
      name: 'React',
      description: 'Some descriptions',
      websiteUrl: 'https://react.dev',
    },
  ],
  posts: [
    {
      id: '1',
      title: 'Express or Nest',
      shortDescription: 'What should to know about node.js',
      content: 'Some content',
      blogId: '1',
      blogName: 'Typescript',
    },
    {
      id: '2',
      title: 'Next.js',
      shortDescription: 'The Best SSR?',
      content: 'Some content',
      blogId: '2',
      blogName: 'React',
    },
  ],
};
