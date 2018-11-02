import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import createRouter from './router'
import SerialInterface from './util/serial'

const start = async ({port = 8080, serialconfig = {}, routes = {}} = {}) => {
  const app = new Koa();

  const serial = new SerialInterface(serialconfig)
  await serial.open()

  const router = createRouter(routes)

  app
    .use(bodyParser())
    .use(async (ctx, next) => {
      ctx.serial = serial
      next()
    })
    .use(router.routes())
    .use(router.allowedMethods())

  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })

  return server
}

export default start
