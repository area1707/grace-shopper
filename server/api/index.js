const api = require('express').Router()

api.use('/users', require('./users')); // matches all requests to /api/users/

//page not found
api.use((req, res) => res.sendStatus(404))

module.exports = api