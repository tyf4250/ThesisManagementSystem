export default (adapter) => (config) => {
  if (config.cache) {
    const key = config.url
    let val
    try {
      val = sessionStorage.getItem(key)
      if (val) {
        return Promise.resolve(val)
      }
    } catch (err) {
      console.log(err)
    }
    return (async () => {
      const res = await adapter(config)
      try {
        sessionStorage.setItem(key, res)
        return res
      } catch (err) {
        return res
      }
    })()
  }
  return adapter(config)
}
