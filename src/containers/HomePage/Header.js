import React, { Component } from 'react'
import { createStyleSheet, withStyles } from 'material-ui/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Divider,
  Button
} from 'material-ui'
import Menu, { MenuItem } from 'material-ui/Menu'
import Dialog, { DialogContent, DialogContentText, DialogActions } from 'material-ui/Dialog'
import {
  Menu as MenuIcon,
  ExitToApp as LogoutIcon,
  AccountCircle as AccountIcon
} from 'material-ui-icons'

import { inject, observer } from 'mobx-react'
import propTypes from 'prop-types'

import { requestLogout } from '../../actions/user'

import defaultAvatar from '../../assets/images/avatar-placeholder.jpeg'

const headerStyleSheet = createStyleSheet('Header', theme => ({
  title: {
    flex: 1
  },
  menuIcon: {
    marginRight: 15,
    color: theme.palette.text.secondary
  }
}))

@inject('userStore')
@inject('message')
@observer
@withStyles(headerStyleSheet)
export default class Header extends Component {
  static propTypes = {
    userStore: propTypes.object,
    classes: propTypes.object,
    history: propTypes.object,
    message: propTypes.object
  }

  state = {
    showMenu: false,
    anchorEl: null,
    showDialog: false
  }

  handleShowMenu = e => {
    this.setState({
      showMenu: true,
      anchorEl: e.currentTarget
    })
  }

  handleCloseMenu = () => {
    this.setState({
      showMenu: false
    })
  }

  handleLogout = () => {
    requestLogout().then(() => {
      this.setState({
        showDialog: true,
        showMenu: false
      })
    }).catch(e => {
      /* eslint-disable no-mixed-operators */
      this.props.message.showMessage(e && e.message || e)
    })
  }

  handleGoToLogin = () => {
    this.props.userStore.logout()
    this.props.history.push('/admin/login')
  }

  render() {
    const {
      userStore: {
        currentUser
      },
      classes
    } = this.props

    return (
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="contrast"><MenuIcon /></IconButton>
          <Typography color="inherit" type="title" className={classes.title}>Whiteboard Admin</Typography>
          <IconButton onClick={this.handleShowMenu}><Avatar src={currentUser.image || defaultAvatar} /></IconButton>
          <Menu
            open={this.state.showMenu}
            anchorEl={this.state.anchorEl}
            onRequestClose={this.handleCloseMenu}
          >
            <MenuItem><AccountIcon className={classes.menuIcon} />{currentUser.username}</MenuItem>
            <Divider />
            <MenuItem onClick={this.handleLogout}><LogoutIcon className={classes.menuIcon}/>Logout</MenuItem>
          </Menu>
        </Toolbar>
        <Dialog
          open={this.state.showDialog}
          ignoreBackdropClick
          ignoreEscapeKeyUp
        >
          <DialogContent>
            <DialogContentText>You have successfully logout. Click Ok will lead you to the login page.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleGoToLogin} color="primary">OK</Button>
          </DialogActions>
        </Dialog>
      </AppBar>
    )
  }
}
