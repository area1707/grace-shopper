const db = require('../db')
const Sequelize = require('sequelize')

const Order_accessory = db.define('order_accessory', {
  orderedPrice: {
    type: Sequelize.STRING
  }
}, {
  hooks: {
    beforeCreate: function(accessory) {
      Order_accessory.findById(accessory.id).then(
        accessory => {
          if (accessory.id) {
            accessory.quantity++
            accessory.save()
            .then( () => Sequelize.Promise.reject('Already exists')
          )
          }
        }
      )
    }
  }
})

module.exports = Order_accessory
