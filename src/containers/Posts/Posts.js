import React, { Component } from 'react'
import c from 'classnames'
import propTypes from 'prop-types'

import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'

import { Divider, Paper, Button } from 'material-ui'
import List, { ListSubheader } from 'material-ui/List'
import Menu, { MenuItem } from 'material-ui/Menu'
import {
  ModeEdit as EditIcon,
  Delete as DeleteIcon,
  RemoveRedEye as PreviewIcon
} from 'material-ui-icons'
import { createStyleSheet, withStyles } from 'material-ui/styles'

import PostItem from './PostItem'
import PostPreview from './PostPreview'

import { requestDeletePost } from '../../actions/post'

const postsListStyle = createStyleSheet('PostList', theme => ({
  paper: {
    padding: '1em'
  },
  postMenuIcon: {
    color: theme.palette.text.secondary,
    marginRight: 10
  },
  deletePost: {
    color: theme.palette.error[400]
  }
}))

@withStyles(postsListStyle)
@inject('postStore')
@inject('message')
@observer
export default class Posts extends Component {
  static propTypes = {
    classes: propTypes.object,
    postStore: propTypes.object,
    history: propTypes.object,
    message: propTypes.object
  }

  @observable showPostMenu = false
  @observable currentPost = { user: {}, category: {} }
  @observable showPostPreview = false
  postItemAnchorEl = null

  handleShowPostMenu = (e, post) => {
    this.currentPost = post
    this.showPostMenu = true
    this.postItemAnchorEl = e.currentTarget
  }

  handlePreviewPost = (e, post) => {
    this.currentPost = post || this.currentPost
    this.showPostMenu = false
    this.showPostPreview = true
  }

  handleClosePostMenu = () => {
    this.showPostMenu = false
  }

  handleClosePostPreview = () => {
    this.showPostPreview = false
  }

  handleEditPost = () => {
    this.props.history.push(`/admin/posts/${this.currentPost.id}`)
  }

  handleDeletePost = () => {
    this.handleClosePostMenu()
    this.props.message.showDialog({
      dialogContent: `Deleting post: ${this.currentPost.title} , this action can not be undone, are you sure?`,
      dialogActions: [
        <Button onClick={() => this.props.message.hideDialog()} key="cancel">Cancel</Button>,
        <Button onClick={this.deletePost} color="accent" key="ok">Ok</Button>
      ]
    })
  }

  deletePost = () => {
    this.props.message.hideDialog()
    requestDeletePost(this.currentPost.id).then(res => {
      this.props.postStore.deletePost(this.currentPost.id)
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

    const { showPostMenu, postItemAnchorEl, currentPost, showPostPreview } = this

    return (
      <Paper className={classes.paper}>
        <List subheader={<ListSubheader>Posts (total {postsListMeta.rowCount})</ListSubheader>}>
          {
            postsList.map(post => (
              <PostItem
                post={post}
                key={post.id}
                onClickPostMenu={this.handleShowPostMenu}
                onClickPostItem={this.handlePreviewPost}
              />
            ))
          }
        </List>
        <Menu
          open={showPostMenu}
          anchorEl={postItemAnchorEl}
          onRequestClose={this.handleClosePostMenu}
        >
          <MenuItem onClick={(e) => this.handlePreviewPost(e)}>
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
        <PostPreview
          open={showPostPreview}
          post={currentPost}
          onClickClose={this.handleClosePostPreview}
          onClickEdit={this.handleEditPost}
          onClickDelete={this.handleDeletePost}
        />
      </Paper>
    )
  }
}
