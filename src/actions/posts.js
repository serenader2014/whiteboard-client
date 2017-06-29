import { GET } from '../utils/request'

export function getPostsList() {
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
