import React, { Component } from 'react'
import { CircularProgress } from 'material-ui'
import propTypes from 'prop-types'

import './style.css'

export default class Bundle extends Component {
  static propTypes = {
    load: propTypes.func,
    children: propTypes.func
  }

  state = {
    mod: null
  }

  componentWillMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load(props) {
    this.setState({
      mod: null
    })
    props.load(mod => {
      this.setState({
        mod: mod.default || mod
      })
    })
  }

  render() {
    return this.state.mod ? this.props.children(this.state.mod) : <div className="loading-page-wrapper"><CircularProgress size={60} /></div>
  }
}
