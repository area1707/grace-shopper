import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import React from 'react'
import {withRouter} from 'react-router'

function OrderAccessory(props){
  const { orderAcc } = props // KM/SC -- choose spaces or no-spaces in object destructuring
  const accessory = orderAcc.accessory
  // KM/SC -- note single/double quote usage in style guide (for JSX vs. JS)
  return (
    <div className="list-group-item min-content accessory-item grey">
      <div className="media">
        <div className="media-left">
          <img src={accessory.imageUrl} height="200" width="400"/>
        </div>
        <div className="media-body">
          <h3 className="media-heading tucked center">
            <span >{accessory.name.toUpperCase()}</span>
          </h3>
          <p>
            <span >{accessory.description}</span>
          </p>
          <p className="">
            <span placeholder="10">Color: {accessory.color}</span>
          </p>
          <p className="">
            <span placeholder="$10">Price: ${accessory.price}</span>
          </p>
          <p className="">
            <span placeholder="10">Quantity: {orderAcc.quantity}</span>
          </p>
        </div>
        <div className="media-right media-middle">
            <NavLink to="/review" onClick={(e) => this.handleReviewAdd(e, user, accessory)}>
          <button
              className="btn btn-default"
              value={accessory.id}>
            <span className="glyphicon glyphicon-plus" />
          </button>
        </NavLink>
        </div>
      </div>
    </div>
  );
}

// KM/SC -- delete dead code from master
  // handleReviewAdd(e, user, selectedProduct) {
  //   e.preventDefault()
  //   this.props.addReview(user, selectedProduct, 1)
  // }


//const mapState = ({user}) => ({user})
//const mapDispatch = {addReview}
const mapState = null;
const mapDispatch = null;

const OrderAccessoryContainer = withRouter(connect(mapState, mapDispatch)(OrderAccessory))
export default OrderAccessoryContainer
