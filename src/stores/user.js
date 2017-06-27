import { observable } from 'mobx'

export default class UserStore {
  @observable currentUser = null
  @observable isAuthenticated = false

  login({ username, password }) {
    return new Promise(resolve => {
      console.log(username, password)
      setTimeout(() => {
        this.isAuthenticated = true
        resolve()
      }, 1000)
    })
  }
}
