import React from 'react'
import Bundle from '../components/Bundle'

export default function lazyLoadComponent(component) {
  return function(props) {
    return <Bundle load={component}>
      {LoadedComponent => <LoadedComponent {...props} />}
    </Bundle>
  }
}
