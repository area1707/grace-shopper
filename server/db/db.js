const Sequelize = require('sequelize')

const databaseURI = DATABASE_URL

const db = new Sequelize(databaseURI, {
  logging: false
})

module.exports = db
