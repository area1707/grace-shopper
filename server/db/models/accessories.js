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
    defaultValue: "https://i.pinimg.com/736x/ab/48/9d/ab489de6e7a85bac1290f4b615e95b04--fat-face-sad-cat.jpg"
  }
}, {})

// OB/SRC: exorcise undead code (from master)
// Accessory.hook('beforeUpdate', (accessory, options) => {
//   return accessory.inventory--
// })

module.exports = Accessory
