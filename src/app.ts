import { ConnectDatabase } from './repository';
import server from './route/server';
import logger from './logger';

const main = async () => {
  await ConnectDatabase();
  logger.info('Connect db success');
  server.listen(3000, () => {
    logger.info('Server is running on port 3000');
  });
};

export default main;
