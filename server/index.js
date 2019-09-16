const appConfig = require('application-config')
const express = require('express')
const html = require('remark-html')
const recommended = require('remark-preset-lint-recommended')
const remark = require('remark')
const Router = require('express-promise-router')
const { join } = require('path')
const { promisify } = require('util')
const { readFile } = require('fs').promises

const exercises = require('./exercises.json')

numberExcercises(exercises)

const PORT = 4000
const ROOT_PATH = join(__dirname, '..')
const EXERCISES_PATH = join(ROOT_PATH, 'exercises')

const cfg = appConfig(require(join(ROOT_PATH, 'package.json')).name)
const readConfig = promisify(cfg.read.bind(cfg))
const writeConfig = promisify(cfg.write.bind(cfg))
const trashConfig = promisify(cfg.trash.bind(cfg))

init()
initExercises()

function init () {
  const app = express()

  app.set('view engine', 'ejs')
  app.set('views', join(ROOT_PATH, 'server'))

  const router = new Router()
  app.use(router)

  router.use(express.static(join(ROOT_PATH, 'static')))

  router.get('/', async (req, res) => {
    res.redirect('/0')
  })

  router.use(async (req, res) => {
    res.locals.exercises = exercises

    let config
    try {
      config = await readConfig()
    } catch (err) {
      config = {}
    }
    res.locals.config = config

    return 'next'
  })

  router.get('/:id', async (req, res) => {
    const id = Number(req.params.id)
    if (Number.isNaN(id)) return 'next'

    let problemMd
    try {
      const problemMdPath = join(EXERCISES_PATH, String(id), 'problem.md')
      console.log(problemMdPath)
      problemMd = await readFile(problemMdPath)
    } catch (err) {
      return 'next'
    }

    const file = await remark()
      .use(recommended)
      .use(html)
      .process(problemMd)

    res
      .render('layout', {
        title: `Assignment 1 – Exercise ${id}`,
        content: String(file)
      })
  })

  router.post('/success/:id', async (req, res) => {
    const id = Number(req.params.id)
    if (Number.isNaN(id)) return 'next'

    let config
    try {
      config = await readConfig()
    } catch (err) {
      config = {}
    }
    config[id] = true
    await writeConfig(config)

    res.send(config)
  })

  router.get('/trash', async (req, res) => {
    await trashConfig()
    res.redirect('/')
  })

  router.get('*', async (req, res) => {
    res
      .status(404)
      .render('layout', {
        title: '404 – Page Not Found',
        content: '<h1>404 – Page Not Found</h1>'
      })
  })

  app.listen(PORT, '127.0.0.1')
}

async function initExercises () {
  exercises.forEach(exercise => {
    if (!exercise.id) return
    const exerciseEntryPoint = join(EXERCISES_PATH, String(exercise.id), 'server')
    try {
      require(exerciseEntryPoint)
    } catch (err) {
      console.error(`Could not start server for excercise ${exercise.id}`)
    }
  })
}

function numberExcercises (exercises) {
  let id = 0
  exercises.forEach(exercise => {
    if (exercise.heading) return
    exercise.id = id
    id += 1
  })
}
