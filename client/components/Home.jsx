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
        <img className="mascot" src="/img/cat-banner.gif" />
        <center><h1>{ searchValue.toUpperCase() || 'ALL ACCESSORIES'}</h1></center>
      {
        searchResults.length ? searchResults.map(accessory => {
          return (
            <img className="allProducts" src ={accessory.imageUrl}/>
          )
        }) :
        accessories.map(accessory => {
          return (
            <img className="allProducts" src ={accessory.imageUrl}/>
          )
        })
      }
      </div>
    )

    // return (
    //   <div className="container">
    //     <img className="mascot" src="/img/tabby-cat.png" />
    //   {
    //     searchResults.length ? searchResults.map(accessory => {
    //       return (<SingleAccessory accessory={accessory} key={accessory.id} />)
    //     }) :
    //     accessories.map(accessory => {
    //       return (<SingleAccessory accessory={accessory} key={accessory.id} />)
    //     })
    //   }
    //   </div>
    // )
  }
}

const mapState = ({accessories}) => ({accessories})
const mapDispatch = {}

const HomeContainer = withRouter(connect(mapState, mapDispatch)(Home))
export default HomeContainer
