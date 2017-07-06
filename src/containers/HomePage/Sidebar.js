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
  }
}))

@withStyles(style)
export default class Sidebar extends Component {
  static propTypes = {
    classes: propTypes.object,
    history: propTypes.object,
    dockDrawer: propTypes.bool,
    open: propTypes.bool,
    handleClose: propTypes.func
  }

  handleGoToPostsPage = () => {
    this.props.history.push('/admin/posts')
    this.closeDrawerIfNeeded()
  }

  handleGoToDashboard = () => {
    this.props.history.push('/admin')
    this.closeDrawerIfNeeded()
  }

  closeDrawerIfNeeded() {
    const { dockDrawer, handleClose } = this.props
    if (!dockDrawer) {
      handleClose()
    }
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
          <ListItem button onClick={this.handleGoToDashboard}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={this.handleGoToPostsPage}>
            <ListItemIcon>
              <ArchiveIcon />
            </ListItemIcon>
            <ListItemText primary="Posts" />
          </ListItem>
        </List>
        <Divider />
        <List className={classes.bottomIconList}>
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
