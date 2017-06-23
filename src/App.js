import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import loadLogin from 'bundle-loader?lazy&name=login!./containers/Login'
import loadRegister from 'bundle-loader?lazy&name=register!./containers/Register'
import loadHomePage from 'bundle-loader?lazy&name=homepage!./containers/HomePage'
import lazyLoadComponent from './utils/lazy-load-component'


export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={lazyLoadComponent(loadHomePage)} />
          <Route exact path="/register" component={lazyLoadComponent(loadRegister)} />
          <Route exact path="/login" component={lazyLoadComponent(loadLogin)} />
        </div>
      </Router>
    )
  }
}
