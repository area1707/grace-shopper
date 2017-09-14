const db = require('../db')
const Sequelize = require('sequelize')
const User = require('./users')

const Review = db.define('review', {
  content: {
    type: Sequelize.TEXT
  },
  star: {
    type: Sequelize.INTEGER,
    validate: { min: 1, max: 5 }
  }
}, {
  defaultScope: {
    include: [
      { model: User}
    ]
  }
})


module.exports = Review
