Your competitor is on to you! They've figured out what you're up to and they put their best engineering "rockstar" on the case.

Fortunately for you, their best engineer isn't very good.

They attempt to sanitize the search query with a call to [`String.prototype.replace`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace). This is the final code they deploy to production:

```js
router.get('/search', async (req, res) => {
  let q = req.query.q
  if (q == null) q = ''

  q = q.replace(/script/i, '')

  const results = await getResults(q)
  res.render('caloogle-search-page', { q, results })
})
```

## Goal

You should be able to make a small change to your "attack input" from the last exercise and your Reflected XSS attack should continue to work against their users. Unleash more `<script>` pwnage!

<iframe src='http://caloogle.xyz:4020'></iframe>

Before you move on to the next exercise, remember to copy your "attack input" (the malicious input string, not the URL) into the `SOLUTIONS.md` file.

## Note

Your solution must involve a `<script>` tag.
