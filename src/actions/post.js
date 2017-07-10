import request, { GET } from '../utils/request'

export function requestPostsList() {
  return GET('/api/v1/posts', {
    query: {
      include: 'user,category'
    }
  }).promise.then(res => {
    if (res.status === 200) {
      return res.body
    } else {
      return Promise.reject(res.body)
    }
  })
}

export function requestDeletePost(id) {
  return request(`/api/v1/posts/${id}`, { method: 'DELETE' }).promise.then(res => {
    if (res.status === 200) {
      return res.body
    } else {
      return Promise.reject(res.body)
    }
  })
}
