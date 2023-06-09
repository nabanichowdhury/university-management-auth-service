import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();
app.use(cors());

//parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//application route
app.use('/api/v1/users/', UserRoutes);

//for testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Database Connected');
});

//global error handler

app.use(globalErrorHandler);

export default app;
