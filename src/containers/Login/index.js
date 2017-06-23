import React, { Component } from 'react'
import { RaisedButton, Card, TextField, Avatar } from 'material-ui'
import { CardActions } from 'material-ui/Card'
import LockIcon from 'material-ui/svg-icons/action/lock-outline'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'

import checkAuth from '../../utils/check-auth'

import './style.css'

@checkAuth(false)
@inject('userStore')
@observer
export default class Login extends Component {
  handleLogin = e => {
    e.preventDefault()
    this.props.userStore.login()
  }

  render() {
    return (
      <div className="login-wrapper">
        <Card className="login-card">
          <div className="login-avatar">
            <Avatar icon={<LockIcon />} size={60}/>
          </div>
          <form onSubmit={this.handleLogin}>
            <div>
              <TextField floatingLabelText="User name" fullWidth name="username" />
            </div>
            <div>
              <TextField floatingLabelText="Password" fullWidth name="password" />
            </div>
            <CardActions>
              <RaisedButton 
                label="SIGN IN"
                primary
                type="submit"
                fullWidth
              />
            </CardActions>
          </form>
        </Card>
      </div>
    )
  }
}
