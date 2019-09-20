The security consultant is getting fed up with all these cat-and-mouse games. They realize that if they prevent you from using certain "critical" characters then all your attacks would stop working.

They also realize that you've been stealing their source code which has made it much easier for you to figure out the weaknesses in their system. So they've shut down that attack vector. You're going to have to rely on your ingenuity to figure out what their code is doing by trying out different inputs and seeing what ends up in the resulting page's HTML.

```js
router.get('/search', async (req, res) => {
  // TOP SECRET –– REDACTED
})
```

Note: Do not attempt to look at the server's **server-side source code** to see what the `/search` route handler is doing. This is not in the spirit of this exercise. You can, of course, continue to view the HTML source of the pages that the server sends back to the client.

## Goals

1. Find the XSS vulnerability in the search input field. You can use any HTML tag you like.

1. Write out the code that you believe the server must be executing to process the input.

## Tip

Try submitting various inputs and then look at the HTML source of the `<iframe>` to figure out what their sanitization code must be doing.

<iframe src='http://caloogle.xyz:4080'></iframe>

Before you move on to the next exercise, remember to copy your "attack input" as well as your server code into the `SOLUTIONS.md` file.
