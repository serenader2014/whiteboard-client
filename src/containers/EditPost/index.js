import React, { Component } from 'react'
import propTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { schema, defaultMarkdownParser, defaultMarkdownSerializer } from 'prosemirror-markdown'
import { exampleSetup } from 'prosemirror-example-setup'

import { requestPostDetail } from '../../actions/post'

@inject('postStore')
@observer
export default class EditPost extends Component {
  static propTypes = {
    postStore: propTypes.object,
    match: propTypes.object
  }

  componentDidMount() {
    requestPostDetail(this.props.match.params.id).then(post => {
      this.props.postStore.setCurrentPost(post)
    })
  }

  componentWillReact() {
    this.initEditor()
  }

  initEditor() {
    const el = this.el

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

  render() {
    const { currentPost } = this.props.postStore
    return <div ref={this.setEditorRef} style={{height: 500}}></div>
  }
}
