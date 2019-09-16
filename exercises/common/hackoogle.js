module.exports = {
  getResults
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
