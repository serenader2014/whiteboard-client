import React, { Component } from 'react'
import { BrowserRouter as Router , Route, Link } from 'react-router-dom'

import loadLogin from 'bundle-loader?lazy!./containers/Login'
import loadRegister from 'bundle-loader?lazy!./containers/Register'
import lazyLoadComponent from './utils/lazy-load-component'

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/login">login</Link></li>
            <li><Link to="/register">register</Link></li>
          </ul>
          <Route exact path="/login" component={lazyLoadComponent(loadLogin)} />
          <Route exact path="/register" component={lazyLoadComponent(loadRegister)} />
        </div>
      </Router>
    )
  }
}
