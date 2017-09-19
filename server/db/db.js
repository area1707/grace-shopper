const Sequelize = require('sequelize')

const databaseURI = process.env.DATABASE_URL

const db = new Sequelize(databaseURI, {
  logging: false
})

module.exports = db
