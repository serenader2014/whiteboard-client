import React, { Component } from 'react'
import { Button, Avatar, Typography } from 'material-ui'
import Dialog, { DialogContent, DialogActions } from 'material-ui/Dialog'
import Card, { CardContent, CardActions } from 'material-ui/Card'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import { blueGrey } from 'material-ui/styles/colors'

import { AccountCircle as AccountIcon } from 'material-ui-icons'

import { observer, inject } from 'mobx-react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

import TextField from '../../components/TextField'
import { requestRegister } from '../../actions/user'

import { emailValidator, passwordValidator } from '../../utils/validator'

import checkAuth from '../../utils/check-auth'

const style = createStyleSheet('Register', theme => ({
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
  loginLinkWrapper: {
    marginTop: 10,
    maxWidth: 300,
    width: '100%',
    textAlign: 'right'
  },
  loginLink: {
    color: blueGrey[800],
    '&:hover': {
      color: blueGrey[900]
    }
  }
}))

@checkAuth(false)
@withStyles(style)
@inject('userStore')
@inject('message')
@observer
export default class Register extends Component {
  static propTypes = {
    userStore: propTypes.object,
    message: propTypes.object,
    classes: propTypes.object,
    history: propTypes.object
  }

  state = {
    email: '',
    password: '',
    showDialog: false,
    emailStatusOK: false,
    passwordStatusOK: false,
    registerSuccess: false
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
    if (this.state.registerSuccess) {
      this.props.history.push('/admin/login')
    }
  }

  handleRegister = e => {
    e.preventDefault()
    requestRegister({ email: this.state.email, password: this.state.password }).then(user => {
      this.setState({
        showDialog: true,
        message: 'Successfully create account, please login.',
        registerSuccess: true
      })
    }).catch(e => {
      let errorMessage = e.message
      if (e.errors) {
        errorMessage = `${errorMessage}: ${Object.keys(e.errors).map(field => e.errors[field]).join('; ')}`
      }

      this.setState({
        showDialog: true,
        message: errorMessage
      })
    })
  }

  render() {
    const { classes } = this.props
    const { passwordStatusOK, emailStatusOK, email, password } = this.state

    return (
      <div className={classes.wrapper}>
        <Card className={classes.card}>
          <form onSubmit={this.handleRegister}>
            <CardContent>
              <div className={classes.cardHeader}>
                <Avatar className={classes.avatar}><AccountIcon className={classes.avatarIcon}/></Avatar>
                <Typography type="title" color="secondary">Register Account</Typography>
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
              <Button disabled={!emailStatusOK || !passwordStatusOK} type="submit" className={classes.button} color="accent" raised>Register</Button>
            </CardActions>
          </form>
        </Card>
        <Typography className={classes.loginLinkWrapper}>
          <Link className={classes.loginLink} to="/admin/login">{'Already have an account?'}</Link>
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
