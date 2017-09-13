import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import { Router } from 'react-router';
import store from '../store'
import Root from './Root'
import history from './history'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import Cart from './Cart'
import AccessoryDetail from './AccessoryDetail'
import {fetchAccessories} from '../reducers/accessories'

export default class Main extends Component {
  componentDidMount () {
    store.dispatch(fetchAccessories())
  }

  render() {
    return(
      <Router history={history}>
        <Root>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/cart" component={Cart} />
            <Route path="/accessories/:accessoryId" component={AccessoryDetail} />
          </Switch>
        </Root>
      </Router>
    )
  }
}
