const { createServer } = require('../common/server')
const { getResults } = require('../common/hackoogle')

const { router } = createServer(4130, __dirname)

router.get('/', async (req, res) => {
  res.render('hackoogle-home-page')
})

router.get('/search', async (req, res) => {
  let q = req.query.q
  if (q == null) q = ''

  let lang = req.query.lang
  if (lang == null) lang = 'en' // default language: english

  const rawQ = q

  const url = new URL(req.url, 'http://example.com')
  const enUrl = new URL(url)
  enUrl.searchParams.set('lang', 'en')
  const esUrl = new URL(url, 'http://example.com')
  esUrl.searchParams.set('lang', 'es')
  const deUrl = new URL(url, 'http://example.com')
  deUrl.searchParams.set('lang', 'de')

  let searchText = 'Search'
  if (lang === 'es') {
    searchText = 'Buscar'
  } else if (lang === 'de') {
    searchText = 'Suche'
  }

  let languagesText = 'Languages'
  if (lang === 'es') {
    languagesText = 'Idiomas'
  } else if (lang === 'de') {
    languagesText = 'Sprachen'
  }

  let resultsForText = 'Results for'
  if (lang === 'es') {
    resultsForText = 'Resultados para'
  } else if (lang === 'de') {
    resultsForText = 'Ergebnisse für'
  }

  const results = await getResults(q)
  res.render('hackoogle-search-page4', {
    rawQ,
    results,
    lang,
    enUrl,
    esUrl,
    deUrl,
    searchText,
    languagesText,
    resultsForText
  })
})
