const db = require('../db')
const Sequelize = require('sequelize')
const Accessory = require('./accessories')
const Order = require('./orders')

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
      { model: Accessory},
      { model: Order }

    ]
  },
  hooks: {
    // KM/SC -- remove dead code in master!
    // beforeBulkCreate: (orderedAccessories) => {
    //   // Accessory.findById(orderedAccessories.accessoryId)
    //   //   .then((accessory) => {orderedAccessories.orderedPrice = accessory.price})
    //   for (const accessoryOrder in orderedAccessories) {
    //     Accessory.findById(accessoryOrder.id)
    //       .then( accessory => {accessoryOrder.orderedPrice = accessory.price})
    //   }
    // }
  }
})

// KM/SC -- obsolete? Make sure you're only doing this in one place
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
