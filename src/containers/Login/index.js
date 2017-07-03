import React, { Component } from 'react'
import { Button, Avatar, Typography } from 'material-ui'
import Dialog, { DialogContent, DialogActions } from 'material-ui/Dialog'
import Card, { CardContent, CardActions } from 'material-ui/Card'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import { blueGrey } from 'material-ui/styles/colors'

import { Lock as LockIcon } from 'material-ui-icons'

import { observer, inject } from 'mobx-react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

import TextField from '../../components/TextField'
import { requestLogin } from '../../actions/user'

import { emailValidator, passwordValidator } from '../../utils/validator'

import checkAuth from '../../utils/check-auth'

const style = createStyleSheet('Login', theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: blueGrey[500]
  },
  avatar: {
    width: 60,
    height: 60,
    margin: 'auto',
    backgroundColor: theme.palette.accent[400],
    marginBottom: 10
  },
  card: {
    maxWidth: 300
  },
  cardHeader: {
    textAlign: 'center',
    marginBottom: 20
  },
  input: {
    width: '100%'
  },
  button: {
    width: '100%'
  }
}))

@checkAuth(false)
@withStyles(style)
@inject('userStore')
@inject('message')
@observer
export default class Login extends Component {
  static propTypes = {
    userStore: propTypes.object,
    message: propTypes.object,
    classes: propTypes.object
  }

  state = {
    email: '',
    password: '',
    showDialog: false,
    emailStatusOK: false,
    passwordStatusOK: false
  }

  handleChangeEmail = e => {
    this.setState({
      email: e.target.value
    })
  }

  handleChangePassword = e => {
    this.setState({
      password: e.target.value
    })
  }

  handleClickDialog = () => {
    this.setState({
      showDialog: false
    })
  }

  handleLogin = e => {
    e.preventDefault()
    requestLogin({ email: this.state.email, password: this.state.password }).then(user => {
      this.props.userStore.setCurrentUser(user)
    }).catch(e => {
      this.setState({
        showDialog: true,
        message: e.message
      })
    })
  }

  handleEmailStatusUpdate = obj => {
    this.setState({
      emailStatusOK: !obj.error
    })
  }

  handlePasswordUpdate = obj => {
    this.setState({
      passwordStatusOK: !obj.error
    })
  }

  render() {
    const { classes } = this.props
    const { passwordStatusOK, emailStatusOK, email, password } = this.state

    return (
      <div className={classes.wrapper}>
        <Card className={classes.card}>
          <form onSubmit={this.handleLogin}>
            <CardContent>
              <div className={classes.cardHeader}>
                <Avatar className={classes.avatar}><LockIcon className={classes.avatarIcon}/></Avatar>
                <Typography type="title" color="secondary">Login</Typography>
              </div>
              <div>
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={this.handleChangeEmail}
                  className={classes.input}
                  required
                  marginForm
                  validators={emailValidator}
                  updateStatus={this.handleEmailStatusUpdate}
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={this.handleChangePassword}
                  className={classes.input}
                  required
                  marginForm
                  validators={passwordValidator}
                  updateStatus={this.handlePasswordUpdate}
                />
              </div>
            </CardContent>
            <CardActions>
              <Button disabled={!emailStatusOK || !passwordStatusOK} type="submit" className={classes.button} color="accent" raised>Login</Button>
            </CardActions>
          </form>
        </Card>
        <Dialog
          open={this.state.showDialog}
        >
          <DialogContent>
            <Typography>{this.state.message}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClickDialog}>OK</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
