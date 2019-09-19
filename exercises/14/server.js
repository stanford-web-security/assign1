const { createServer } = require('../common/server')
const { getResults } = require('../common/hackoogle')

const { router } = createServer(4140, __dirname)

router.get('/', async (req, res) => {
  res.render('hackoogle-home-page')
})

router.get('/search', async (req, res) => {
  let q = req.query.q
  if (q == null) q = ''

  const rawQ = q
  q = q.replace(/"/g, '')

  const results = await getResults(q)
  res.render('hackoogle-search-page3', { q, rawQ, results })
})
