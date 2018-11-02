const createRoute = (name, options) => (ctx, next) => {
  let params

  if (options.method.toLowerCase() === 'get') {
    params = ctx.request.query
  } else if (options.method.toLowerCase() === 'post') {
    params = ctx.request.body
  }

  let str = options.serialString.replace(/\%\(name\)/g, name)
  for (let k in options.params) {
    str = str.replace(new RegExp(`\\%\\(${k}\\)`, 'g'), params[k] ? params[k] : null)
  }

  ctx.serial.send(str)

  ctx.response.status = 204

  next()
}

export default createRoute
