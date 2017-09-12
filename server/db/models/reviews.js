const db = require('../db')
const Sequelize = require('sequelize')

const Review = db.define('review', {
  content: {
    type: Sequelize.STRING
  },
  star: {
    type: Sequelize.INTEGER,
    validate: { min: 1, max: 5 }
  }
}, {})

module.exports = Review
