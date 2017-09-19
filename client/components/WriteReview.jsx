import { connect } from 'react-redux'
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { addReview } from '../reducers/reviews'
import { fetchAccessories } from '../reducers/accessories'
import store from '../store'


class WriteReview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedStars: 1
    }
  }

  componentDidMount () {
    store.dispatch(fetchAccessories())
  }

  shouldComponentUpdate(nextProps) {
    const differentRating = this.state.selectedStars !== nextProps.selectedStars;
    return differentRating
}


  render() {
    const {accessories} = this.props
    const accessoryId = this.props.match.params.accessoryId
    const accessory = accessories.find((acc) => acc.id === +accessoryId)
    const userId = this.props.match.params.userId
    const stars = (num) => {
      let reviewStars = []
      for (var star = 1; star <= num; star++) {
        reviewStars.push(<img src="/img/star.svg" className="star" key={star} />)
      }
      return reviewStars
    }
    console.log('THIS DOT STATE', this.state)
    return (
      <div>
        { accessory &&
          <div className="banner">
          <img className="allProducts" src={accessory.imageUrl} />
          <h2>{accessory.name}</h2>
          </div>
        }
        <form onSubmit={(evt) => {this.props.handleSubmit(evt, userId, accessoryId)}}>
          <div className="form-group">
            <label for="exampleFormControlSelect1">Select Rating</label>
            <select
            name="star"
            className="form-control"
            id="exampleFormControlSelect1"
            onChange={() => this.setState({selectedStars: event.target.value})
            }>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div>
            {this.state.selectedStars && stars(this.state.selectedStars).map(img => img)}
          </div>
          <div className="form-group">
            <label>What did you think?!</label>
            <textarea name="content" className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
          <div className='form-group'>
              <button type='submit' className='btn btn-default'>Submit Review</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapState = ({ reviews, accessories }) => ({ reviews, accessories })
const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit: function (event, userId, accessoryId) {
      const content = event.target.content.value
      const star = event.target.star.value
      event.preventDefault()
      dispatch(addReview({content, star, userId, accessoryId}))
      ownProps.history.push(`/`)
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(WriteReview))
