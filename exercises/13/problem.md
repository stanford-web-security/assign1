Fed up with the lackluster results defending against your attacks, your competitor hires a Stanford student who has completed [CS 253: Web Security](https://cs253.stanford.edu) again. Later, you'll have to have a talk with these students about working for your enemies.

In the meantime, your competitors is able to implement a foolproof `htmlAttributeEscape()` function which defeats you for now... 😔

Please read the code for `htmlAttributeEscape()` and ensure you understand how it works in detail.

```js
function htmlAttributeEscape (str) {
  return str
    // This is not for security, but because '&' is the HTML escape character
    // and we don't want the user's input to be treated as an escape sequence.
    .replace(/&/g, '&amp;')

    // Without the single quote character, the attacker cannot escape from
    // inside a single-quoted HTML attribute.
    .replace(/'/g, '&apos;')

    // Without the double quote character, the attacker cannot escape from
    // inside a double-quoted HTML attribute.
    .replace(/"/g, '&quot;')
}
```

Now all your competitor needs to do is call this function whenever they put untrusted data directly into HTML attributes i.e. `<div class='UNTRUSED INPUT HERE'>`.

So, their updated route handler code looks like this now:

```js
router.get('/search', async (req, res) => {
  let q = req.query.q
  if (q == null) q = ''

  q = htmlAttributeEscape(q)

  const results = await getResults(q)
  res.render('caloogle-search-page', { q, results })
})
```

It seems like we're out of luck for now...

<a href='#' onclick="window.postMessage('success', '*')">Click this link to call success()</a> and complete this exercise.
