import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {removeAccessory, updateAccessory} from '../reducers/accessories'

class SingleAccessory extends Component {
  constructor(props){
    super(props)
    this.state = {
      isEditing: false,
      name: this.props.accessory.name,
      image: this.props.accessory.imageUrl,
      price: this.props.accessory.price
    }
    this.removeAccessory = this.removeAccessory.bind(this)
    this.doneEdit = this.doneEdit.bind(this)
    this.clickEdit = this.clickEdit.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
    this.updateAccessoryName = this.updateAccessoryName.bind(this)
    this.updateAccessoryImage = this.updateAccessoryImage.bind(this)
    this.updateAccessoryPrice = this.updateAccessoryPrice.bind(this)
  }

  render() {
    const { accessory } = this.props
    if (this.state.isEditing) {
      return (
        <div className="list-group-item min-content user-item">
          <form className="media">
            <div className="media-left media-middle icon-container">
              <button
                type="submit"
                onClick={this.doneEdit}
              >Save</button>
              <button
                type="cancel"
                onClick={this.cancelEdit}
              >Cancel</button>
            </div>
            <div className="media-body">
              <h4 className="media-heading tucked">
                <input
                  name="name"
                  type="text"
                  required
                  className="form-like"
                  value={this.state.name}
                  onChange={this.updateAccessoryName}
                />
              </h4>
              <h5 className="tucked">
                <input
                  name="picture"
                  type="text"
                  className="form-like"
                  value={this.state.image}
                  onChange={this.updateAccessoryImage}
                />
              </h5>
              <h5 className="tucked">
                <input
                  name="price"
                  type="text"
                  className="form-like"
                  value={this.state.price}
                  onChange={this.updateAccessoryPrice}
                />
              </h5>
              </div>
            </form>
          </div>
      )
    }

    return (
      <div className="list-group-item min-content students-item">
        <div className="media">
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
        </div>
      </div>
    );
  }
  removeAccessory (event) {
    const { accessory, removeAccessory } = this.props;
    event.stopPropagation()
    removeAccessory(accessory.id)
  }
  clickEdit(event) {
    this.setState({isEditing: true})
  }
  updateAccessoryName(event) {
    const name = event.target.value
    return this.setState({name})
  }
  updateAccessoryImage(event) {
    const image = event.target.value
    return this.setState({image})
  }
  updateAccessoryPrice(event) {
    const price = event.target.value
    return this.setState({price})
  }
  doneEdit(event) {
    const {accessory, updateAccessory} = this.props
    event.preventDefault()
    updateAccessory(accessory.id, {
      name: this.state.name,
      image: this.state.imageUrl,
      price: this.state.price
    })
    this.setState({isEditing: false})
  }
  cancelEdit(event) {
    return this.setState({isEditing: false})
  }
}

const mapState = ({accessories}) => ({accessories})
const mapDispatch = {removeAccessory, updateAccessory};

export default withRouter(connect(mapState, mapDispatch)(SingleAccessory))
