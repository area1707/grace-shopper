const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define('order', {
  // OB/SRC: probably better field name would be 'accessoryIds'
  // OB/SRC: but forget about that anyways, use associations instead!
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
