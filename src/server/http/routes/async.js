import logger from '../../logger'

/**
 * Adapted from https://www.npmjs.com/package/express-async-handler
 * Return 500 + json on exception
 */
export const wrapJSON = fn => function asyncUtilWrap (req, res, next, ...args) {
  const fnReturn = fn(req, res, next, ...args)
  return Promise.resolve(fnReturn).catch(err => {
    logger.error(err.message)
    logger.error(err.stack)
    res.status(500).json('something went wrong')
  })
}
