const api = require('express').Router()

api.use('/users', require('./users')) // matches all requests to /api/users/
api.use('/orders', require('./orders'))
api.use('/accessories', require('./accessories'))

module.exports = api
