Your competitor is fed up with the lackluster results from the UC Berkeley graduate and decide to hire a Stanford student who has completed [CS 253: Web Security](https://cs253.stanford.edu) instead. They are able to quickly implement a foolproof `htmlElementEscape()` function which defeats your shenanigans once and for all.

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

Now all your competitor needs to do is call this function whenever they put untrusted data directly into the HTML body somewhere, i.e. tags like `div`, `p`, `b`, `td`, etc.

So, their updated route handler code looks like this now:

```js
router.get('/search', async (req, res) => {
  let q = req.query.q
  if (q == null) q = ''

  q = htmlElementEscape(q)

  const results = await getResults(q)
  res.render('caloogle-search-page', { q, results })
})
```

It seems like we're out of luck for now...

<a href='#' onclick="window.postMessage('success', '*')">Click this link to call success()</a> and complete this exercise.
