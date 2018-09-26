import massive from 'massive'

import ensureEnvExists from '../../src/server/ensureEnvExists'
import createHTTP from '../../src/server/http/createHTTP'

ensureEnvExists(['PORT', 'SESSION_SECRET', 'DATABASE_URL'])

let db
let server

export const before = async () => {
  db = await massive({ connectionString: process.env.DATABASE_URL })
  server = await createHTTP(process.env.PORT, db)
}

export const after = async () => {
  await server.close()
  db.pgp.end()
}

export const beforeEach = async () => {
  await db.pancakes.destroy({})
}
