const db = require('../db')
const Sequelize = require('sequelize')

const Order_accessory = db.define('order_accessory', {
  orderedPrice: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
}, {
    // hooks: {
    //   beforeCreate: function(accessory) {
    //     Order_accessory.findById(accessory.id).then(
    //       accessory => {
    //         if (accessory.id) {
    //           accessory.quantity++
    //           accessory.save()
    //           .then( () => Sequelize.Promise.reject('Already exists')
    //         )}
    //       }
    //     )
    //   }
    // }
    // classMethods: {
    //   insertOrIncrement: function(accessoryId) {
    //     return accessoryId
    //   }
    // }
})

Order_accessory.insertOrIncrement = function(accessoryId) {
  Order_accessory.findOne({where:{accessoryId: accessoryId}})
    .then( accessory => {
      if (!accessory) return false
      else return accessory
    })
}


//class method insert or increment, looks in the table
//order instance method add or increment accessories to call the order-accessories class method
//'upsert' is update or insert
module.exports = Order_accessory
