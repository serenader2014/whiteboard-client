import React, { Component } from 'react'
import propTypes from 'prop-types'
import { observer, inject } from 'mobx-react'

import { Button } from 'material-ui'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import {
  Add as AddIcon
} from 'material-ui-icons'

import PostsList from './Posts'
import CategoriesList from './Categories'

import Loading from '../../components/Loading'

import { requestEditablePostsList, requestCreatePost } from '../../actions/post'

const style = createStyleSheet('Posts', theme => ({
  container: {
    padding: '1.5em',
    flex: 1,
    display: 'flex'
  },
  fab: {
    position: 'fixed',
    bottom: 80,
    right: 65
  }
}))

@inject('postStore')
@observer
@withStyles(style)
export default class Posts extends Component {
  static propTypes = {
    classes: propTypes.object,
    postStore: propTypes.object,
    history: propTypes.object
  }

  state = {
    loadedData: false,
    postItemAnchorEl: null,
    showPostMenu: false,
    showPostPreview: false,
    currentPost: { user: {}, category: {} },
    creatingPost: false
  }

  componentDidMount() {
    requestEditablePostsList().then(data => {
      this.props.postStore.updatePostsList(data)
      this.setState({
        loadedData: true
      })
    })
  }

  handleCreateNewPost = () => {
    this.setState({
      creatingPost: true
    })

    requestCreatePost().then(post => {
      this.props.history.push(`/admin/posts/${post.id}`)
    })
  }

  render() {
    const {
      classes,
      history
    } = this.props

    const { creatingPost } = this.state

    if (!this.state.loadedData) {
      return (
        <Loading />
      )
    }

    return (
      <div className={classes.container}>
        <CategoriesList />
        <PostsList history={history} />
        <Button
          disabled={creatingPost}
          onClick={this.handleCreateNewPost}
          className={classes.fab}
          fab
          color="accent"
        >
          <AddIcon />
        </Button>
      </div>
    )
  }
}
