import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import express from 'express';
import path from 'path';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

import { logger } from '@shared/utils';
import routes from './routes';
import { getClientLanguage } from './middlewares/getClientLanguage';
import { appErrorHandler } from './middlewares/appErrorHandler';
import Socket from './connections';

const app = express();
const httpServer = http.createServer(app);

const socket = new Socket(
  new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  }),
);

const port = process.env.PORT || '3000';
const assetsPath = path.resolve(__dirname, '..', '..', '..', '..', 'assets');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.disable('x-powered-by');

app.use(cors());
app.use(getClientLanguage);
app.use(routes);
app.use('/assets', express.static(assetsPath));
app.use(appErrorHandler);

socket.start();

httpServer.listen(port, () =>
  logger.info(`Server is listening at http://localhost:${port}`),
);
