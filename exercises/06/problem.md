Your competitor can't believe how successful your attacks have been. They are eager to put an end to this cat-and-mouse game. So, they decide to hire a security consultant to help them fix the problem with their approach once-and-for-all.

You decide to put your [social engineering](https://en.wikipedia.org/wiki/Social_engineering_(security)) skills to work and see what you can learn about their newly-hired consultant. After a quick phone call, you're able to learn one critical fact about the consultant: they graduated from UC Berkeley. Your fears are assuaged. With renewed confidence, you take another look at their code to find the inevitable bug you know must exist.

```js
router.get('/search', async (req, res) => {
  let q = req.query.q
  if (q == null) q = ''

  let oldQ
  while (q !== oldQ) {
    oldQ = q
    q = q.replace(/script/gi, '')
  }

  const results = await getResults(q)
  res.render('caloogle-search-page', { q, results })
})
```

## Goal

Find the XSS vulnerability in the search input field. You should **not** use a `<script>` tag in this attack.

<iframe src='http://caloogle.xyz:4060'></iframe>

Before you move on to the next exercise, remember to copy your "attack input" into the `SOLUTIONS.md` file.
