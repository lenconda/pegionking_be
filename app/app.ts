import 'reflect-metadata'
import kcors from 'kcors'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import { useKoaServer, useContainer } from 'routing-controllers'
import { Container } from 'typedi'
import config from '../config'
import { getConnection } from './database/connection'

getConnection().then(async connection => {
  const app = new Koa()

  app.use(async(ctx, next): Promise<any> => {
    try { await next() } catch (e) {
      ctx.status = e.status || e.httpCode || 403
      ctx.body = {
        status: ctx.status || 403,
        message: e.message,
        data: e.errors ? e.errors : {}
      }
    }
  })

  app.use(kcors())

  app.use(bodyParser())

  if (config.isDev) app.use(logger())

  let port: number = process.env.PORT ? parseInt(process.env.PORT) : 5000

  useContainer(Container)
  useKoaServer(app, {
    routePrefix: '/api',
    controllers: [__dirname + '/controllers/*.{ts,js}'],
    middlewares: [__dirname + '/middlewares/*.{ts,js}'],
    defaults: {
      paramOptions: { required: true }
    },
    defaultErrorHandler: false,
    classTransformer: false,
  }).listen(port)
})
