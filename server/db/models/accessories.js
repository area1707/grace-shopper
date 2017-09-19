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
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/img/default-acc-img.svg'
  }
}, {})

// Accessory.hook('beforeUpdate', (accessory, options) => {
//   return accessory.inventory--
// })

module.exports = Accessory
