import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

@inject('userStore')
@observer
export default class RouteWithAuthState extends Component {
  render() {
    const {
      loginRequired,
      userStore: { isAuthenticated },
      component: Comp,
      ...rest
    } = this.props

    let children

    if (loginRequired) {
      children = props => {
        if (props.match) {
          return isAuthenticated ? <Comp {...props} /> : <Redirect push={true} to={{ pathname: '/login', state: { from: props.location }}} />
        }
        return null 
      }
    } else {
      children = props => {
        if (props.match) {
          return isAuthenticated ? <Redirect to={{ pathname: '/' }} push={true} /> : <Comp {...props} />
        }
        return null
      }
    }

    return (
      <Route {...rest} children={children} />
    )
  }
}
