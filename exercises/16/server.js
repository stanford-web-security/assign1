const { createServer } = require('../common/server')
const { getResults, htmlAttributeEscape, getLanguageVarsFromRequest } = require('../common/hackoogle')

const { router } = createServer(4150, __dirname)

router.get('/', async (req, res) => {
  res.render('hackoogle-home-page')
})

router.get('/search', async (req, res) => {
  let q = req.query.q
  if (q == null) q = ''

  const rawQ = q
  q = htmlAttributeEscape(q).replace(/<\//g, '')

  const languageVars = getLanguageVarsFromRequest(req)

  const results = await getResults(q)
  res.render('hackoogle-search-page5', {
    q,
    rawQ,
    results,
    ...languageVars
  })
})
