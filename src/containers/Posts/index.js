import React, { Component } from 'react'
import { Paper, Typography, Divider } from 'material-ui'
import { CircularProgress } from 'material-ui/Progress'
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import { pink, blue } from 'material-ui/styles/colors'
import propTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'

import { getPostsList } from '../../actions/posts'

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
    margin: '0 8px',
    textDecoration: 'none',
    '&:hover': {
      color: pink[700]
    }
  },
  postAuthorAvatar: {
    width: 20,
    height: 20,
    borderRadius: '100%',
    marginRight: 5,
    position: 'relative',
    top: 5
  },
  postTitle: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
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
    loadedData: false
  }

  componentDidMount() {
    getPostsList().then(data => {
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
        Published by
        <Link to={`/admin/users/${post.user.id}`} className={classes.postAuthor}>
          <img className={classes.postAuthorAvatar} src={post.user.image || defaultAvatar} />
          {post.user.username}
        </Link>
        on {fromNow(post.publish_at)}
      </span>
    )
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
                  <ListItem>
                    <ListItemText
                      primary={<Link className={classes.postTitle} to={`/admin/posts/${post.id}`}>{post.title}</Link>}
                      secondary={this.renderPostMeta(post)}
                    />
                  </ListItem>
                  <Divider light/>
                </div>
              ))
            }
          </List>
        </Paper>
      </div>
    )
  }
}
