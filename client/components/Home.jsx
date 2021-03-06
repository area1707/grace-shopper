import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {NavLink} from 'react-router-dom'
import SingleAccessory from './SingleAccessory'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    const {accessories, searchValue} = this.props
    let searchResults = [];
    accessories.forEach(accessory => {
      if (accessory.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 || accessory.category.toLowerCase() === searchValue.toLowerCase()) searchResults.push(accessory)
    })

    return (
      <div className="container">
        <div className="banner">
          <img className="mascot" src="/img/cat-banner.gif" />
          <p>TABBY CAT EMPORIUM</p>
        </div>
        <center><h1>{ searchValue.toUpperCase() || 'ALL ACCESSORIES'}</h1></center>
      {
        searchResults.length ? searchResults.map(accessory => {
          return (
            <NavLink
            activeClassName="active"
            to={`/accessories/${accessory.id}`} key={accessory.id}>
            <img className="allProducts" src ={accessory.imageUrl}/>
            </NavLink>
          )
        }) :
        accessories.map(accessory => {
          return (
            <NavLink
            activeClassName="active"
            to={`/accessories/${accessory.id}`}>
            <img className="allProducts" src ={accessory.imageUrl}/>
            </NavLink>
          )
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
