const Sequelize = require('sequelize')

const databaseURI = 'postgres://localhost:5432/graceshopper'

const db = new Sequelize(databaseURI, {
  logging: false
})

module.exports = db
