import { GET } from '../utils/request'

export function requestCategoryList() {
  return GET('/api/v1/categories').promise.then(res => {
    if (res.status === 200) {
      return res.body
    } else {
      return Promise.reject(res.body)
    }
  })
}
