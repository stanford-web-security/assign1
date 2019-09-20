const { createServer } = require('../common/server')
const { getResults } = require('../common/caloogle')

const { router } = createServer(4060, __dirname)

router.get('/', async (req, res) => {
  res.render('caloogle-home-page')
})

router.get('/search', async (req, res) => {
  let q = req.query.q
  if (q == null) q = ''

  let oldQ
  while (q !== oldQ) {
    oldQ = q
    q = q.replace(/script/gi, '')
  }

  const results = await getResults(q)
  res.render('caloogle-search-page', { q, results })
})
