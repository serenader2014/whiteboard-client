import { observable } from 'mobx'

export default class AppStore {
  theme = ''
  @observable themeType = 'light'

  changeTheme(type) {
    this.themeType = type
  }
}
