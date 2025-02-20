import createHttpError from 'http-errors';
import fs from 'node:fs';
import swaggerUI from 'swagger-ui-express';
import { SWAGGER_PATH } from '../constants/constSort.js';

export const swaggerDocs = () => {
  try {
    if (!fs.existsSync(SWAGGER_PATH)) {
      console.error('❌ Swagger JSON не найден:', SWAGGER_PATH);
    } else {
      console.log('✅ Swagger JSON найден:', SWAGGER_PATH);
    }
    const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch (err) {
    return (req, res, next) =>
      next(createHttpError(500, "Can't load swagger docs"));
  }
};
