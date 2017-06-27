import { observable } from 'mobx'
import { getMuiTheme } from 'material-ui/styles'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'

export default class AppStore {
  theme = getMuiTheme(lightBaseTheme)
  @observable themeType = 'light'

  changeTheme(type) {
    this.theme = getMuiTheme(type === 'light' ? lightBaseTheme : darkBaseTheme)
    this.themeType = type
  }
}
