After their last defeat, they're getting really frustrated with your attacks.

They decide to just iterate repeatedly until all your hackery is removed from the input. But there's a problem with their approach.

```js
router.get('/search', async (req, res) => {
  let q = req.query.q
  if (q == null) q = ''

  let oldQ
  while (q !== oldQ) {
    oldQ = q
    q = q.replace(/script/g, '')
  }

  const results = await getResults(q)
  res.render('caloogle-search-page', { q, results })
})
```

## Goal

Can you think of a way to defeat their improved sanitization code and get your `<script>` tag into the page using the search input field?

<iframe src='http://caloogle.xyz:4040'></iframe>

Before you move on to the next exercise, remember to copy your "attack input" (the malicious input string, not the URL) into the `SOLUTIONS.md` file.

## Note

Your solution must involve a `<script>` tag.
