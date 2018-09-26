import ensureEnvExists from '../../src/server/ensureEnvExists'
import createHTTP from '../../src/server/http/createHTTP'

ensureEnvExists(['PORT', 'SESSION_SECRET'])

let server

export const before = async () => {
  server = await createHTTP(process.env.PORT)
}

export const after = async () => {
  await server.close()
}

export const beforeEach = async () => {
}
