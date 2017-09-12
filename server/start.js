'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const morgan = require('morgan')
const path = require('path')
const db = require('./db/index')
const session = require('express-session')
const passport = require('passport')
const User = require('./db/models/users')
if (process.env.NODE_ENV !== 'production') require('../secrets')
//logging middleware
app.use(morgan('dev'))

//static middleware
app.use(express.static(path.join(__dirname, '../public')))

//any front end routes that don't match our api routes go to index.html

//parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// configure and create our database store
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const dbStore = new SequelizeStore({ db: db })

// sync so that our session table gets created
dbStore.sync()

// plug the store into our session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: dbStore,
    resave: false,
    saveUninitialized: false
}))

//initializing passport
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser( (user, done) => done(null, user.id))

//logging out and deleting from req.session
passport.deserializeUser( (id, done) => {
    User.findById(id)
    .then(user => done(null, user))
    .catch(done)
})

db.sync({force: true})  // sync our database
.then(function(){
    app.listen(5000) // then start listening with our express server once we have synced
    console.log('listening to 5000')
})

app.use('/api', require('./api')); // matches all requests to /api

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

//page not found
app.use((req, res) => res.sendStatus(404))

// error page, if time redirect to a cute error page with WHALE
app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
})
