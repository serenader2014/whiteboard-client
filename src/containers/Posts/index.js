import React, { Component } from 'react'
import { Paper, Typography, Divider, IconButton, Avatar, Button } from 'material-ui'
import { CircularProgress } from 'material-ui/Progress'
import List, { ListItem, ListSubheader, ListItemSecondaryAction } from 'material-ui/List'
import Menu, { MenuItem } from 'material-ui/Menu'
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog'
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
  RemoveRedEye as PreviewIcon,
  DateRange as DateIcon,
  Bookmark as CategoryIcon
} from 'material-ui-icons'

import { requestPostsList } from '../../actions/post'

import { fromNow, formatStandard } from '../../utils/date-parser'

import defaultAvatar from '../../assets/images/avatar-placeholder.jpeg'

const style = createStyleSheet('Posts', theme => ({
  container: {
    padding: '1.5em',
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
  },
  postPreview: {
    maxWidth: 800,
    width: '100%',
    minHeight: '80vh',
    height: '100%'
  },
  postPreviewMeta: {
    padding: '1em',
    background: theme.palette.background.default,
    display: 'flex',
    alignItems: 'center'
  },
  postPreviewMetaItem: {
    marginRight: 20,
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.secondary
  },
  marginRight10: {
    marginRight: 10
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
    showPostMenu: false,
    showPostPreview: false,
    currentPost: { user: {}, category: {} }
  }

  componentDidMount() {
    requestPostsList().then(data => {
      this.props.postStore.updatePostsList(data)
      this.setState({
        loadedData: true
      })
    })
  }

  handleClickPostMenu = (e, post) => {
    this.setState({
      showPostMenu: true,
      postItemAnchorEl: e.currentTarget,
      currentPost: post
    })
  }

  handleClosePostMenu = () => {
    this.setState({
      showPostMenu: false
    })
  }

  handleEditPost = () => {

  }

  handleDeletePost = () => {

  }

  handlePreviewPost = () => {
    this.setState({
      showPostPreview: true,
      showPostMenu: false
    })
  }

  handleClosePostPreview = () => {
    this.setState({
      showPostPreview: false
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

    const { currentPost } = this.state

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
                      <IconButton><MenuIcon onClick={e => this.handleClickPostMenu(e, post)} /></IconButton>
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
            <MenuItem onClick={this.handlePreviewPost}>
              <PreviewIcon className={classes.postMenuIcon} /> Preview Post
            </MenuItem>
            <MenuItem onClick={this.handleEditPost}>
              <EditIcon className={classes.postMenuIcon} /> Edit Post
            </MenuItem>
            <Divider />
            <MenuItem className={classes.deletePost} onClick={this.handleDeletePost}>
              <DeleteIcon className={c([classes.postMenuIcon, classes.deletePost])} /> Delete Post
            </MenuItem>
          </Menu>
        </Paper>
        <Dialog
          open={this.state.showPostPreview}
          classes={{ paper: classes.postPreview }}
        >
          <DialogTitle>{currentPost.title}</DialogTitle>
          <DialogContent>
            <div className={classes.postPreviewMeta}>
              <Typography component="div" className={classes.postPreviewMetaItem}>
                <Avatar className={classes.marginRight10} src={currentPost.user.image || defaultAvatar} />
                {currentPost.user.username}
              </Typography>
              <Typography component="div" className={classes.postPreviewMetaItem}>
                <DateIcon className={classes.marginRight10} /> {formatStandard(currentPost.publish_at)}
              </Typography>
              <Typography component="div" className={classes.postPreviewMetaItem}>
                <CategoryIcon className={classes.marginRight10} /> {currentPost.category.name}
              </Typography>
            </div>
            <Typography component="div" dangerouslySetInnerHTML={{ __html: this.state.currentPost.html }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClosePostPreview}>Close</Button>
            <Button onClick={this.handleEditPost}>Edit</Button>
            <Button onClick={this.handleDeletePost}>Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
