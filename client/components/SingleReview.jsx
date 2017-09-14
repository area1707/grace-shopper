import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import React, {Component} from 'react'
import {withRouter} from 'react-router'

function SingleReview(props) {

  console.log('HERE!!!!', props)
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
          {stars(review.star).map( img => img)}

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


{/* <div className="media">
          <div className="media-left media-middle icon-container">
            put stars here?
          </div>
          <div className="media-body media-middle" >
            <table>
            <tr>
              <th>Month</th>
              <th>Savings</th>
            </tr>
            <tr>
              <td>January</td>
              <td>$100</td>
            </tr>
          </table>
          </div>
          <div className="media-right media-middle">
          {review.content}
          </div>
        </div> */}
