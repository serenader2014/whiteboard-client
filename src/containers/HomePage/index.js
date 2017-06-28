import React, { Component } from 'react'
import { AppBar, MenuItem, Avatar, Menu, Popover, FlatButton } from 'material-ui'
import { inject, observer } from 'mobx-react'
import propTypes from 'prop-types'

import defaultAvatar from '../../assets/images/avatar-placeholder.jpeg'

import checkAuth from '../../utils/check-auth'

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
      <div>
        <FlatButton
          label={userInfo.username}
          labelPosition="before"
          icon={<Avatar size={24} src={userInfo.image || defaultAvatar} />}
          style={{ color: '#fff', marginTop: '6px' }}
          onTouchTap={this.openMenu}
        />
        <Popover
          open={this.state.showMenu}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onRequestClose={this.closeMenu}
        >
          <Menu>
            <MenuItem primaryText="Sign out"/>
          </Menu>
        </Popover>
      </div>
    )
  }
}

@checkAuth(true)
export default class HomePage extends Component {
  render() {
    return (
      <div>
        <AppBar
          title="Whiteboard Admin"
          iconElementRight={<AppBarRight />}
        />
      </div>
    )
  }
}
