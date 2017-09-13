import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import SingleAccessory from './SingleAccessory'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    const {accessories} = this.props
    return (
      <div className="container">
      {
        accessories.map(accessory => {
          return (<SingleAccessory accessory={accessory} key={accessory.id} />)
        })
      }
      </div>
    )
  }
}

const mapState = ({accessories}) => ({accessories})
const mapDispatch = {}

const HomeContainer = withRouter(connect(mapState, mapDispatch)(Home))
export default HomeContainer
