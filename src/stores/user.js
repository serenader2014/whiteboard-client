import { observable } from 'mobx'

import request, { GET } from '../utils/request'

export default class UserStore {
  @observable currentUser = null
  @observable isAuthenticated = false

  login({ email, password }) {
    request('/api/v1/login', {
      method: 'POST',
      data: { email, password }
    }).promise.then(res => {
      console.log(res)
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
