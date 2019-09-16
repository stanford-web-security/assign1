const { createServer } = require('../../common/server')
const { getResults } = require('../../common/hackoogle')

const { router } = createServer(4070, __dirname)

router.get('/', async (req, res) => {
  res.render('hackoogle-home-page')
})

router.get('/search', async (req, res) => {
  let q = req.query.q
  if (q == null) q = ''
  const results = await getResults(q)

  let oldQ
  while (q !== oldQ) {
    oldQ = q
    q = q.replace(/<script>|onerror|onload/gi, '')
  }

  res.render('hackoogle-search-page', { q, results })
})
