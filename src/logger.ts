import { createLogger, format, transports } from 'winston'

const logger = createLogger({
  level: 'info',
  format: format.prettyPrint(),
  transports: [
    new transports.Console()
  ]
})

export default logger
