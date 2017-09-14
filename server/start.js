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
const Order = require('./db/models/orders')

if (process.env.NODE_ENV !== 'production') require('../secrets')
//logging middleware
app.use(morgan('dev'))

//static middleware
app.use(express.static(path.join(__dirname, '../public')))

//parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// configure and create our database store
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const dbStore = new SequelizeStore({ db })

// sync so that our session table gets created
dbStore.sync()

// plug the store into our session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: dbStore,
    resave: false,
    saveUninitialized: false
}))

app.use((req, res, next) => {
  if (req.session.cartId) {
    Order.findOrCreate({
      where: {
        id: req.session.cartId
      }
    })
    .then(cart => {
      req.cart = cart[0]
      next()
    })
    .catch(next)
  } else {
    Order.create()
    .then(cart => {
      req.cart = cart
      req.session.cartId = cart.id
      next()
    })
    .catch(next)
  }
})

app.get('/me', (req, res, next) => {
  res.json(req.user)
})

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


app.use('/api', require('./api')); // matches all requests to /api

//route for login
app.post('/login', (req, res, next) => {
  User.findOne( {
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    if (!user) res.status(401).send('User not found')
    else if (!user.correctPassword(req.body.password)) res.status(401).send('incorrect password')
    else {
      req.login(user, err => {
        if (err) next(err)
        else res.json(user)
      })
    }
  })
  .catch(next)
})

app.post('/signup', (req, res, next) => {
  User.create(req.body)
  .then(user => {
    req.login(user, err => {
      if (err) next(err)
      else res.json(user)
    })
  })
  .catch(function(err) {
    // print the error details
    console.log(err, req.body)
  })
})

app.post('/logout', (req, res, next) => {
  req.logout()
  res.sendStatus(200)
})


app.get('/auth/google', passport.authenticate('google', { scope: 'email' }));

app.get('/auth/google/callback',
  passport.authenticate('google', {failureRedirect : '/login'}),
  function (req, res, next) {
    res.redirect(`/`)
  }
);

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  // Google will send back the token and profile
  function (token, refreshToken, profile, done) {
    // the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.

    var info = {
      name: profile.displayName,
      email: profile.emails[0].value
    };
    User.findOrCreate({
      where: {google_id: profile.id},
      defaults: info
    })
    .spread(function (user) {
      done(null, user);
    })
    .catch(done);
  })
);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')))
//page not found
app.use((req, res) => res.sendStatus(404))

// error page, if time redirect to a cute error page with WHALE
app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
})

db.sync({})  // sync our database
.then(function(){
    app.listen(5000) // then start listening with our express server once we have synced
    console.log('listening to 5000')
})
