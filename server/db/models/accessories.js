const db = require('../db')
const Sequelize = require('sequelize')

const Accessory = db.define('accessory', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.ENUM,
    values: ['glasses', 'hats', 'toys'],
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  color: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {})

module.exports = Accessory
