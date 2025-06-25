import express, { Response, Request } from 'express';
import { AppRoutes } from './core';
import { driversRouter } from './routes';

// порт приложения
const PORT = process.env.PORT || 5001;

// создание приложения
const app = express();

app.use(express.json());

// основной роут
app.get(AppRoutes.default, (req: Request, res: Response) => {
  res.status(200).send('Hello world!');
});

app.use(AppRoutes.drivers, driversRouter);

// запуск приложения
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

export default app;
