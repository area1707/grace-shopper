import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import SingleAccessory from './SingleAccessory'

class SearchValues extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { searchValue, accessories } = this.props
        const filteredSearch = accessories.filter(searchvalue)

        return (
            <div className="container">
            {
                filteredSearch.map(accessory => {
                return (<SingleAccessory accessory={accessory} key={accessory.id} />)
                })
            }
            </div>
        )
    }
}

const mapState = ({ accessories }) => ({ accessories })
const mapDispatch = {};

const SearchValuesContainer = withRouter(connect(mapState, mapDispatch)(Home))
export default SearchValuesContainer