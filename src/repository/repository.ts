import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { TypeormConfig } from '../typeormconfig';
require('reflect-metadata');
const opts: PostgresConnectionOptions = {
  ...TypeormConfig,
  // logger: new SimpleConsoleLogger(),
  logging: 'all',
};
export const dataSource = new DataSource(opts);

export const connectDB = async () => {
  return await dataSource.initialize();
};
