import { observable } from 'mobx'

export default class AppStore {
  @observable theme = 'light'
}
