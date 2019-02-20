#!/usr/bin/env babel-node
import '@babel/polyfill'
import massive from 'massive'

import logger from './logger'
import createHTTP from './http/createHTTP'
import ensureEnvExists from './ensureEnvExists'

const requiredEnvs = ['PORT', 'DATABASE_URL', 'SESSION_SECRET']
if (process.env.NODE_ENV === 'production') {
  requiredEnvs.push('REDIS_URL')
}
ensureEnvExists(requiredEnvs)

const start = async () => {
  try {
    const db = await massive({ connectionString: process.env.DATABASE_URL })
    await createHTTP(process.env.PORT, db)
    logger.info('Stack is ready 🥞.')
    // await opn(`http://localhost:${process.env.PORT}`, { app: 'google chrome' })
  } catch (err) {
    logger.error(err.stack)
    process.exit(1)
  }
}
start()
