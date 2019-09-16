const { createServer } = require('../../common/server')
const { getResults } = require('../../common/hackoogle')

const { router } = createServer(4080, __dirname)

router.get('/', async (req, res) => {
  res.render('hackoogle-home-page')
})

router.get('/search', async (req, res) => {
  let q = req.query.q
  if (q == null) q = ''
  const results = await getResults(q)

  q = q.replace(/</, '').replace(/>/, '')

  res.render('hackoogle-search-page', { q, results })
})
