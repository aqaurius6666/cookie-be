import { config } from 'dotenv'
import 'reflect-metadata'
import main from './app'
import logger from './logger'
config({
  path: '.env'
})
main().then(() => {

}).catch((err) => {
  logger.error(err)
})

process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled Rejection at: Promise', p, 'reason:', reason)
  // application specific logging, throwing an error, or other logic here
})

process.on('uncaughtException', (err) => {
  logger.error('uncaughtException', err)
  // application specific logging, throwing an error, or other logic here
})
