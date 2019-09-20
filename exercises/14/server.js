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
const { getResults, getLanguageVarsFromRequest } = require('../common/caloogle')

const { router } = createServer(4140, __dirname)

router.get('/', async (req, res) => {
  res.render('caloogle-home-page')
})

router.get('/search', async (req, res) => {
  let q = req.query.q
  if (q == null) q = ''

  const rawQ = q

  const languageVars = getLanguageVarsFromRequest(req)

  const results = await getResults(q)
  res.render('caloogle-search-page4', {
    rawQ,
    results,
    ...languageVars
  })
})
