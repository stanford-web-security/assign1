const { createServer } = require('../common/server')
const { getResults } = require('../common/hackoogle')

const { router } = createServer(4090, __dirname)

router.get('/', async (req, res) => {
  res.render('hackoogle-home-page')
})

router.get('/search', async (req, res) => {
  let q = req.query.q
  if (q == null) q = ''

  q = htmlElementEscape(q)

  const results = await getResults(q)
  res.render('hackoogle-search-page-2', { q, results })
})

function htmlElementEscape (str) {
  return str
    // Without the '<' character, no HTML tags an be created.
    .replace(/</g, '&lt;')

    // This is not for security, but because '&' is the HTML escape character
    // and we don't want the user's input to be treated as an escape sequence.
    .replace(/&/g, '&amp;')
}
