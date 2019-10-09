Your competitor decides to add a guestbook to their website.

Guestbooks were all the rage on websites built in the late 90s and early 00s. In case you're not familiar with the concept, here's a definition:

> On the web, a guestbook is a logging system that allows visitors of a website to leave a public comment. It is possible in some guestbooks for visitors to express their thoughts about the website or its subject. Generally, they do not require the poster to create a user account, as it is an informal method of dropping off a quick message. The purpose of a website guestbook is to display the kind of visitors the site gets, including the part of the world they reside in, and gain feedback from them. This allows the webmaster to assess and improve their site. A guestbook is generally a script, which is usually remotely hosted... – [Wikipedia](https://en.wikipedia.org/wiki/Guestbook)

Upon checking it out, you notice that they're storing comments on the server-side so that later visitors to the guestbook can see comments left by earlier posters. You realize that this could be a perfect opportunity to try a Stored XSS attack!

Your competitor is using an open source Guestbook package, and you were able to figure out which one and which version through some sluething. You download the code to see what you're up against:

```js
router.get('/', async (req, res) => {
  const comments = await getCommentsFromDatabase()
  res.render('caloogle-guestbook-page', { comments })
})

router.post('/comment', async (req, res) => {
  const comment = req.body

  if (comment == null) throw new Error('comment cannot be empty')
  if (comment.text == null) throw new Error('comment.text cannot be empty')

  // if client specifies no id, then use the next id
  if (comment.id == null) comment.id = await getNextAvailableIdFromDatabase()

  await addCommentToDatabase(comment)

  res.send({ error: null, comment })
})
```

If you can pull off a Stored XSS attack, then all future visitors to their Guestbook will execute your attack code! Unlike the Reflected XSS attacks you've been doing so far, this one doesn't require the victim to visit your specially-crafted attack URL to be exploited. They victim merely needs to visit the guestbook and your attack code will run.

Time to show your competitor the power of Stored XSS!

## Goals

1. Find the XSS vulnerability in their code. You can use any HTML that you want.

1. Your solution should be a code snippet that, when pasted into the browser DevTools, will add a comment to the server's database

## Tips

- The general concept of Stored XSS is the same as Reflected XSS. So all your prior practice should come in handy here!

- You should use the [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API to make a HTTP request that stores your XSS payload in the server's data store.

- It's okay if your attack code doesn't run immeditately when the page loads. It is acceptable for it to run later, in response to the user interacting with the page.

<iframe src='http://caloogle.xyz:4170'></iframe>

Before you move on to the next exercise, remember to copy your "attack code" into the `SOLUTIONS.md` file.
