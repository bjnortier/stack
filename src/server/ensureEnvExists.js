import logger from './logger'

export default (keys) => {
  keys.map(key => {
    if (process.env[key] === undefined) {
      logger.error(`environment variable ${key} not defined`)
      process.exit(1)
    }
  })
}
