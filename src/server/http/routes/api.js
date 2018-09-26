import { Router } from 'express'

import logger from '../../logger'

/**
 * Adapted from https://www.npmjs.com/package/express-async-handler
 * Return 500 + json on exception
 */
const asyncHandler = fn => function asyncUtilWrap (req, res, next, ...args) {
  const fnReturn = fn(req, res, next, ...args)
  return Promise.resolve(fnReturn).catch(err => {
    logger.error(err.message)
    logger.error(err.stack)
    res.status(500).json('something went wrong')
  })
}

export default () => {
  const router = Router()

  router.get('/', (req, res) => {
    res.status(200).json(`Hello 🥞. API version ${req.app.get('version')}`)
  })

  if (process.NODE_ENV !== 'production') {
    router.get('/exception', asyncHandler(async (req, res) => {
      throw Error('Mock error')
    }))
  }

  router.all('*', (req, res) => {
    res.status(404).json('not found')
  })

  return router
}
