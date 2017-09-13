const db = require('../db')
const Sequelize = require('sequelize')

// OB/SRC: naming convention inconsitency, probably want to go with pascal case here
const Order_accessory = db.define('order_accessory')

module.exports = Order_accessory
