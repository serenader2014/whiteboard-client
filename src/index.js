import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader'
import injectTapEventPlugin from 'react-tap-event-plugin'

import App from './App'
import AppStore from './stores/app'
import UserStore from './stores/user'
import MessageStore from './stores/message'

injectTapEventPlugin()

const appStore = new AppStore()
const userStore = new UserStore()
const messageStore = new MessageStore()

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider appStore={appStore} userStore={userStore} message={messageStore}>
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
