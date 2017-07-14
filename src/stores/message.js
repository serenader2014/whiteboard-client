import { observable } from 'mobx'

export default class MessageStore {
  @observable openSnackbar = false
  @observable snackbarMessage = ''
  @observable snackbarAction = null
  @observable snackbarAutoHideDuration = 4000
  @observable snackbarAnchorOrigin = { vertical: 'bottom', horizontal: 'right' }
  @observable openDialog = false
  dialogContent = null
  dialogTitle = null
  dialogActions = null
  snackbarOnRequestClose = () => { this.openSnackbar = false }
  showSnackbar(m) {
    if (typeof m === 'string') {
      this.snackbarMessage = m
      this.openSnackbar = true
    } else {
      this.snackbarMessage = m.message
      this.openSnackbar = true
      this.snackbarAction = m.action
      this.snackbarAutoHideDuration = m.autoHideDuration
      this.snackbarOnRequestClose = m.onRequestClose
    }
  }

  hideSnackbar() {
    this.openSnackbar = false
    this.snackbarMessage = ''
  }

  showDialog(options) {
    this.openDialog = true
    this.dialogContent = options.dialogContent
    this.dialogTitle = options.dialogTitle
    this.dialogActions = options.dialogActions
  }

  hideDialog() {
    this.openDialog = false
    this.dialogContent = null
    this.dialogTitle = null
    this.dialogActions = null
  }
}
