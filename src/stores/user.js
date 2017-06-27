import { observable } from 'mobx'

import request, { GET } from '../utils/request'

export default class UserStore {
  @observable currentUser = null
  @observable isAuthenticated = false

  login({ email, password }) {
    return request('/api/v1/login', {
      method: 'POST',
      data: { email, password }
    }).promise.then(res => {
      if (res.status == 200) {
        this.currentUser = res.body
        this.isAuthenticated = true
        return res.body
      } else {
        return Promise.reject(res.body)
      }
    })
  }

  register({ email, password }) {
    return request('/api/v1/register', {
      method: 'POST',
      data: { email, password }
    }).promise.then(res => {
      if (res.status == 200) {
        return res.body
      } else {
        return Promise.reject(res.body)
      }
    })
  }

  getCurrentUser() {
    GET('/api/v1/users/self').promise.then(res => {
      if (res.status == 200) {
        this.currentUser = res.body
        this.isAuthenticated = true
      }
    }, e => {

    })
  }
}
