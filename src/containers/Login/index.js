import React, { Component } from 'react'

import { Button, Avatar, Typography } from 'material-ui'
import Dialog, { DialogContent, DialogActions } from 'material-ui/Dialog'
import Card, { CardContent, CardActions } from 'material-ui/Card'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import { blueGrey } from 'material-ui/colors'

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
    backgroundColor: blueGrey[500],
    flexDirection: 'column'
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
  },
  registerLinkWrapper: {
    marginTop: 10,
    maxWidth: 300,
    width: '100%',
    textAlign: 'right'
  },
  registerLink: {
    color: blueGrey[800],
    '&:hover': {
      color: blueGrey[900]
    }
  },
  actionWrapper: {
    flexDirection: 'column'
  },
  loginProgress: {
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
    passwordStatusOK: false,
    isLogging: false
  }

  handleChangeEmail = e => {
    this.setState({
      email: e.target.value,
      emailStatusOK: !e.error
    })
  }

  handleChangePassword = e => {
    this.setState({
      password: e.target.value,
      passwordStatusOK: !e.error
    })
  }

  handleClickDialog = () => {
    this.setState({
      showDialog: false
    })
  }

  handleLogin = e => {
    this.setState({
      isLogging: true
    })
    e.preventDefault()
    requestLogin({ email: this.state.email, password: this.state.password }).then(user => {
      this.props.userStore.setCurrentUser(user)
      this.props.message.showSnackbar(`Welcome back! ${user.username}`)
    }).catch(e => {
      this.setState({
        showDialog: true,
        message: e.message,
        isLogging: false
      })
    })
  }

  render() {
    const { classes } = this.props
    const { passwordStatusOK, emailStatusOK, email, password, isLogging } = this.state

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
                />
              </div>
            </CardContent>
            <CardActions>
              <Button
                disabled={!emailStatusOK || !passwordStatusOK || isLogging}
                type="submit"
                className={classes.button}
                color="accent"
                raised
              >
                {isLogging ? 'Logging in...' : 'Login'}
              </Button>
            </CardActions>
          </form>
        </Card>
        <Typography className={classes.registerLinkWrapper}>
          <Link className={classes.registerLink} to="/admin/register">{'Don\'t have an account?'}</Link>
        </Typography>
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
