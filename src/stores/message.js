import { observable } from 'mobx'

const noop = () => {}

export default class MessageStore {
  @observable open = false
  @observable message = ''
  @observable action = null
  @observable autoHideDuration = 4000
  onActionTouchTap = noop
  onRequestClose = () => { this.open = false }
  showMessage(m) {
    if (typeof m === 'string') {
      this.message = m
      this.open = true
    } else {
      this.message = m.message
      this.open = true
      this.action = m.action
      this.autoHideDuration = m.autoHideDuration
      this.onActionTouchTap = m.onActionTouchTap
    }
  }
}
