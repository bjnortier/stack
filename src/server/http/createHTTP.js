import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import compression from 'compression'
import { createServer } from 'http'
import expressWinston from 'express-winston'
import exphbs from 'express-handlebars'
import helmet from 'helmet'
import session from 'express-session'
import connectRedis from 'connect-redis'
import webpack from 'webpack'

import logger from '../logger'
import { notFoundMiddleware, renderErrorMiddleware, createFatalHandler } from './errorHandling'
import createAppRouter from './routes/app'
import createAPIRouter from './routes/api'
import { version } from '../../../package.json'
import webpackConfig from '../../../webpack.config'

// ---------- EXPRESS ----------

export default (port, db) => {
  const app = express()
  app.set('version', version)
  app.use(helmet())
  app.use(compression())

  // ---------- Session ----------

  const sessionConfig = {
    store: new (connectRedis(session))({ url: process.env.REDIS_URL }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 48 * 60 * 60 * 1000 } // 48 hours
  }
  if (process.env.NODE_ENV === 'production') {
    sessionConfig.cookie.secure = true
    sessionConfig.proxy = true
  }
  app.use(session(sessionConfig))

  // ---------- Logging ----------

  app.use(expressWinston.logger({
    winstonInstance: logger,
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}}'
  }))

  // ---------- ROUTES ----------

  if (process.env.NODE_ENV !== 'production') {
    const webpackCompiler = webpack(webpackConfig)
    app.use(require('webpack-dev-middleware')(webpackCompiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    }))
  }

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(express.static(path.join(__dirname, '..', '..', '..', 'public')))
  app.engine('.hbs', exphbs({
    defaultLayout: 'default',
    extname: '.hbs'
  }))
  app.set('view engine', '.hbs')
  app.use('/app', createAppRouter())
  app.use('/api', createAPIRouter(version, db))

  // ---------- Error handlers ----------

  // 404 and error rendering
  app.use(notFoundMiddleware)
  app.use(renderErrorMiddleware)

  const server = createServer(app)
  server.on('error', createFatalHandler(server, port))
  server.listen(port)
  return new Promise((resolve, reject) => {
    server.on('listening', () => {
      const address = server.address()
      logger.info(`HTTP listening ${address.address}:${address.port}`)
      resolve(server)
    })
  })
}
