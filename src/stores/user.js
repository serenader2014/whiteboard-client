import { observable } from 'mobx'

export default class UserStore {
  @observable currentUser = null
  @observable isAuthenticated = false

  login() {
    return new Promise(resolve => {
      console.log('login')
      setTimeout(() => {
        this.isAuthenticated = true
        console.log('updated auth')
        resolve()
      }, 1000)
    })
  }
}
