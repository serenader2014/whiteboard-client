import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui/styles'
import { observer, inject } from 'mobx-react'
import propTypes from 'prop-types'

import loadLogin from 'bundle-loader?lazy&name=login!./containers/Login'
import loadRegister from 'bundle-loader?lazy&name=register!./containers/Register'
import loadHomePage from 'bundle-loader?lazy&name=homepage!./containers/HomePage'
import lazyLoadComponent from './utils/lazy-load-component'

@inject('appStore')
@inject('userStore')
@observer
export default class App extends Component {
  static propTypes = {
    userStore: propTypes.object,
    appStore: propTypes.object
  }
  componentDidMount() {
    this.props.userStore.getCurrentUser()
  }

  render() {
    /* eslint-disable no-unused-vars */
    const { theme, themeType } = this.props.appStore
    return (
      <MuiThemeProvider muiTheme={theme}>
        <Router>
          <div>
            <Route exact path="/admin" component={lazyLoadComponent(loadHomePage)} />
            <Route exact path="/admin/register" component={lazyLoadComponent(loadRegister)} />
            <Route exact path="/admin/login" component={lazyLoadComponent(loadLogin)} />
            <Redirect from="*" to="/admin" />
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}
