import React, {Component} from 'react'
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import store from '../store'
import Navbar from './Navbar'

export default class Main extends Component {
  render() {
    return(
      <Router>
        <div>
          <Navbar />
        </div>
      </Router>
    )
  }
}
