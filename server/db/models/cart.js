'use strict'
const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  session_id: {
    type: Sequelize.STRING,
    unique: true
  }
})

module.exports = Cart
