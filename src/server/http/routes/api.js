import { Router } from 'express'

export default () => {
  const router = Router()

  router.get('/', (req, res) => {
    res.status(200).json(`Hello 🥞. API version ${req.app.get('version')}`)
  })

  router.all('*', (req, res) => {
    res.status(404).json('not found')
  })

  return router
}
