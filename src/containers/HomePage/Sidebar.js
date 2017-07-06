import React, { Component } from 'react'
import { Drawer, Divider } from 'material-ui'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import {
  Archive as ArchiveIcon,
  Settings as SettingsIcon,
  Dashboard as DashboardIcon
} from 'material-ui-icons'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import propTypes from 'prop-types'
import c from 'classnames'

const style = createStyleSheet('Sidebar', theme => ({
  paper: {
    zIndex: 1000,
    width: 240
  },
  topIconList: {
    paddingTop: 64
  },
  bottomIconList: {
    flex: 'initial'
  },
  menuActive: {
    background: theme.palette.action.disabled
  }
}))

@withStyles(style)
export default class Sidebar extends Component {
  static propTypes = {
    classes: propTypes.object,
    history: propTypes.object,
    dockDrawer: propTypes.bool,
    open: propTypes.bool,
    handleClose: propTypes.func,
    location: propTypes.object
  }

  handleGoToPostsPage = () => {
    if (!this.checkSelected(/^\/admin\/posts/)) {
      this.props.history.push('/admin/posts')
    }
    this.closeDrawerIfNeeded()
  }

  handleGoToDashboard = () => {
    if (!this.checkSelected(/^\/admin$/)) {
      this.props.history.push('/admin')
    }
    this.closeDrawerIfNeeded()
  }

  handleGoToSettings = () => {
    if (!this.checkSelected(/^\/admin\/settings/)) {
      this.props.history.push('/admin/settings')
    }

    this.closeDrawerIfNeeded()
  }

  closeDrawerIfNeeded() {
    const { dockDrawer, handleClose } = this.props
    if (!dockDrawer) {
      handleClose()
    }
  }

  checkSelected = (reg) => {
    const result = this.props.location.pathname.match(reg)
    return !!result
  }

  render() {
    const { classes, dockDrawer, open, handleClose } = this.props
    return (
      <Drawer
        docked={dockDrawer}
        open={open}
        classes={{ paper: classes.paper }}
        onRequestClose={handleClose}
      >
        <List className={dockDrawer ? classes.topIconList : null}>
          <ListItem
            button
            onClick={this.handleGoToDashboard}
            className={c({[classes.menuActive]: this.checkSelected(/^\/admin$/)})}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            button
            onClick={this.handleGoToPostsPage}
            className={c({[classes.menuActive]: this.checkSelected(/^\/admin\/posts/)})}
          >
            <ListItemIcon>
              <ArchiveIcon />
            </ListItemIcon>
            <ListItemText primary="Posts" />
          </ListItem>
        </List>
        <Divider />
        <List
          className={c(classes.bottomIconList, {[classes.menuActive]: this.checkSelected(/^\/admin\/settings/)})}
          onClick={this.handleGoToSettings}
        >
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Setting" />
          </ListItem>
        </List>
      </Drawer>
    )
  }
}
