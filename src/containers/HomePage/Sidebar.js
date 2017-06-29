import React, { Component } from 'react'
import { Drawer, Divider } from 'material-ui'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import { Inbox as InboxIcon, Drafts as DraftsIcon } from 'material-ui-icons'

export default class Sidebar extends Component {
  render() {
    return (
      <Drawer
        docked={true}
        open={true}
      >
        <List>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemText primary="Trash" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Spam" />
          </ListItem>
        </List>
      </Drawer>
    )
  }
}
