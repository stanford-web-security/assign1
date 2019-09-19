const { createServer } = require('../common/server')
// const { htmlAttributeEscape } = require('../common/hackoogle')

const { router } = createServer(4160, __dirname)

const comments = [
  '💿 Party Like It\'s 1999 💿',
  'YOU\'VE GOT MAIL 📬 📬 I\'m posting on your guestbook!',
  'This guestbook is hotttt 🔥🔥🔥'
]

router.get('/', async (req, res) => {
  res.render('hackoogle-guestbook-page', {
    comments
  })
})

router.post('/comment', async (req, res) => {
  const comment = req.body.comment
  if (comment == null) throw new Error('comment cannot be empty')

  comments.push(comment)

  res.redirect('/')
})
