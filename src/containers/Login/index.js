import React, { Component } from 'react'
import { RaisedButton, Card, TextField, Avatar, Dialog, FlatButton } from 'material-ui'
import { CardActions } from 'material-ui/Card'
import LockIcon from 'material-ui/svg-icons/action/lock-outline'
import { observer, inject } from 'mobx-react'
import propTypes from 'prop-types'

import checkAuth from '../../utils/check-auth'

import './style.css'

@checkAuth(false)
@inject('userStore')
@observer
export default class Login extends Component {
  static propTypes = {
    userStore: propTypes.object
  }

  state = {
    email: '',
    password: '',
    showDialog: false
  }

  handleLogin = e => {
    e.preventDefault()
    const userInfo = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.userStore.login(userInfo).then(user => {

    }, e => {
      this.setState({
        showDialog: true,
        message: e.message
      })
    })
  }

  handleCloseDialog = () => {
    this.setState({
      showDialog: false
    })
  }

  render() {
    /* eslint-disable react/jsx-key */
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleCloseDialog}
      />
    ]

    return (
      <div className="auth-wrapper">
        <Card className="auth-card">
          <div className="auth-avatar">
            <Avatar icon={<LockIcon />} size={60}/>
            <h3>Login</h3>
          </div>
          <form onSubmit={this.handleLogin}>
            <div>
              <TextField
                type="email"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
                floatingLabelText="Email"
                fullWidth
                name="email"
              />
            </div>
            <div>
              <TextField
                type="password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                floatingLabelText="Password"
                fullWidth
                name="password"
              />
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
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.showDialog}
          onRequestClose={this.handleCloseDialog}
        >
          {this.state.message}
        </Dialog>
      </div>
    )
  }
}
