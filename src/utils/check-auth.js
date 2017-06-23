import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

export default function checkAuth(requireAuth) {
  return function(Component) {

    @inject('userStore')
    @observer
    class CheckAuth extends Component {
      componentWillUpdate() {
        this.checkStatus()
      }

      componentWillMount() {
        this.checkStatus()
      }

      checkStatus() {
        const { isAuthenticated } = this.props.userStore
        if (requireAuth) {
          if (!isAuthenticated) {
            this.props.history.push('/login')
          }
        } else {
          if (isAuthenticated) {
            this.props.history.push('/')
          }
        }
      }

      render() {
        const { isAuthenticated } = this.props.userStore
        return <Component {...this.props} />
      }
    }

    return CheckAuth
  }
}
