import Router from 'koa-router'
import createRoute from './createroute'

const createRouter = routes => {
  const router = new Router()

  for (let k in routes) {
    if (routes.hasOwnProperty(k)) {
      router[routes[k].method.toLowerCase()](`/${k}`, createRoute(k, routes[k]));
    }
  }

  return router
}

export default createRouter
