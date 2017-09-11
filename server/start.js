'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const morgan = require('morgan')
const path = require('path')
const db = require('./db/index')

//logging middleware
app.use(morgan('dev'))

//static middleware
app.use(express.static(path.join(__dirname, '../public')))

//any front end routes that don't match our api routes go to index.html
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

//parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./api')); // matches all requests to /api

//page not found
app.use((req, res) => res.sendStatus(404))

// error page, if time redirect to a cute error page with WHALE
app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
})

//listen for server
app.listen(5000, () => {
  console.log('Hola we are on 5000')
  db.sync()
  .then(function () {
    console.log('Synchronated the database')
  })
  .catch(function (err) {
    console.error('Trouble right here in River City', err, err.stack)
  })
})
