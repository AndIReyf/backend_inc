import express, { Response, Request } from 'express';
import { AppRoutes } from './core';
import { driversRouter } from './routes';

// порт приложения
const PORT = process.env.PORT || 5001;

// создание приложения
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(AppRoutes.drivers, driversRouter);

// основной роут
app.get(AppRoutes.default, (req: Request, res: Response) => {
  res.status(200).send('Hello!');
});

// запуск приложения
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

export default app;
