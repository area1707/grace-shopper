import React, {Component} from 'react'
import { connect } from 'react-redux';
import {withRouter} from 'react-router'
import SingleAccessory from './SingleAccessory'
import SingleReview from './SingleReview'


function Accessory(props) {

  const accessoryId =  props.match.params.accessoryId
  const accessories = props.accessories
  const accessory = accessories.find((acc) => acc.id === +accessoryId)
  const reviews = props.reviews
  console.log(reviews)
  return (
    <div className="single-accessory">
      <SingleAccessory accessory={accessory} />
      {
        reviews.map(review => {
          console.log(review.accessoryId, 'review.accesoryid')
          console.log(+accessoryId, 'accesoryid')
          if (review.accessoryId === +accessoryId) return <SingleReview review={review} key={review.id} />
          }
        )
      }
    </div>
  )
}

const mapState = ({accessories, reviews}) => ({accessories, reviews})


const AccessoryContainer = withRouter(connect(mapState)(Accessory))
export default AccessoryContainer
