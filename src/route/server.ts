import express from 'express'
import globby from 'globby'
import morgan from 'morgan'
import cors from 'cors'
import logger from '../logger'
const app = express()

const SKIP_URL = [
  '/health', '/'
]
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev', {
    skip: (req, _) => SKIP_URL.includes(req.url),
    stream: {
      write: (message) => {
        logger.info(message)
      }
    }
  }))
} else {
  app.use(morgan('combined', {
    skip: (req, _) => SKIP_URL.includes(req.url),
    stream: {
      write: (message) => {
        logger.info(message)
      }
    }
  }))
}

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))

globby.sync('./*.controller.{ts,js}', { cwd: __dirname }).forEach((file) => {
  import(`./${file}`).then((module) => {
    app.use(module.default)
  }).catch((err) => {
    logger.error(err)
  })
})

export default app