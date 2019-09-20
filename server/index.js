const appConfig = require('application-config')
const express = require('express')
const minimist = require('minimist')
const open = require('open')
const remark = require('remark')
const remarkExternalLinks = require('remark-external-links')
const remarkHighlight = require('remark-highlight.js')
const remarkHtml = require('remark-html')
const remarkRecommended = require('remark-preset-lint-recommended')
const Router = require('express-promise-router')
const cors = require('cors')
const { join } = require('path')
const { promisify } = require('util')
const { readFile } = require('fs').promises

const argv = minimist(process.argv.slice(2), {
  boolean: ['open'],
  default: {
    open: true
  }
})

const PORT = 4000
const ROOT_PATH = join(__dirname, '..')
const EXERCISES_PATH = join(ROOT_PATH, 'exercises')

const pkg = require(join(ROOT_PATH, 'package.json'))

const cfg = appConfig(`cs253-${pkg.name}`)

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

    const { config } = res.locals

    let problemMd
    try {
      const problemMdPath = join(getExercisePath(id), 'problem.md')
      problemMd = await readFile(problemMdPath)
    } catch (err) {
      return 'next'
    }

    const exerciseName = exercises.find(exercise => exercise.id === id).name
    let content = `<h1>Exercise ${id} – ${exerciseName}</h1>\n`

    if (id > config.currentExcercise) {
      content += '<p>Please complete the earlier excercises first.</p>\n'
    } else {
      content += await remark()
        .use(remarkRecommended)
        .use(remarkHighlight)
        .use(remarkExternalLinks)
        .use(remarkHtml)
        .process(problemMd)
    }

    res
      .render('layout', {
        title: `Exercise ${id} – ${exerciseName}`,
        content
      })
  })

  const corsOpts = {
    origin: function (origin, cb) {
      const url = new URL(origin)
      if (url.hostname === 'localhost' || url.hostname === 'caloogle.xyz') {
        cb(null, true)
      } else {
        cb(new Error('Not allowed by CORS'))
      }
    }
  }

  router.post('/success/:id', cors(corsOpts), async (req, res) => {
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

  app.listen(PORT, '127.0.0.1', () => {
    const url = `http://localhost:${PORT}`
    console.log(`Server running on ${url}`)
    if (argv.open) open(url)
  })
}

async function initExercises () {
  exercises.forEach(exercise => {
    if (exercise.heading || exercise.server === false) return
    const exerciseEntryPoint = join(getExercisePath(exercise.id), 'server')
    try {
      require(exerciseEntryPoint)
    } catch (err) {
      console.error(`Could not start server for excercise ${exercise.id}: ${err.message}`)
    }
  })
}

function getExercisePath (id) {
  if (id < 10) id = `0${id}`
  else id = String(id)

  return join(EXERCISES_PATH, id)
}
