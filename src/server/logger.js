import { createLogger, transports, format } from 'winston'
const { combine, timestamp, printf } = format

const logFormat = printf(info => {
  return `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`
})

const logger = createLogger({
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    new transports.Console({
      level: process.env.LOG_LEVEL || 'info',
      colorize: true,
      timestamp: () => new Date()
    })
  ]
})

export default logger
