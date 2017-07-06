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
    onChange: propTypes.func,
    validators: propTypes.array,
    value: propTypes.string,
    updateStatus: propTypes.func
  }

  state = {
    error: false,
    helperText: ' '
  }

  handleOnChange = e => {
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
      e.persist()
      e.error = !isValid
      e.message = !isValid ? message : ''
    }

    this.props.onChange && this.props.onChange(e)
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
      <Text {...props} onChange={this.handleOnChange} error={this.state.error} helperText={this.state.helperText} />
    )
  }
}
