module.exports = {
  getResults,
  htmlElementEscape,
  htmlAttributeEscape
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
    // inside the HTML attribute value.
    .replace(/'/g, '&apos;')

    // Without the double quote character, the attacker cannot escape from
    // inside the HTML attribute value.
    .replace(/"/g, '&quot;')
}
