module.exports = {
  createServer
}

const express = require('express')
const Router = require('express-promise-router')
const { basename, join } = require('path')

const COMMON_PATH = __dirname
const ROOT_PATH = join(__dirname, '..', '..')

function createServer (port, serverDirname) {
  const app = express()

  app.set('view engine', 'ejs')
  app.set('views', [serverDirname, COMMON_PATH])

  const router = new Router()
  app.use(router)

  router.use(express.static(join(serverDirname, '..', 'static')))
  router.use(express.static(join(COMMON_PATH, 'static')))
  router.use(express.static(join(ROOT_PATH, 'static')))

  router.use(async (req, res) => {
    res.set('X-XSS-Protection', '0')
    res.locals.exerciseId = Number(basename(serverDirname))
    return 'next'
  })

  app.listen(port, '127.0.0.1')

  return { app, router }
}
