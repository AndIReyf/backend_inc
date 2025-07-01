import express, { Response, Request } from 'express';
import { AppRoutes, processEnv } from './core';
import { connectMongoDB } from './db';
import {
  blogsRouter,
  driversRouter,
  postsRouter,
  testingRouter,
  videosRouter,
} from './routes';

const { port } = processEnv;

const app = express();
app.use(express.json());

app.use(AppRoutes.drivers, driversRouter);
app.use(AppRoutes.videos, videosRouter);
app.use(AppRoutes.blogs, blogsRouter);
app.use(AppRoutes.posts, postsRouter);
app.use(AppRoutes.tests, testingRouter);

app.get(AppRoutes.default, (req: Request, res: Response) => {
  res.status(200).send('Hello!');
});

const startServer = async () => {
  await connectMongoDB();

  app.listen(port, () => {
    console.log(`Server started on port:`, port);
  });
};

startServer();

export default app;
