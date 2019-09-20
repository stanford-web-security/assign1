let successCalled = false

window.success = () => {
  if (successCalled) return
  successCalled = true

  // if (window.parent === window) {
  //   window.alert('Success! HOWEVER... In order to receive credit for this exercise please enter your "attack input" into the inline browser in the problem.')
  //   return
  // }

  window.parent.postMessage('success', '*')
}

window.addEventListener('message', async e => {
  const { data } = e
  if (data !== 'success') return

  const $exerciseIdInput = document.querySelector('.exercise-id')
  const id = $exerciseIdInput
    ? Number($exerciseIdInput.value)
    : Number(window.location.pathname.slice(1))

  const $exerciseLink = document.querySelector(`[data-exercise='${id}']`)
  if ($exerciseLink) {
    $exerciseLink.classList.add('done')
  }

  const $nextExerciseLink = document.querySelector(`[data-exercise='${id + 1}']`)
  if ($nextExerciseLink) {
    $nextExerciseLink.classList.remove('disabled')
    $nextExerciseLink.classList.add('pulse', 'animated', 'infinite')
  }

  try {
    await window.fetch(`http://localhost:4000/success/${id}`, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

    window.alert(`Success! You completed exercise ${id}!`)
  } catch (err) {
    window.alert(`Error! It looks like you completed excercise ${id} but the result could not be saved. Is the server still running?`)
  }
})

window.addEventListener('load', () => {
  if (document.querySelector('.iframeNav')) {
    initIframeNav()
  }
})

function initIframeNav () {
  if (window.parent === window) {
    // Running in top-level window
    const $iframeNav = document.querySelector('.iframeNav')
    $iframeNav.style.display = 'none'
  }

  const $url = document.querySelector('.iframeNav .url')
  $url.value = window.location

  const $home = document.querySelector('.iframeNav .home')
  $home.addEventListener('click', e => {
    window.location = window.location.origin
  })

  const $newtab = document.querySelector('.iframeNav .newtab')
  $newtab.addEventListener('click', e => {
    const a = document.createElement('a')
    a.href = window.location
    a.target = '_blank'
    a.click()
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
