import React, { Component } from 'react'
import { TextField as Text } from 'material-ui'
import propTypes from 'prop-types'
import validator from 'validator'

const pick = (obj, arr) => Object.keys(obj).filter(key => ~arr.indexOf(key)).reduce((o, item) => {
  o[item] = obj[item]
  return o
}, {})

export default class TextField extends Component {
  static propTypes = {
    validation: propTypes.object,
    onBlur: propTypes.func,
    validators: propTypes.array,
    value: propTypes.string,
    updateStatus: propTypes.func
  }

  state = {
    error: false,
    helperText: ' '
  }

  handleOnBlur = e => {
    if (this.props.validators) {
      /* 
        validation = [{
          func: 'isEmail',
          options: [],
          errorMessage: 'error message'
        }]
      */
      let isValid = true
      let message = ''
      const validators = Array.isArray(this.props.validators) ? this.props.validators : [this.props.validators]
      for (const i of validators) {
        const funcName = i.func
        const result = validator[funcName](this.props.value, i.options)
        if (!result) {
          isValid = false
          message = i.errorMessage
          break
        }
      }

      if (!isValid) {
        this.setState({
          error: true,
          helperText: message
        })
      } else {
        this.setState({
          error: false,
          helperText: ' '
        })
      }

      this.props.updateStatus && this.props.updateStatus({ error: !isValid, message: !isValid ? message : '' })
    } else if (this.props.onBlur) {
      this.props.onBlur(e)
    }
  }

  render() {
    const props = pick(this.props, [
      'value',
      'type',
      'rows',
      'rowsMax',
      'required',
      'name',
      'multiline',
      'id',
      'disabled',
      'devalutValue',
      'label',
      'onChange',
      'marginForm',
      'className'
    ])
    return (
      <Text {...props} onBlur={this.handleOnBlur} error={this.state.error} helperText={this.state.helperText} />
    )
  }
}
