import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { Snackbar } from 'material-ui'
import { MuiThemeProvider } from 'material-ui/styles'
import { observer, inject } from 'mobx-react'
import propTypes from 'prop-types'

import loadLogin from 'bundle-loader?lazy&name=login!./containers/Login'
import loadRegister from 'bundle-loader?lazy&name=register!./containers/Register'
import loadHomePage from 'bundle-loader?lazy&name=homepage!./containers/HomePage'
import lazyLoadComponent from './utils/lazy-load-component'

import { requestCurrentUser } from './actions/user'

@inject('appStore')
@inject('userStore')
@inject('message')
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
    const { theme, themeType } = this.props.appStore
    const { open, message, action, autoHideDuration, onRequestClose, anchorOrigin } = this.props.message
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
            <Snackbar
              open={open}
              message={message}
              action={action}
              autoHideDuration={autoHideDuration}
              onRequestClose={onRequestClose}
              anchorOrigin={anchorOrigin}
            />
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}
