import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'


export default function checkAuth(requireAuth) {
  return function(Component) {

    @inject('userStore')
    @observer
    class CheckAuth extends Component {
      componentWillMount() {
        this.checkStatus()
      }

      componentWillReact() {
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
