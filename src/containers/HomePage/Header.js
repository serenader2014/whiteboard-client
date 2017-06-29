import React, { Component } from 'react'
import { createStyleSheet, withStyles } from 'material-ui/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Divider
} from 'material-ui'
import Menu, { MenuItem } from 'material-ui/Menu'
import {
  Menu as MenuIcon,
  ExitToApp as LogoutIcon,
  AccountCircle as AccountIcon
} from 'material-ui-icons'

import { inject, observer } from 'mobx-react'
import propTypes from 'prop-types'

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
@observer
@withStyles(headerStyleSheet)
export default class Header extends Component {
  static propTypes = {
    userStore: propTypes.object,
    classes: propTypes.object
  }

  state = {
    showMenu: false,
    anchorEl: null
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

  render() {
    const { userStore: {
      currentUser
    }, classes } = this.props

    return (
      <AppBar position="static">
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
            <MenuItem><LogoutIcon className={classes.menuIcon}/>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

    )
  }
}
