import React, { Component } from 'react'
import propTypes from 'prop-types'

import { createStyleSheet, withStyles } from 'material-ui/styles'
import { CircularProgress, Typography } from 'material-ui'

const loadingStyle = createStyleSheet('Loading', {
  progressWrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  progressText: {
    marginTop: 10
  }
})

@withStyles(loadingStyle)
export default class Loading extends Component {
  static propTypes = {
    classes: propTypes.object,
    text: propTypes.string
  }
  render() {
    const { classes, text } = this.props
    return (
      <div className={classes.progressWrapper}>
        <CircularProgress />
        <Typography
          type="body1"
          color="secondary"
          className={classes.progressText}
        >
          { text || 'Loading data'}
        </Typography>
      </div>
    )
  }
}
