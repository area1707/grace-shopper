import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store.js'
import Main from './components/Main'
import '../public/index.scss'

render (
  <Provider store={store}>
    <Router> {/* OB/SRC: killll meeeee */}
      <Main />
    </Router>
  </Provider>,
  document.getElementById('main')
)
