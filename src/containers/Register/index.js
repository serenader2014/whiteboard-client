import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import propTypes from 'prop-types'

import checkAuth from '../../utils/check-auth'


@checkAuth(false)
export default class Register extends Component {
  render() {
    return (
      <div>Register</div>
    )
  }
}
