import React, { Component } from 'react'
import { Paper, Typography, Divider, IconButton, Avatar } from 'material-ui'
import { CircularProgress } from 'material-ui/Progress'
import List, { ListItem, ListSubheader, ListItemSecondaryAction } from 'material-ui/List'
import Menu, { MenuItem } from 'material-ui/Menu'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import { pink } from 'material-ui/styles/colors'
import propTypes from 'prop-types'
import c from 'classnames'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import {
  MoreVert as MenuIcon,
  ModeEdit as EditIcon,
  Delete as DeleteIcon,
  RemoveRedEye as PreviewIcon
} from 'material-ui-icons'

import { requestPostsList } from '../../actions/post'

import { fromNow } from '../../utils/date-parser'

import defaultAvatar from '../../assets/images/avatar-placeholder.jpeg'

const style = createStyleSheet('Posts', theme => ({
  container: {
    padding: '80px 1.5em 1.5em',
    maxWidth: 800,
    margin: 'auto'
  },
  paper: {
    padding: '1em'
  },
  progressWrapper: {
    paddingTop: 200,
    textAlign: 'center'
  },
  progressText: {
    marginTop: 10
  },
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
  postMenuIcon: {
    color: theme.palette.text.secondary,
    marginRight: 10
  },
  deletePost: {
    color: theme.palette.error[400]
  }
}))

@inject('postStore')
@observer
@withStyles(style)
export default class Posts extends Component {
  static propTypes = {
    classes: propTypes.object,
    postStore: propTypes.object
  }

  state = {
    loadedData: false,
    postItemAnchorEl: null,
    showPostMenu: false
  }

  componentDidMount() {
    requestPostsList().then(data => {
      this.props.postStore.updatePostsList(data)
      this.setState({
        loadedData: true
      })
    })
  }

  renderPostMeta(post) {
    const { classes } = this.props
    return (
      <span>
        <span>
          <Link to={`/admin/users/${post.user.id}`} className={classes.postAuthor}>
            <img className={classes.postAuthorAvatar} src={post.user.image || defaultAvatar} />
            {post.user.username}
          </Link>
          on {fromNow(post.publish_at)}
        </span>
        <span>
          sorted in {post.category.name}
        </span>
      </span>
    )
  }

  handleClickPostMenu = e => {
    this.setState({
      showPostMenu: true,
      postItemAnchorEl: e.currentTarget
    })
  }

  handleClosePostMenu = () => {
    this.setState({
      showPostMenu: false
    })
  }

  render() {
    const {
      classes,
      postStore: {
        postsList,
        postsListMeta
      }
    } = this.props

    if (!this.state.loadedData) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
          <Typography
            type="body1"
            color="secondary"
            className={classes.progressText}
          >
            Loading posts list
          </Typography>
        </div>
      )
    }

    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <List subheader={<ListSubheader>Posts (total {postsListMeta.rowCount})</ListSubheader>}>
            {
              postsList.map(post => (
                <div key={post.id}>
                  <ListItem button>
                    <div>
                      <Typography type="subheading">
                        <Link className={classes.postTitle} to={`/admin/posts/${post.id}`}>{post.title}</Link>
                      </Typography>
                      <Typography color="secondary" className={classes.postMeta} type="body1" headlineMapping={{ body1: 'div' }}>
                        <Link to={`/admin/users/${post.user.id}`} className={classes.postAuthor}>
                          <Avatar className={classes.postAuthorAvatar} src={post.user.image || defaultAvatar} />
                          {post.user.username}
                        </Link>
                        on {fromNow(post.publish_at)}
                      </Typography>
                    </div>
                    <ListItemSecondaryAction>
                      <IconButton><MenuIcon onClick={this.handleClickPostMenu} /></IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider light/>
                </div>
              ))
            }
          </List>
          <Menu
            open={this.state.showPostMenu}
            anchorEl={this.state.postItemAnchorEl}
            onRequestClose={this.handleClosePostMenu}
          >
            <MenuItem>
              <PreviewIcon className={classes.postMenuIcon} /> Preview Post
            </MenuItem>
            <MenuItem>
              <EditIcon className={classes.postMenuIcon} /> Edit Post
            </MenuItem>
            <Divider />
            <MenuItem className={classes.deletePost}>
              <DeleteIcon className={c([classes.postMenuIcon, classes.deletePost])} /> Delete Post
            </MenuItem>
          </Menu>
        </Paper>
      </div>
    )
  }
}
