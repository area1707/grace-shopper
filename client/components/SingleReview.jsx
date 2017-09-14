import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {removeAccessory, updateAccessory} from '../reducers/accessories'
import {addItem} from '../reducers/cart'

function SingleReview(props) {

  console.log('HERE!!!!', props)
    return (
      <div className="list-group-item min-content students-item">
        {/* <div className="media">
          <div className="media-left media-middle icon-container">
            <img className="media-object img-circle" src={accessory.imageUrl} height="120" width="120"/>
          </div>
          <NavLink
            className="media-body"
            activeClassName="active"
            to={`/accessories/${accessory.id}`}>
            <h4 className="media-heading tucked">
              <span placeholder="tabby glasses">{accessory.name}</span>
            </h4>
            <p className="">
              <span placeholder="tabby glasses">{accessory.description}</span>
            </p>
            <p className="">
              <span placeholder="10">Color: {accessory.color}</span>
            </p>
            <p className="">
              <span placeholder="$10">${accessory.price}</span>
            </p>
            <p className="">
              <span placeholder="10">In store: {accessory.inventory}</span>
            </p>
          </NavLink>
          <div className="media-right media-middle">
            <button
                className="btn btn-default"
                onClick={this.removeAccessory}
                value={accessory.id}>
              <span className="glyphicon glyphicon-remove" />
            </button>
          </div>
          <div className="media-right media-middle">
            <button
                className="btn btn-default"
                onClick={this.clickEdit}
                value={accessory.id}>
              <span className="glyphicon glyphicon-edit" />
            </button>
          </div>
          <div className="media-right media-middle">
            <button
                className="btn btn-default"
                onClick={() => this.props.addItem(accessory) }
                value={accessory.id}>
              <span className="glyphicon glyphicon-plus" />
            </button>
          </div>
        </div> */}
        {/* {review} */}
        test
      </div>
    );


}

const mapState = ({reviews}) => ({reviews})
// const mapDispatch = {removeAccessory, updateAccessory, addItem}

export default withRouter(connect(mapState)(SingleReview))
