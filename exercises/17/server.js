/**
 *    SSSSSSSSSSSSSSS TTTTTTTTTTTTTTTTTTTTTTT     OOOOOOOOO     PPPPPPPPPPPPPPPPP
 *  SS:::::::::::::::ST:::::::::::::::::::::T   OO:::::::::OO   P::::::::::::::::P
 * S:::::SSSSSS::::::ST:::::::::::::::::::::T OO:::::::::::::OO P::::::PPPPPP:::::P
 * S:::::S     SSSSSSST:::::TT:::::::TT:::::TO:::::::OOO:::::::OPP:::::P     P:::::P
 * S:::::S            TTTTTT  T:::::T  TTTTTTO::::::O   O::::::O  P::::P     P:::::P
 * S:::::S                    T:::::T        O:::::O     O:::::O  P::::P     P:::::P
 *  S::::SSSS                 T:::::T        O:::::O     O:::::O  P::::PPPPPP:::::P
 *   SS::::::SSSSS            T:::::T        O:::::O     O:::::O  P:::::::::::::PP
 *     SSS::::::::SS          T:::::T        O:::::O     O:::::O  P::::PPPPPPPPP
 *        SSSSSS::::S         T:::::T        O:::::O     O:::::O  P::::P
 *             S:::::S        T:::::T        O:::::O     O:::::O  P::::P
 *             S:::::S        T:::::T        O::::::O   O::::::O  P::::P
 * SSSSSSS     S:::::S      TT:::::::TT      O:::::::OOO:::::::OPP::::::PP
 * S::::::SSSSSS:::::S      T:::::::::T       OO:::::::::::::OO P::::::::P
 * S:::::::::::::::SS       T:::::::::T         OO:::::::::OO   P::::::::P
 *  SSSSSSSSSSSSSSS         TTTTTTTTTTT           OOOOOOOOO     PPPPPPPPPP
 *
 *
 * Please don't read this code. Reading this code is not in the spirit of the
 * assignment. You'll learn less and you'll also be letting us down. So please
 * just attempt the assignment without looking at these files. We trust you to
 * act honestly. Thanks! <3
 *
 *                              - Feross and the CS 253 course staff
 */

const { createServer } = require('../common/server')

const { router } = createServer(4170, __dirname)

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
