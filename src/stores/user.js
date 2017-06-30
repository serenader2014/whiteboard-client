import { observable } from 'mobx'

export default class UserStore {
  @observable currentUser = {}
  @observable isAuthenticated = false

  logout() {
    this.currentUser = {}
    this.isAuthenticated = false
  }

  setCurrentUser(user) {
    this.currentUser = user
    this.isAuthenticated = true
  }
}
