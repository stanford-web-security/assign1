const { createServer } = require('../common/server')
const { getResults, getLanguageVarsFromRequest } = require('../common/caloogle')

const { router } = createServer(4140, __dirname)

router.get('/', async (req, res) => {
  res.render('caloogle-home-page')
})

router.get('/search', async (req, res) => {
  let q = req.query.q
  if (q == null) q = ''

  const rawQ = q

  const languageVars = getLanguageVarsFromRequest(req)

  const results = await getResults(q)
  res.render('caloogle-search-page4', {
    rawQ,
    results,
    ...languageVars
  })
})
