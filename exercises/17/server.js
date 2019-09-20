const { createServer } = require('../common/server')
// const { htmlAttributeEscape } = require('../common/caloogle')

const { router } = createServer(4160, __dirname)

const comments = [
  { id: 0, text: '💿 Party Like It\'s 1999 💿' },
  { id: 1, text: 'YOU\'VE GOT MAIL 📬 📬 I\'m posting on your guestbook!' },
  { id: 2, text: 'This guestbook is hotttt 🔥🔥🔥' }
]

router.get('/', async (req, res) => {
  res.render('caloogle-guestbook-page', { comments })
})

router.post('/comment', async (req, res) => {
  const comment = req.body

  if (comment == null) throw new Error('comment cannot be empty')
  if (comment.text == null) throw new Error('comment.text cannot be empty')

  // if client specifies no id, then use the next id
  if (comment.id == null) comment.id = comments.length

  // store the comment in a crappy in-memory "database"
  comments.push(comment)

  res.send({ error: null, comment })
})
