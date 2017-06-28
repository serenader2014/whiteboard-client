import React, { Component } from 'react'
import { AppBar, MenuItem, Avatar, Menu, Popover, IconButton, Divider, Drawer } from 'material-ui'
import { inject, observer } from 'mobx-react'
import AccountIcon from 'material-ui/svg-icons/action/account-circle'
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import propTypes from 'prop-types'

import defaultAvatar from '../../assets/images/avatar-placeholder.jpeg'

import checkAuth from '../../utils/check-auth'

import './style.css'

@inject('userStore')
@observer
class AppBarRight extends Component {
  static propTypes = {
    userStore: propTypes.object
  }

  state = {
    showMenu: false
  }

  openMenu = e => {
    this.setState({
      showMenu: true,
      anchorEl: e.currentTarget
    })
  }

  closeMenu = () => {
    this.setState({
      showMenu: false
    })
  }

  render() {
    const userInfo = this.props.userStore.currentUser || {}
    return (
      <div className="appbar-right">
        <IconButton onTouchTap={this.openMenu} className="user-avatar-icon">
          <Avatar size={24} src={userInfo.image || defaultAvatar} />
        </IconButton>
        <Popover
          open={this.state.showMenu}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onRequestClose={this.closeMenu}
        >
          <Menu>
            <MenuItem
              primaryText={userInfo.username}
              leftIcon={<AccountIcon />}
            />
            <Divider />
            <MenuItem
              onTouchTap={() => this.props.userStore.logout()}
              primaryText="Sign out"
              leftIcon={<ExitIcon />}
            />
          </Menu>
        </Popover>
      </div>
    )
  }
}

@checkAuth(true)
export default class HomePage extends Component {
  state = {
    showSidebar: true,
    isMobileView: false
  }

  componentWillMount() {
    const isMobileView = window.innerWidth <= 800

    this.setState({
      isMobileView: isMobileView,
      showSidebar: isMobileView ? false : this.state.showSidebar
    })
    window.addEventListener('resize', this.windowResizeHandler)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResizeHandler)
  }

  windowResizeHandler = () => {
    const isMobileView = window.innerWidth <= 800
    this.setState({
      isMobileView: isMobileView,
      showSidebar: isMobileView ? false : this.state.showSidebar
    })
  }

  handleShowSidebar = () => {
    this.setState({
      showSidebar: true
    })
  }

  handleCloseSidebar = () => {
    this.setState({
      showSidebar: false
    })
  }

  render() {
    const leftIcon = <IconButton>{this.state.showSidebar ? <CloseIcon /> : <MenuIcon />}</IconButton>
    return (
      <div>
        <AppBar
          title="Whiteboard Admin"
          iconElementRight={<AppBarRight />}
          iconElementLeft={leftIcon}
          onLeftIconButtonTouchTap={this.handleShowSidebar}
        />
        <Drawer
          open={this.state.showSidebar}
          docked={!this.state.isMobileView}
          onRequestChange={this.handleCloseSidebar}
        >

        </Drawer>
      </div>
    )
  }
}
