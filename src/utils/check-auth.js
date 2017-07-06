import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import propTypes from 'prop-types'

export default function checkAuth(requireAuth) {
  return function(Comp) {
    @inject('userStore')
    @observer
    class CheckAuth extends Component {
      static propTypes = {
        userStore: propTypes.object,
        history: propTypes.object
      }

      redirect = true

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
            this.props.history.push('/admin/login')
          }
        } else {
          if (isAuthenticated) {
            this.props.history.push('/admin')
          }
        }
        this.redirect = (requireAuth && !isAuthenticated) || (!requireAuth && isAuthenticated)
      }

      render() {
        /* eslint-disable no-unused-vars */
        const { isAuthenticated } = this.props.userStore

        if (this.redirect) return null
        return <Comp {...this.props} />
      }
    }

    return CheckAuth
  }
}
