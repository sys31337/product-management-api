import express from 'express';
import path from 'path';
import cors from 'cors';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { errorHandler, notFound } from '@middlewares/error';
import api from '@routes';

dotenv.config({ path: path.join(__dirname, '../.env') });

export interface ProcessEnv {
  [key: string]: string | undefined;
}
const app: express.Application = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('json spaces', 2);

app.use(helmet());

const origins = (process.env.CORS_FRONTEND_DOMAINS as string)?.split(' ');

app.use(cors({
  origin: origins,
  optionsSuccessStatus: 200,
  credentials: true,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', api);

app.use(notFound);
app.use(errorHandler);

export default app;
