Your competitor is finally fed up with the lackluster results from the UC Berkeley graduate and decide to hire a student who has completed CS 253: Web Security. They are able to quickly implement a foolproof `htmlElementEscape()` function which defeats your shenanigans once and for all.

Please read the code for `htmlElementEscape()` and ensure you understand how it works in detail.

```js
function htmlElementEscape (str) {
  return str
    // This is not for security, but because '&' is the HTML escape character
    // and we don't want the user's input to be treated as an escape sequence.
    .replace(/&/g, '&amp;')

    // Without the '<' character, no HTML tags an be created.
    .replace(/</g, '&lt;')
}
```

Now all your competitor needs to do is call this function whenever they put untrusted data directly into the HTML body somewhere. This includes inside normal tags like `div`, `p`, `b`, `td`, etc.

So, their updated route handler code looks like this now:

```js
router.get('/search', async (req, res) => {
  let q = req.query.q
  if (q == null) q = ''

  q = htmlElementEscape(q)

  const results = await getResults(q)
  res.render('hackoogle-search-page', { q, results })
})
```

Dang, it seems we're out of luck.

But around the same time that your competitor deployed the new version of their site that uses `htmlElementEscape()` to fix the vulnerability once and for all, you noticed that they also released a new feature. They call the new feature "Competitor Comparison" and it includes links to competitor search engines so that users can compare search results between all the competitors.

They appear to be using the `htmlElementEscape()` function to generate these links so they're guaranteed to be safe. Or are they?

## Goal

Find the XSS vulnerability. You can use any HTML that you want.

<iframe src='http://localhost:4090'></iframe>

Before you move on to the next exercise, remember to copy your "attack input" into the `SOLUTIONS.md` file.
