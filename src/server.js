import cors from 'cors';
import express from 'express';
import pino from 'pino-http';
import { notFoundHandler } from '../src/middlewares/notFoundHandler.js';
import contactRouter from '../src/routers/contacts.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(contactRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
