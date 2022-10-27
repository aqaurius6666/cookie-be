import { DataSource, SimpleConsoleLogger } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { TypeormConfig } from '../typeormconfig'

const opts: PostgresConnectionOptions = {
  ...TypeormConfig,
  logger: new SimpleConsoleLogger()
}
export const dataSource = new DataSource(opts)

export const connectDB = async () => {
  return await dataSource.initialize().then(async () => await dataSource.synchronize())
}
