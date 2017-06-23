import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader'
import { MuiThemeProvider } from 'material-ui/styles'

import App from './App'
import AppStore from './stores/app'
import UserStore from './stores/user'

const appStore = new AppStore()
const userStore = new UserStore()

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider appStore={appStore} userStore={userStore}>
          <MuiThemeProvider>
            <Component />
          </MuiThemeProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App', () => { render(App) })
}
