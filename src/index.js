import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader'
import injectTapEventPlugin from 'react-tap-event-plugin'

import App from './App'
import stores from './stores/index'

injectTapEventPlugin()

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider {...stores}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App', () => { render(App) })
}
