import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import pino from 'pino-http';
import { notFoundHandler } from '../src/middlewares/notFoundHandler.js';
import router from '../src/routers/index.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { UPLOAD_DIR } from './constants/constSort.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(router);
  app.use('*', notFoundHandler);
  app.use(errorHandler);
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
