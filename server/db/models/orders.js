const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define('order', {
  order: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  status: {
    type: Sequelize.ENUM,
    values: ['created', 'processing', 'cancelled', 'completed'],
    defaultValue: 'created'
  }
}, {})

module.exports = Order
