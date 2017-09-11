import React, {Component} from 'react'
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import store from '../store'

export default class Main extends Component {
  render() {
    return(
      <Router>
        <div>
          Tabby Cats
        </div>
      </Router>
    )
  }
}
