import {connect} from 'react-redux'
import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {addReview} from '../reducers/reviews'

class WriteReview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedStars: 0
    }
  }
  render() {
    const accessory  = props.accessory
    const stars = (num) => {
      let reviewStars = []
      for (var star = 1; star <= num; star++) {
        reviewStars.push(<img src="/img/star.svg" className="star" key={star} />)
      }
      return reviewStars
    }

    const starRender = (starsArr) => starArr.map(star => star)
      return (
          <div>
            <img src={accessory.imageUrl} />
            <h3>{accessory.name}</h3>
            <form>
              <div class="form-group">
                <label for="exampleFormControlSelect1">Select Rating</label>
                <select class="form-control" id="exampleFormControlSelect1" >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div>
                {/*if value on option select, change STATE*/}
              </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">What did you think?!</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
          </form>
          </div>
    );
  }
}

const mapState = ({reviews}) => ({reviews})
const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit: function(event, accessoryId) {
      //const content
      //const star
      //const accessoryId
      //const userId
      event.preventDefault()
      dispatch(addReview(/*add body to submit here*/))
      ownProps.history.push('/')
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(WriteReview))
