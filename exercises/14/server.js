const { createServer } = require('../common/server')
const { getResults, getLanguageVarsFromRequest } = require('../common/hackoogle')

const { router } = createServer(4130, __dirname)

router.get('/', async (req, res) => {
  res.render('hackoogle-home-page')
})

router.get('/search', async (req, res) => {
  let q = req.query.q
  if (q == null) q = ''

  const rawQ = q

  const languageVars = getLanguageVarsFromRequest(req)

  const results = await getResults(q)
  res.render('hackoogle-search-page4', {
    rawQ,
    results,
    ...languageVars
  })
})
