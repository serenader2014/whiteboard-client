import React, { Component } from 'react'
import { AppBar, MenuItem, Avatar, Menu, Popover, IconButton, Divider, Drawer } from 'material-ui'
import { inject, observer } from 'mobx-react'
import propTypes from 'prop-types'
import { Route } from 'react-router-dom'

import AccountIcon from 'material-ui/svg-icons/action/account-circle'
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app'
import DashboardIcon from 'material-ui/svg-icons/action/dashboard'
import SettingIcon from 'material-ui/svg-icons/action/settings'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import ImageIcon from 'material-ui/svg-icons/image/image'
import ArchiveIcon from 'material-ui/svg-icons/content/archive'

import loadPosts from 'bundle-loader?lazy&name=posts!../Posts/index'

import defaultAvatar from '../../assets/images/avatar-placeholder.jpeg'

import checkAuth from '../../utils/check-auth'
import lazyLoadComponent from '../../utils/lazy-load-component'

import './style.css'

@inject('userStore')
@inject('message')
@observer
class AppBarRight extends Component {
  static propTypes = {
    userStore: propTypes.object,
    message: propTypes.object
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

  handleSignOut = () => {
    this.props.userStore.logout().then(() => {
      this.props.message.showMessage('You have successfully logout.')
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
              onTouchTap={this.handleViewUserInfo}
            />
            <Divider />
            <MenuItem
              onTouchTap={this.handleSignOut}
              primaryText="Sign out"
              leftIcon={<ExitIcon />}
            />
          </Menu>
        </Popover>
      </div>
    )
  }
}

@inject('appStore')
@checkAuth(true)
export default class HomePage extends Component {
  static propTypes = {
    history: propTypes.object,
    appStore: propTypes.object
  }

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
      showSidebar: !isMobileView
    })
  }

  handleToggleSidebar = () => {
    this.setState({
      showSidebar: !this.state.showSidebar
    })
  }

  handleCloseSidebar = () => {
    this.setState({
      showSidebar: false
    })
  }

  handleGoToPosts = () => {
    this.props.history.push('/admin/posts')
  }

  render() {
    const leftIcon = <IconButton>{this.state.showSidebar ? <CloseIcon /> : <MenuIcon />}</IconButton>
    const drawerStyle = this.state.isMobileView ? {

    } : {
      zIndex: 1000,
      paddingTop: 64
    }
    /* eslint-disable no-mixed-operators */
    const contentWrapperStyle = (this.state.isMobileView || !this.state.isMobileView && !this.state.showSidebar) ? {

    } : {
      paddingLeft: 250
    }
    const containerStyle = {
      background: this.props.appStore.theme.baseTheme.palette.accent2Color,
      height: '100%'
    }

    return (
      <div style={containerStyle}>
        <AppBar
          title="Whiteboard Admin"
          iconElementRight={<AppBarRight />}
          iconElementLeft={leftIcon}
          onLeftIconButtonTouchTap={this.handleToggleSidebar}
        />
        <Drawer
          open={this.state.showSidebar}
          docked={!this.state.isMobileView}
          onRequestChange={this.handleCloseSidebar}
          containerStyle={drawerStyle}
          width={250}
        >
          <Menu>
            <MenuItem
              primaryText="Dashboard"
              leftIcon={<DashboardIcon />}
            />
            <MenuItem
              primaryText="Post"
              leftIcon={<ArchiveIcon />}
              onTouchTap={this.handleGoToPosts}
            />
            <MenuItem
              primaryText="Gallery"
              leftIcon={<ImageIcon />}
            />
            <MenuItem
              primaryText="Setting"
              leftIcon={<SettingIcon />}
            />
          </Menu>
        </Drawer>
        <div style={contentWrapperStyle}>
          <Route path="/admin/posts" component={lazyLoadComponent(loadPosts)} />
        </div>
      </div>
    )
  }
}
