Your competitor realizes that you've found a way around their hotfix. They quickly jump into action and make another change to defend against your last attack.

They don't have good engineering practices, so they deploy their fix straight to production without a code review. You should teach them a lesson that they won't soon forget. Hack them so thoroughly that they're sent back to pre-seed stage!

```js
router.get('/search', async (req, res) => {
  let q = req.query.q
  if (q == null) q = ''

  q = q.replace(/script/gi, '')

  const results = await getResults(q)
  res.render('caloogle-search-page', { q, results })
})
```

## Goal

Can you think of a way to defeat their improved sanitization code and get your `<script>` tag into the page using the search input field?

<iframe src='http://caloogle.xyz:4030'></iframe>

Before you move on to the next exercise, remember to copy your "attack input" (the malicious input string, not the URL) into the `SOLUTIONS.md` file.

## Note

Your solution must involve a `<script>` tag.
