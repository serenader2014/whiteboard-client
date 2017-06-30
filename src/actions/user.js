import request, { GET } from '../utils/request'

export function requestLogout() {
  return GET('/api/v1/logout').promise.then(res => {
    if (res.status !== 200) {
      return Promise.reject(res.body)
    }
  })
}

export function requestLogin({ email, password }) {
  return request('/api/v1/login', {
    method: 'POST',
    data: { email, password }
  }).promise.then(res => {
    if (res.status === 200) {
      return res.body
    } else {
      return Promise.reject(res.body)
    }
  })
}

export function requestRegister({ email, password }) {
  return request('/api/v1/register', {
    method: 'POST',
    data: { email, password }
  }).promise.then(res => {
    if (res.status === 200) {
      return res.body
    } else {
      return Promise.reject(res.body)
    }
  })
}

export function requestCurrentUser() {
  return GET('/api/v1/users/self').promise.then(res => {
    if (res.status === 200) {
      return res.body
    } else {
      return Promise.reject(res.body)
    }
  })
}
