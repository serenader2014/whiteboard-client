import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import propTypes from 'prop-types'
import qs from 'querystring'

export default function checkAuth(requireAuth) {
  return function(Comp) {
    @inject('userStore')
    @observer
    class CheckAuth extends Component {
      static propTypes = {
        userStore: propTypes.object,
        history: propTypes.object,
        location: propTypes.object
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
        const { pathname, search } = this.props.location
        if (requireAuth) {
          if (!isAuthenticated) {
            this.props.history.push(`/admin/login?redirect=${pathname}${search}`)
          }
        } else {
          if (isAuthenticated) {
            const { redirect } = qs.parse(this.props.location.search.substr(1))
            this.props.history.push(redirect || '/admin')
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
