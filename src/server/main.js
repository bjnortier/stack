#!/usr/bin/env babel-node
import '@babel/polyfill'

import logger from './logger'
import createHTTP from './http/createHTTP'
import ensureEnvExists from './ensureEnvExists'

const requiredEnvs = ['PORT', 'SESSION_SECRET']
if (process.env.NODE_ENV === 'production') {
  requiredEnvs.push('REDIS_URL')
}
ensureEnvExists(requiredEnvs)

const start = async () => {
  try {
    await createHTTP(process.env.PORT)
    logger.info('Stack is ready 🥞.')
  } catch (err) {
    logger.error(err.stack)
    process.exit(1)
  }
}
start()
