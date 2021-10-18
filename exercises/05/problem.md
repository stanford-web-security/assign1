They're on to you! They saw your last attack in their server logs and have updated their input sanitization code once again.

```js
router.get('/search', async (req, res) => {
  let q = req.query.q
  if (q == null) q = ''

  let oldQ
  while (q !== oldQ) {
    oldQ = q
    q = q.replace(/script|SCRIPT/g, '')
  }

  const results = await getResults(q)
  res.render('caloogle-search-page', { q, results })
})
```

## Goal

Can you think of a way to defeat their improved sanitization code and get your `<script>` tag into the page using the search input field?

<iframe src='http://caloogle.xyz:4050'></iframe>

Before you move on to the next exercise, remember to copy your "attack input" into the `SOLUTIONS.md` file.

## Note

Your solution must involve a `<script>` tag.
