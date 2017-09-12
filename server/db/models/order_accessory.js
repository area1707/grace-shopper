const db = require('../db')
const Sequelize = require('sequelize')

const Order_accessory = db.define('order_accessory')

module.exports = Order_accessory
