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
    history: propTypes.object
  }

  handleGoToPostsPage = () => {
    this.props.history.push('/admin/posts')
  }

  render() {
    const { classes } = this.props
    return (
      <Drawer
        docked={true}
        open={true}
        classes={{ paper: classes.paper }}
      >
        <List className={classes.topIconList}>
          <ListItem button>
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
