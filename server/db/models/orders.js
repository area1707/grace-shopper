const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM,
    values: ['incomplete', 'created', 'processing', 'cancelled', 'completed'],
    defaultValue: 'incomplete'
  }
}, {})


module.exports = Order
