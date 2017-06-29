import React, { Component } from 'react'
import propTypes from 'prop-types'
import { CircularProgress } from 'material-ui/Progress'
import { withStyles, createStyleSheet } from 'material-ui/styles'

const style = createStyleSheet('PageLoading', {
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

@withStyles(style)
export default class Bundle extends Component {
  static propTypes = {
    load: propTypes.func,
    children: propTypes.func,
    classes: propTypes.object
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
    const { classes } = this.props
    return this.state.mod
      ? this.props.children(this.state.mod) : <div className={classes.wrapper}><CircularProgress /></div>
  }
}
