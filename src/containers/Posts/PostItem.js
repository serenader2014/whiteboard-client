import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import c from 'classnames'

import { createStyleSheet, withStyles } from 'material-ui/styles'
import { pink } from 'material-ui/colors'
import { Typography, IconButton, Divider, Avatar } from 'material-ui'
import { ListItem, ListItemSecondaryAction } from 'material-ui/List'
import {
  MoreVert as MenuIcon
} from 'material-ui-icons'

import { fromNow } from '../../utils/date-parser'

import defaultAvatar from '../../assets/images/avatar-placeholder.jpeg'

const postItemStyle = createStyleSheet('PostItem', theme => ({
  postAuthor: {
    color: pink[400],
    marginRight: 8,
    textDecoration: 'none',
    display: 'flex',
    '&:hover': {
      color: pink[700]
    }
  },
  postAuthorAvatar: {
    width: 20,
    height: 20,
    borderRadius: '100%',
    position: 'relative',
    marginRight: 10
  },
  postTitle: {
    color: theme.palette.text.primary,
    textDecoration: 'none'
  },
  postMeta: {
    display: 'flex',
    marginTop: '0.2em'
  },
  draftItem: {
    background: theme.palette.background.default
  }
}))

@withStyles(postItemStyle)
export default class PostItem extends Component {
  static propTypes = {
    classes: propTypes.object,
    post: propTypes.object,
    onClickPostItem: propTypes.func,
    onClickPostMenu: propTypes.func
  }

  render() {
    const { classes, post, onClickPostItem, onClickPostMenu } = this.props
    return (
      <div>
        <ListItem
          className={c({[classes.draftItem]: post.status === 'draft'})}
          button
          onClick={e => onClickPostItem(e, post)}
        >
          <div>
            <Typography type="subheading">
              <Link className={classes.postTitle} to={`/admin/posts/${post.id}`}>{post.title}</Link>
            </Typography>
            <Typography color="secondary" className={classes.postMeta} type="body1" headlineMapping={{ body1: 'div' }}>
              <Link to={`/admin/users/${post.user.id}`} className={classes.postAuthor}>
                <Avatar className={classes.postAuthorAvatar} src={post.user.image || defaultAvatar} />
                {post.user.username}
              </Link>
              { post.status === 'published' && `on ${fromNow(post.publish_at)}` }
            </Typography>
          </div>
          <ListItemSecondaryAction>
            <IconButton><MenuIcon onClick={e => onClickPostMenu(e, post)} /></IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider light/>
      </div>
    )
  }
}
