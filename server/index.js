const appConfig = require('application-config')
const express = require('express')
const remark = require('remark')
const remarkHighlight = require('remark-highlight.js')
const remarkHtml = require('remark-html')
const remarkRecommended = require('remark-preset-lint-recommended')
const Router = require('express-promise-router')
const { join } = require('path')
const { promisify } = require('util')
const { readFile } = require('fs').promises

const PORT = 4000
const ROOT_PATH = join(__dirname, '..')
const EXERCISES_PATH = join(ROOT_PATH, 'exercises')

const pkg = require(join(ROOT_PATH, 'package.json'))

const cfg = appConfig(pkg.name)

const _readConfig = promisify(cfg.read.bind(cfg))
const readConfig = async function readConfig () {
  return {
    // Default config file
    currentExcercise: 0,
    ...(await _readConfig())
  }
}
const writeConfig = promisify(cfg.write.bind(cfg))
const trashConfig = promisify(cfg.trash.bind(cfg))

const exercises = require(join(EXERCISES_PATH, 'exercises.json'))
numberExcercises(exercises)

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
    res.locals.config = await readConfig()

    return 'next'
  })

  router.get('/:id', async (req, res) => {
    const id = Number(req.params.id)
    if (Number.isNaN(id)) return 'next'

    const exerciseName = exercises.find(exercise => exercise.id === id).name

    let file = `<h1>Exercise ${id} – ${exerciseName}</h1>\n`

    let problemMd
    try {
      const problemMdPath = join(EXERCISES_PATH, String(id), 'problem.md')
      problemMd = await readFile(problemMdPath)
    } catch (err) {
      return 'next'
    }

    file += await remark()
      .use(remarkRecommended)
      .use(remarkHighlight)
      .use(remarkHtml)
      .process(problemMd)

    res
      .render('layout', {
        title: `Exercise ${id} – ${exerciseName}`,
        content: String(file)
      })
  })

  router.post('/success/:id', async (req, res) => {
    const id = Number(req.params.id)
    if (Number.isNaN(id)) return 'next'

    const config = await readConfig()

    if (id === config.currentExcercise) {
      config.currentExcercise = id + 1
    }
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
      console.error(`Could not start server for excercise ${exercise.id}: ${err.message}`)
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
