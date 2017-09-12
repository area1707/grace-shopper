const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define('order', {
  order: {
    //storing the id of the accessory
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  status: {
    type: Sequelize.ENUM,
    values: ['incomplete', 'created', 'processing', 'cancelled', 'completed'],
    defaultValue: 'created'
  }
}, {})


module.exports = Order
