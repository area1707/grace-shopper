import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import { Router } from 'react-router';
import store from '../store'
import Root from './Root'
import history from './history'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import AccessoryDetail from './AccessoryDetail'
import Navbar from './Navbar'
import {fetchAccessories} from '../reducers/accessories'

export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      searchValue: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (searchValue) {
    this.setState({ searchValue })
  }

  componentDidMount () {
    store.dispatch(fetchAccessories())
  }

  render() {
    console.log(this.state, 'im in main')
    return(
      <Router history={history}>
        <Root>
          <Navbar handleSubmit={this.handleSubmit}/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/accessories/:accessoryId" component={AccessoryDetail} />
          </Switch>
        </Root>
      </Router>
    )
  }
}
