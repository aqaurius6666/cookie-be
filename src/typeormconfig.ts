import { config } from 'dotenv';
import path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
config({
  path: '.env',
});
export const TypeormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
    ? Number.parseInt(process.env.DB_PORT || '5432')
    : undefined,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [path.join(__dirname, '/**/*.schema.js')],
};
