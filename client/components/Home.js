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
    const {accessories, searchValue} = this.props
    let searchResults = [];
    accessories.forEach(accessory => {
      if (accessory.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) searchResults.push(accessory)
    })

    return (
      <div className="container">
      {
        searchResults.length ? searchResults.map(accessory => {
          return (<SingleAccessory accessory={accessory} key={accessory.id} />) 
        }) : 
        accessories.map(accessory => {
          return (<SingleAccessory accessory={accessory} key={accessory.id} />)
        })
      }
      </div>
    )
  }
}

const mapState = ({accessories}) => ({accessories})
const mapDispatch = {  };

const HomeContainer = withRouter(connect(mapState, mapDispatch)(Home))
export default HomeContainer
