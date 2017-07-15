import React, { Component } from 'react'
import propTypes from 'prop-types'

import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog'
import { Typography, Avatar, Button } from 'material-ui'
import {
  DateRange as DateIcon,
  Bookmark as CategoryIcon
} from 'material-ui-icons'
import { createStyleSheet, withStyles } from 'material-ui/styles'

import { formatStandard } from '../../utils/date-parser'

import defaultAvatar from '../../assets/images/avatar-placeholder.jpeg'

const style = createStyleSheet('PostPreview', theme => ({
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
  },
  '@media (max-width: 800px)': {
    postPreview: {
      width: '100%',
      height: '100%',
      maxHeight: '100%'
    },
    postPreviewMeta: {
      flexDirection: 'column',
      alignItems: 'flex-start'
    },
    postPreviewMetaItem: {
      marginRight: 0,
      marginBottom: 20,
      '&:last-child': {
        marginBottom: 0
      }
    }
  }
}))

@withStyles(style)
export default class PostPreview extends Component {
  static propTypes = {
    open: propTypes.bool,
    classes: propTypes.object,
    post: propTypes.object,
    onClickClose: propTypes.func,
    onClickEdit: propTypes.func,
    onClickDelete: propTypes.func
  }

  render() {
    const { open, classes, post, onClickClose, onClickEdit, onClickDelete } = this.props
    return (
      <Dialog
        open={open}
        classes={{ paper: classes.postPreview }}
      >
        <DialogTitle>{post.title}</DialogTitle>
        <DialogContent>
          <div className={classes.postPreviewMeta}>
            <Typography component="div" className={classes.postPreviewMetaItem}>
              <Avatar className={classes.marginRight10} src={post.user.image || defaultAvatar} />
              {post.user.username}
            </Typography>
            <Typography component="div" className={classes.postPreviewMetaItem}>
              <DateIcon className={classes.marginRight10} /> {formatStandard(post.publish_at)}
            </Typography>
            <Typography component="div" className={classes.postPreviewMetaItem}>
              <CategoryIcon className={classes.marginRight10} /> {post.category.name}
            </Typography>
          </div>
          <Typography component="div" dangerouslySetInnerHTML={{ __html: post.html }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickClose}>Close</Button>
          <Button onClick={onClickEdit}>Edit</Button>
          <Button color="accent" onClick={onClickDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    )
  }
}
