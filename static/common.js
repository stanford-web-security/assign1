window.success = () => {
  if (window.parent === window) {
    window.alert('Success!')
    return
  }
  window.parent.postMessage('success', '*')
}

window.addEventListener('message', async e => {
  const { data } = e
  if (data !== 'success') return

  const id = Number(window.location.pathname.slice(1))

  const $navExercise = document.querySelector(`[data-exercise='${id}']`)
  $navExercise.classList.add('done')

  let res
  try {
    res = await window.fetch(`/success/${id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

    window.alert(`Success! You completed exercise ${id}!`)
  } catch (err) {
    window.alert(`Error! It looks like you completed excercise ${id} but the result could not be saved. Is the server still running?`)
  }

  const config = await res.json()
  console.log(config)
})

window.addEventListener('load', () => {
  if (document.querySelector('.iframeNav')) {
    initIframeNav()
  }
})

function initIframeNav () {
  const $url = document.querySelector('.iframeNav .url')
  $url.value = window.location

  const $home = document.querySelector('.iframeNav .home')
  $home.addEventListener('click', e => {
    window.location = window.location.origin
  })

  const $urlForm = document.querySelector('.iframeNav .urlForm')
  $urlForm.addEventListener('submit', e => {
    e.preventDefault()
    let url = $url.value
    if (!/^https?:.*/.test(url)) {
      url = `http://${url}`
    }
    window.location = url
  })
}
