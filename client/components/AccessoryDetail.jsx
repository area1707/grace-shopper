import React, {Component} from 'react'
import { connect } from 'react-redux';
import {withRouter} from 'react-router'
import SingleAccessory from './SingleAccessory'

function Accessory(props) {

  const accessoryId =  props.match.params.accessoryId
  const accessories = props.accessories
  const accessory = accessories.find((acc) => acc.id === +accessoryId)

  return (
    <SingleAccessory accessory={accessory} />
  )
}

const mapState = ({accessories}) => ({accessories})


const AccessoryContainer = withRouter(connect(mapState)(Accessory))
export default AccessoryContainer
