import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Route } from 'react-router-dom'

import { withStyles, createStyleSheet } from 'material-ui/styles'
import c from 'classnames'

import Header from './Header'
import Sidebar from './Sidebar'

import loadPosts from 'bundle-loader?lazy&name=posts!../Posts/index'
import loadEditPost from 'bundle-loader?lazy&name=post-preview!../EditPost/index'

import checkAuth from '../../utils/check-auth'
import lazyLoadComponent from '../../utils/lazy-load-component'

const contentStyle = createStyleSheet('Content', {
  wrapper: {
    paddingTop: 64,
    flex: 1,
    display: 'flex'
  }
})

@withStyles(contentStyle)
class Content extends Component {
  static propTypes = {
    location: propTypes.object,
    classes: propTypes.object,
    isMobileView: propTypes.bool
  }

  shouldComponentUpdate(nextProps) {
    return this.props.location.pathname !== nextProps.location.pathname
  }

  render() {
    return (
      <div className={this.props.classes.wrapper}>
        <Route exact path="/admin/posts" component={lazyLoadComponent(loadPosts)} />
        <Route exact path="/admin/posts/:id" component={lazyLoadComponent(loadEditPost)} />
      </div>
    )
  }
}

const homePageStyleSheet = createStyleSheet('Homepage', theme => ({
  root: {
    height: '100%'
  },
  contentWrapper: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
    display: 'flex'
  },
  desktopStyle: {
    paddingLeft: 240
  }
}))

@checkAuth(true)
@withStyles(homePageStyleSheet)
export default class HomePage extends Component {
  static propTypes = {
    classes: propTypes.object,
    history: propTypes.object,
    location: propTypes.object
  }

  isMobileView = false

  state = {
    dockDrawer: false,
    showSidebar: false
  }

  componentDidMount() {
    this.checkWindowSize()
    window.addEventListener('resize', this.checkWindowSize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkWindowSize)
  }

  checkWindowSize = () => {
    const isMobileView = window.innerWidth <= 800

    this.isMobileView = isMobileView

    this.setState({
      dockDrawer: !isMobileView,
      showSidebar: !isMobileView
    })
  }

  handleClickHeaderMenu = () => {
    if (this.isMobileView) {
      this.setState({
        showSidebar: !this.state.showSidebar
      })
    }
  }

  handleCloseDrawer = () => {
    this.setState({
      showSidebar: false
    })
  }

  render() {
    const { classes, history, location } = this.props
    return (
      <div className={classes.root}>
        <Header
          history={history}
          handleClickMenu={this.handleClickHeaderMenu}
        />
        <Sidebar
          history={history}
          dockDrawer={this.state.dockDrawer}
          open={this.state.showSidebar}
          handleClose={this.handleCloseDrawer}
          location={location}
        />
        <div className={c(classes.contentWrapper, {[classes.desktopStyle]: !this.isMobileView})}>
          <Content
            location={location}
          />
        </div>
      </div>
    )
  }
}
