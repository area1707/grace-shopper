import {connect} from 'react-redux'
import React, {Component} from 'react'
import {withRouter} from 'react-router'

function SingleReview(props) {

    const review  = props.review
    const stars = (num) => {
      let reviewStars = []
      for (var star = 1; star <= num; star++) {
        reviewStars.push(<img src="/img/star.svg" className="star" key={star} />)
      }
      return reviewStars
    }

    return (
      <div className="list-group-item min-content students-item">
        <div>
          <div>{stars(review.star).map( img => img)}</div>
          <div>Reviewed by: {review.user.name}</div>
        </div>
        <div>
          {review.content}
        </div>
      </div>
    );


}

const mapState = ({reviews}) => ({reviews})
// const mapDispatch = {removeAccessory, updateAccessory, addItem}

export default withRouter(connect(mapState)(SingleReview))
