import React, { Component } from 'react'
import propTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { schema, defaultMarkdownParser, defaultMarkdownSerializer } from 'prosemirror-markdown'
import { exampleSetup } from 'prosemirror-example-setup'

import { createStyleSheet, withStyles } from 'material-ui/styles'
import { Paper, TextField, Button, Divider } from 'material-ui'

import Loading from '../../components/Loading'

import { requestPostDetail } from '../../actions/post'

const editorStyle = createStyleSheet('Editor', theme => ({
  wrapper: {
    flex: 1,
    padding: '1em',
    display: 'flex'
  },
  paper: {
    padding: '1em',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  editor: {
    flex: 1,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  }
}))

@withStyles(editorStyle)
@inject('postStore')
@observer
export default class EditPost extends Component {
  static propTypes = {
    postStore: propTypes.object,
    match: propTypes.object,
    classes: propTypes.object
  }

  componentDidMount() {
    requestPostDetail(this.props.match.params.id).then(post => {
      this.props.postStore.setCurrentPost(post)
    })
  }

  componentWillReact() {
    this.initEditor()
  }

  initEditor = (el) => {
    // const el = this.el

    if (!el) return

    const view = new EditorView(el, {
      state: EditorState.create({
        doc: defaultMarkdownParser.parse(this.props.postStore.currentPost.content || '')
        // plugins: exampleSetup({ schema })
      })
    })

    view.focus()
  }

  setEditorRef = el => {
    this.el = el
  }

  handleChangeTitle = e => {
    this.props.postStore.updateCurrentPost({
      title: e.target.value
    })
  }

  render() {
    const { classes, postStore: { currentPost } } = this.props

    if (!currentPost.id) return <Loading />

    return (
      <div className={classes.wrapper}>
        <Paper className={classes.paper}>
          <TextField
            label="Post title"
            type="text"
            marginForm
            fullWidth
            value={currentPost.title}
            onChange={this.handleChangeTitle}
          />
          <div ref={this.initEditor} className={classes.editor}></div>
          <Divider />
          <div>
            <Button>Save Draft</Button>
            <Button raised color="primary">Publish</Button>
          </div>
        </Paper>
      </div>
    )
  }
}
