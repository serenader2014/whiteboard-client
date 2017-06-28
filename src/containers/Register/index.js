import React, { Component } from 'react'
import { RaisedButton, Card, TextField, Avatar, Dialog, FlatButton } from 'material-ui'
import { CardActions } from 'material-ui/Card'
import LockIcon from 'material-ui/svg-icons/action/lock-outline'
import { observer, inject } from 'mobx-react'
import propTypes from 'prop-types'

import checkAuth from '../../utils/check-auth'

import '../Login/style.css'

@checkAuth(false)
@inject('userStore')
@observer
export default class Register extends Component {
  static propTypes = {
    userStore: propTypes.object,
    history: propTypes.object
  }

  state = {
    email: '',
    password: '',
    showDialog: false,
    message: '',
    registerSuccess: false
  }

  handleRegister = e => {
    e.preventDefault()
    const userInfo = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.userStore.register(userInfo).then(newUser => {
      this.setState({
        showDialog: true,
        message: 'Successfully register account! Click OK button will lead you to the login page.',
        registerSuccess: true
      })
    }, err => {
      this.setState({
        showDialog: true,
        message: `${err.message}: \n${Object.keys(err.errors).map(e => err.errors[e]).join(';\n')}`,
        registerSuccess: false
      })
    })
  }

  handleCloseDialog = () => {
    this.setState({
      showDialog: false
    })
  }

  handleDialogAction = () => {
    if (this.state.registerSuccess) {
      this.props.history.push('/login')
    } else {
      this.handleCloseDialog()
    }
  }

  render() {
    /* eslint-disable react/jsx-key */
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCloseDialog}
      />,
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleDialogAction}
      />
    ]

    return (
      <div className="auth-wrapper">
        <Card className="auth-card">
          <div className="auth-avatar">
            <Avatar icon={<LockIcon />} size={60}/>
            <h3>Register</h3>
          </div>
          <form onSubmit={this.handleRegister}>
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
                label="REGISTER"
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
