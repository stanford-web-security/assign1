const { createServer } = require('../common/server')
const { getResults } = require('../common/caloogle')

const { router } = createServer(4120, __dirname)

router.get('/', async (req, res) => {
  res.render('caloogle-home-page')
})

router.get('/search', async (req, res) => {
  let q = req.query.q
  if (q == null) q = ''

  const rawQ = q
  q = q.replace(/"/g, '&quot;')

  const results = await getResults(q)
  res.render('caloogle-search-page3', { q, rawQ, results })
})
