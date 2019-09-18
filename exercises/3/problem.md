

```js
router.get('/search', async (req, res) => {
  let q = req.query.q
  if (q == null) q = ''
  const results = await getResults(q)

  q = q.replace(/script/gi, '')
  res.render('hackoogle-search-page', { q, results })
})
```

You should be able to make a small change to your "attack input" from the last exercise and it should continue to work against their users. Let the pwnage continue!

<iframe src='http://localhost:4030'></iframe>

Before you move on to the next exercise, remember to copy your "attack input" into the `SOLUTIONS.md` file.
