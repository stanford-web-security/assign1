const { createServer } = require('../common/server')
const { getResults, htmlElementEscape } = require('../common/caloogle')

const { router } = createServer(4100, __dirname)

router.get('/', async (req, res) => {
  res.render('caloogle-home-page')
})

router.get('/search', async (req, res) => {
  let q = req.query.q
  if (q == null) q = ''

  const rawQ = q
  q = htmlElementEscape(q)

  const results = await getResults(q)
  res.render('caloogle-search-page2', { q, rawQ, results })
})
