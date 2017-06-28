import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import checkAuth from '../../utils/check-auth'

@checkAuth(true)
export default class HomePage extends Component {
  render() {
    return (
      <div>
        <p>This is homepage</p>
        <ul>
          <li><Link to="/admin/login">login</Link></li>
          <li><Link to="/admin/register">register</Link></li>
        </ul>
      </div>
    )
  }
}
