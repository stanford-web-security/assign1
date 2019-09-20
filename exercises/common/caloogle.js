module.exports = {
  getResults,
  getLanguageVarsFromRequest,
  htmlElementEscape,
  htmlAttributeEscape,
  htmlEscape
}

const got = require('got')

async function getResults (q) {
  const searchUrl = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(q)}`

  let body
  try {
    const res = await got(searchUrl, { json: true })
    body = res.body
  } catch (err) {}

  const results = ((body && body.hits) || [])
    .map(hit => ({
      title: hit.title || hit.story_title,
      url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`
    }))

  return results
}

function getLanguageVarsFromRequest (req) {
  let lang = req.query.lang
  if (lang == null) lang = 'en' // default language: english

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

  return {
    lang,
    enUrl,
    esUrl,
    deUrl,
    searchText,
    languagesText,
    resultsForText
  }
}

function htmlElementEscape (str) {
  return str
    // This is not for security, but because '&' is the HTML escape character
    // and we don't want the user's input to be treated as an escape sequence.
    .replace(/&/g, '&amp;')

    // Without the '<' character, no HTML tags an be created.
    .replace(/</g, '&lt;')
}

function htmlAttributeEscape (str) {
  return str
    // This is not for security, but because '&' is the HTML escape character
    // and we don't want the user's input to be treated as an escape sequence.
    .replace(/&/g, '&amp;')

    // Without the single quote character, the attacker cannot escape from
    // inside a single-quoted HTML attribute.
    .replace(/'/g, '&apos;')

    // Without the double quote character, the attacker cannot escape from
    // inside a double-quoted HTML attribute.
    .replace(/"/g, '&quot;')
}

function htmlEscape (str) {
  return str
    // This is not for security, but because '&' is the HTML escape character
    // and we don't want the user's input to be treated as an escape sequence.
    .replace(/&/g, '&amp;')

    // Without the '<' character, no HTML tags an be created.
    .replace(/</g, '&lt;')

    // Without the single quote character, the attacker cannot escape from
    // inside a single-quoted HTML attribute.
    .replace(/'/g, '&apos;')

    // Without the double quote character, the attacker cannot escape from
    // inside a double-quoted HTML attribute.
    .replace(/"/g, '&quot;')
}
