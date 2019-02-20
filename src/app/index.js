import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { Reset } from 'minimui'

import reducer from './reducers'
import NotFound from './components/NotFound'
import PancakesContainer from './containers/PancakesContainer'

const middlewares = [thunkMiddleware, createLogger()]
const configureStore = (preloadedState) => {
  const store = createStore(
    reducer,
    preloadedState,
    applyMiddleware(...middlewares)
  )
  return store
}
const store = configureStore({})

render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Reset />
        <Switch>
          <Route exact path='/app' component={PancakesContainer} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
