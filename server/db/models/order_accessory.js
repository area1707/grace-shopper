const db = require('../db')
const Sequelize = require('sequelize')
const Accessory = require('./accessories')

const Order_accessory = db.define('order_accessory', {
  orderedPrice: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
}, {
  defaultScope: {
    include: [
      { model: Accessory}
    ]
  },
  hooks: {
    beforeValidate: (orderedAccessory) => {
      Accessory.findById(orderedAccessory.accessoryId)
        .then((accessory) => {orderedAccessory.orderedPrice = accessory.price})
    }
  }
})

Order_accessory.insertOrIncrement = function(accessoryId) {
  Order_accessory.find({where:{accessoryId}})
    .then( accessory => {
      if (!accessory) return false
      else {
        accessory.quantity++
        return accessory.save()
      }
    })
}


//class method insert or increment, looks in the table
//order instance method add or increment accessories to call the order-accessories class method
//'upsert' is update or insert
module.exports = Order_accessory
