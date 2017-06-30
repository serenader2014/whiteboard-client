import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Route } from 'react-router-dom'

import { withStyles, createStyleSheet } from 'material-ui/styles'

import Header from './Header'
import Sidebar from './Sidebar'

import loadPosts from 'bundle-loader?lazy&name=posts!../Posts/index'

import checkAuth from '../../utils/check-auth'
import lazyLoadComponent from '../../utils/lazy-load-component'

const homePageStyleSheet = createStyleSheet('Homepage', theme => ({
  root: {
    height: '100%'
  },
  contentWrapper: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
    paddingLeft: 240
  }
}))

@checkAuth(true)
@withStyles(homePageStyleSheet)
export default class HomePage extends Component {
  static propTypes = {
    classes: propTypes.object,
    history: propTypes.object
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Header history={this.props.history} />
        <Sidebar history={this.props.history} />
        <div className={classes.contentWrapper}>
          <Route exact path="/admin/posts" component={lazyLoadComponent(loadPosts)} />
        </div>
      </div>
    )
  }
}
