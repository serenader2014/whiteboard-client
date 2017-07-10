import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { Snackbar } from 'material-ui'
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog'
import { MuiThemeProvider } from 'material-ui/styles'
import { observer, inject } from 'mobx-react'
import propTypes from 'prop-types'

import loadLogin from 'bundle-loader?lazy&name=login!./containers/Login'
import loadRegister from 'bundle-loader?lazy&name=register!./containers/Register'
import loadHomePage from 'bundle-loader?lazy&name=homepage!./containers/HomePage'
import lazyLoadComponent from './utils/lazy-load-component'

import { requestCurrentUser } from './actions/user'

@inject('message')
@observer
class Message extends Component {
  static propTypes = {
    message: propTypes.object
  }

  render() {
    const {
      openSnackbar,
      snackbarMessage,
      snackbarAction,
      snackbarAutoHideDuration,
      snackbarOnRequestClose,
      snackbarAnchorOrigin,
      openDialog,
      dialogContent,
      dialogTitle,
      dialogActions
    } = this.props.message
    return (
      <div>
        <Snackbar
          open={openSnackbar}
          message={snackbarMessage}
          action={snackbarAction}
          autoHideDuration={snackbarAutoHideDuration}
          onRequestClose={snackbarOnRequestClose}
          anchorOrigin={snackbarAnchorOrigin}
        />
        <Dialog
          open={openDialog}
        >
          {dialogTitle && <DialogTitle>{dialogTitle}</DialogTitle>}
          {dialogContent && <DialogContent>{dialogContent}</DialogContent>}
          {dialogActions && <DialogActions>{dialogActions}</DialogActions>}
        </Dialog>
      </div>
    )
  }
}

@inject('userStore')
@observer
export default class App extends Component {
  static propTypes = {
    userStore: propTypes.object,
    appStore: propTypes.object,
    message: propTypes.object
  }
  componentDidMount() {
    requestCurrentUser().then(user => {
      this.props.userStore.setCurrentUser(user)
    }, e => console.log(e))
  }

  render() {
    /* eslint-disable no-unused-vars */
    return (
      <MuiThemeProvider>
        <Router>
          <div style={{ height: '100%' }}>
            <Switch>
              <Route exact path="/admin/register" component={lazyLoadComponent(loadRegister)} />
              <Route exact path="/admin/login" component={lazyLoadComponent(loadLogin)} />
              <Route path="/admin" component={lazyLoadComponent(loadHomePage)} />
              <Redirect from="*" to="/admin" />
            </Switch>
            <Message />
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}
