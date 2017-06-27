function r(url, method, data, options = {}) {
  const xhr = new XMLHttpRequest()
  const promise = new Promise((resolve, reject) => {
    xhr.addEventListener('load', () => {
      let response = null
      try {
        response = JSON.parse(xhr.response)
      } catch (e) {
        response = xhr.response
      }
      const headers = xhr.getAllResponseHeaders().split('\n').filter(item => !!item).reduce((obj, item) => {
        const arr = item.split(': ')
        obj[arr[0]] = arr[1]
        return obj
      }, {})
      resolve({
        status: xhr.status,
        headers: headers,
        body: response
      })
    })
    xhr.addEventListener('error', e => {
      reject(e)
    })
    xhr.open(method, url, true)
    if (options.headers) {
      for (const key of Object.keys(options.headers)) {
        xhr.setRequestHeader(key, options.headers[key])
      }
    }
    if (options.withCredentials) {
      xhr.withCredentials = true
    }
    xhr.send(data)
  })

  function abort() {
    xhr.abort()
  }

  return {
    promise,
    abort
  }
}

function request(url, options) {
  const defaultOptions = {
    method: 'GET',
    query: null,
    data: null,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: false
  }
  options = Object.assign({}, defaultOptions, options)
  options.headers = Object.assign({}, defaultOptions.headers, options.headers)

  const qs = options.query ? Object.keys(options.query).map(item => `${item}=${options.query[item]}`).join('&') : null
  const finalUrl = qs ? `${url}?${qs}` : url
  return r(finalUrl, options.method, JSON.stringify(options.data), { headers: options.headers, withCredentials: options.withCredentials })
}

export default request

export function GET(url, options) {
  return request(url, Object.assign({}, options, { method: 'GET' }))
}
