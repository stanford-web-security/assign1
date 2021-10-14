Your competitor's `htmlElementEscape()` function is working quite well and you haven't been able to attack their users in the wild ever since they deployed it. It's a lot harder to disrupt the status quo like world-changing startup when you can't XSS your competitors. Now, you're beginning to worry that you might not be able to get that next round of funding. This is a huge bummer.

Fortunately, your competitor just deployed a new version of their site that includes a brand new feature. Perhaps there's a new XSS vulnerability in it?

The feature is called "Competitor Comparison" and it includes links to competitor search engines so that users can compare search results and decide which search engine is best. Clearly, they feel pretty confident that their results are the best.

They appear to be using the foolproof `htmlElementEscape()` function written for them by the Stanford CS 253 student to generate the HTML for these links so you think they're guaranteed to be safe:

```js
router.get('/search', async (req, res) => {
  let q = req.query.q
  if (q == null) q = ''

  q = htmlElementEscape(q)

  const results = await getResults(q)
  res.render('caloogle-search-page', { q, results })
})
```

But upon closer inspection, it appears that they're not using the function correctly. Time to teach them another lesson!

## Goal

Find the XSS vulnerability in the search input field. You can use any HTML you want to run the `success()` function.

## Tip

Try submitting various inputs and then look at the HTML source of the `<iframe>` to figure out how the "sanitized" user input interacts with the context of the HTML source.

<iframe src='http://caloogle.xyz:4100'></iframe>

Before you move on to the next exercise, remember to copy your "attack input" into the `SOLUTIONS.md` file.
