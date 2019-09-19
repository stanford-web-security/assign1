Your competitor's `htmlElementEscape()` function is working quite well and you haven't been able to attack their users in the wild ever since they deployed it. It's a lot harder to be a disruptive startup when you can't XSS your competitors and now you're not so sure you're going to be able to get that next round of funding. This is a huge bummer.

Fortunately, your competitor has just deployed the new version of their site that includes a new feature. Perhaps there's a new XSS vulnerability in it?

The feature is called "Competitor Comparison" and it includes links to competitor search engines so that users can compare search results and decide which search engine is best. Clearly, they feel pretty confident that their results are the best.

They appear to be using the `htmlElementEscape()` function to generate the HTML for these links so you think they're guaranteed to be safe. After all, that function was supposed to be foolproof.

Or was it?

## Goal

Find the XSS vulnerability in their code. You can use any HTML that you want.

## Tip

You may need to look at the HTML source of the `<iframe>`.

<iframe src='http://localhost:4100'></iframe>

Before you move on to the next exercise, remember to copy your "attack input" into the `SOLUTIONS.md` file.
