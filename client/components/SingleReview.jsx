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
      <div className="list-group-item min-content">
        <div className="review left">{stars(review.star).map( img => img)}</div>
        <div className="review bottom">
            <strong className="bold">Reviewed by:</strong> {review.user.name}
        </div>
        <div className="review right">
          {review.content}
        </div>
      </div>
    );


}

const mapState = ({reviews}) => ({reviews})
// const mapDispatch = {removeAccessory, updateAccessory, addItem}

export default withRouter(connect(mapState)(SingleReview))
