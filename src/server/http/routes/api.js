import { Router } from 'express'
import Haikunator from 'haikunator'

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

const haikunator = new Haikunator({
  defaults: {}
})

const generateName = () => {
  const segments = haikunator.haikunate().split('-')
  const capitalized = segments.map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
  return capitalized.join('-')
}

export default (version, db) => {
  const router = Router()

  router.get('/', (req, res) => {
    res.status(200).json(`Hello 🥞. API version ${version}`)
  })

  router.get('/pancakes', asyncHandler(async (req, res) => {
    const rows = await db.pancakes.find({}, {
      order: [{
        field: 'createdAt', direction: 'asc'
      }]
    })
    res.status(200).json(rows)
  }))

  router.post('/pancakes', asyncHandler(async (req, res) => {
    const row = await db.pancakes.save({
      name: generateName(),
      createdAt: new Date(),
      ready: !!req.body.ready
    })
    res.status(201).json(row)
  }))

  router.get('/pancake/:id', asyncHandler(async (req, res) => {
    const { id } = req.params
    const pancake = await db.pancakes.findOne({ id })
    if (!pancake) {
      res.status(404).json('not found')
    } else {
      res.status(200).json(pancake)
    }
  }))

  router.patch('/pancake/:id', asyncHandler(async (req, res) => {
    const { id } = req.params
    const params = {
      ready: req.body.ready
    }
    const row0 = await db.pancakes.findOne({ id })
    if (row0) {
      const row1 = { ...row0, ...params }
      const row2 = await db.pancakes.save(row1)
      if (row2) {
        res.status(200).json(row2)
      } else {
        throw Error(`could not PATCH pancake id: ${id}`)
      }
    } else {
      res.status(404).json('not found')
    }
  }))

  router.delete('/pancake/:id', asyncHandler(async (req, res) => {
    const { id } = req.params
    const rows = await db.pancakes.destroy({ id })
    if (rows.length) {
      res.status(200).json('deleted')
    } else {
      res.status(404).json('not found')
    }
  }))

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
