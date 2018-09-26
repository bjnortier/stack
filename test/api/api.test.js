import supertest from 'supertest'

import {
  before as commonBefore,
  after as commonAfter
} from './common'

describe('Basics', () => {
  before(async () => {
    await commonBefore()
  })
  after(async () => {
    await commonAfter()
  })

  let request = supertest.agent(`http://localhost:${process.env.PORT}`)

  it('has a welcome message', async () => {
    await request
      .get('/api')
      .expect(200, '"Hello 🥞. API version 0.1.0"')
  })

  it('returns 500 on internal error', async () => {
    await request
      .get('/api/exception')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(500, '"something went wrong"')
  })

  it('returns a JSON not found', async () => {
    await request
      .get('/api/foo')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(404, '"not found"')
  })
})
