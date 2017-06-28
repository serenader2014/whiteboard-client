import React, { Component } from 'react'
import { AppBar } from 'material-ui'

import checkAuth from '../../utils/check-auth'

@checkAuth(true)
export default class HomePage extends Component {
  render() {
    return (
      <div>
        <AppBar
          title="Whiteboard Admin"
        />
      </div>
    )
  }
}
