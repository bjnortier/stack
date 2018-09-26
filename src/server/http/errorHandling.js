import logger from '../logger'

export const notFoundMiddleware = (req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
}

export const renderErrorMiddleware = (err, req, res, next) => {
  res.status(err.status || 500)
  if (err.status !== 404) {
    logger.error(err.stack)
  }
  if (process.env.NODE_ENV === 'production') {
    res.render('error', {
      message: err.message
    })
  } else {
    res.render('error', {
      message: err.message,
      stack: err.stack
    })
  }
}

export const createFatalHandler = (server, port) => {
  return (error) => {
    if (error.syscall !== 'listen') {
      throw error
    }
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        logger.error(`port ${port} requires elevated privileges`)
        process.exit(1)
      case 'EADDRINUSE':
        logger.error(`port ${port} is already in use`)
        process.exit(1)
      default:
        throw error
    }
  }
}
