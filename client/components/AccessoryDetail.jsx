import React, {Component} from 'react'
import { connect } from 'react-redux';
import {withRouter} from 'react-router'
import SingleAccessory from './singleAccessory'

function Accessory(props) {
  const accessoryId =  props.match.params.accessoryId
  const accessories = props.accessories
  const accessory = accessories.find((acc) => acc.id === +accessoryId)
  console.log('accessories', accessories)
  console.log('accessoryId', accessoryId)
  console.log('accessory', accessory)
  // console.log()
  return (
    <SingleAccessory accessory={accessory} />
  )
}

const mapState = ({accessories}) => ({accessories})
// const mapDispatch = () => {
//   return {

//   }
// }

const AccessoryContainer = withRouter(connect(mapState)(Accessory))
export default AccessoryContainer
