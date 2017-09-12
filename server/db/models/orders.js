const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define('order', {
  order: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  hasShipped: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {})

module.exports = Order
