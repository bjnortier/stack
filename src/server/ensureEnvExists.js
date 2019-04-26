export default (keys) => {
  keys.map(key => {
    if (process.env[key] === undefined) {
      throw Error(`environment variable ${key} not defined`)
    }
  })
}
