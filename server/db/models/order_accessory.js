const db = require('../db')
const Sequelize = require('sequelize')

const Order_accessory = db.define('order_accessory', {
  orderedPrice: {
    type: Sequelize.STRING
  }
})

module.exports = Order_accessory
