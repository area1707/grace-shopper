import { connect } from 'react-redux'
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { addReview } from '../reducers/reviews'

class WriteReview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedStars: 0
    }
  }
  render() {
    const accessory = this.props.accessory
    const stars = (num) => {
      let reviewStars = []
      for (var star = 1; star <= num; star++) {
        reviewStars.push(<img src="/img/star.svg" className="star" key={star} />)
      }
      return reviewStars
    }

    return (
      <div>
        <img src={accessory.imageUrl} />
        <h3>{accessory.name}</h3>
        <form>
          <div className="form-group">
            <label for="exampleFormControlSelect1">Select Rating</label>
            <select className="form-control" id="exampleFormControlSelect1" onChange={() => this.setState({selectedStars: event.target.value})}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div>
            {this.state.selectedStars ? stars(this.state.selectedStars).map(img => img) : null}
          </div>
          <div className="form-group">
            <label for="exampleFormControlTextarea1">What did you think?!</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
        </form>
      </div>
    );
  }
}

const mapState = ({ reviews }) => ({ reviews })
const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit: function (event, accessoryId) {
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
