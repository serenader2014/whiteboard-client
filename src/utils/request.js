function r(url, method, data) {
  const xhr = new XMLHttpRequest()
  const promise = new Promise((resolve, reject) => {
    xhr.addEventListener('load', () => {
      resolve(xhr.response)
    })
    xhr.addEventListener('error', e => {
      reject(e)
    })
    xhr.open(method, url, true)
    xhr.send(data)
  })

  function abort() {
    if (xhr.readyState > 0) {
      xhr.abort()
    } else {
      throw new Error('Can not abort an unsent XMLHttpRequest!')
    }
  }

  return {
    promise,
    abort
  }
}

export default r
