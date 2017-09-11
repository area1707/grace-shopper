import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

render (
    // // <Provider store={store}>
    //   <Router>
    //     <Main />
    //   </Router>,
    // // </Provider>,
    <div>HELLOOOOOO, this is in main</div>,
    document.getElementById('main')
  )