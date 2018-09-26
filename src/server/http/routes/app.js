import { Router } from 'express'

export default () => {
  const router = Router()

  router.get('*', (req, res) => {
    res.status(200).render('app', { bundle: 'index.bundle.js' })
  })

  return router
}
