import { observable } from 'mobx'

export default class MessageStore {
  @observable open = false
  @observable message = ''
  @observable action = null
  @observable autoHideDuration = 4000
  @observable anchorOrigin = { vertical: 'bottom', horizontal: 'right' }
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
