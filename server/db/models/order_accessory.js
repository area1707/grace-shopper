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
})

module.exports = Order_accessory
