import express from 'express';
import globby from 'globby';
import morgan from 'morgan';
import cors from 'cors';
import logger from '../logger';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger/api.swagger.json';

const app = express();
export const SKIP_AUTH_USER_ID = 2;
const SKIP_URL = ['/health', '/'];
if (process.env.NODE_ENV === 'development') {
  app.use(
    morgan('tiny', {
      skip: (req, _) => SKIP_URL.includes(req.url),
      stream: {
        write: (message) => {
          logger.info(message);
        },
      },
    })
  );
} else {
  app.use(
    morgan('combined', {
      skip: (req, _) => SKIP_URL.includes(req.url),
      stream: {
        write: (message) => {
          logger.info(message);
        },
      },
    })
  );
}

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.query({ parseArrays: true }));
// app.set('query parser', 'extend');
app.use(express.json({ limit: '50mb' }));
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const apiRouter = express.Router();

globby.sync('./*.controller.{ts,js}', { cwd: __dirname }).forEach((file) => {
  import(`./${file}`)
    .then((module) => {
      apiRouter.use(module.default);
    })
    .catch((err) => {
      logger.error(err);
    });
});

app.use('/api', apiRouter);
export default app;
