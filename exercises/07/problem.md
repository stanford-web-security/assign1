The consultant is cleverer than you expected and was watching the server logs right when you did the last attack. They spotted your handiwork and were able to react quickly with a fix.

You know their fix is probably still broken in some way, though. You dive into the code to search for the mistake you know must exist. 😆

```js
router.get('/search', async (req, res) => {
  let q = req.query.q
  if (q == null) q = ''

  let oldQ
  while (q !== oldQ) {
    oldQ = q
    q = q.replace(/script|onerror=|onload=/gi, '')
  }

  const results = await getResults(q)
  res.render('caloogle-search-page', { q, results })
})
```

## Goal

Find the XSS vulnerability in the search input field. You should **not** use a `<script>` tag in this attack.

<iframe src='http://caloogle.xyz:4070'></iframe>

Before you move on to the next exercise, remember to copy your "attack input" into the `SOLUTIONS.md` file.
