// api/users.js
const router = require('express').Router();
const User = require('../db/models/users')
const passport = require('passport')
// matches GET requests to /api/users/
router.get('/', function (req, res, next) {
  User.findAll()
  .then( users => res.status(200).json(users))
  .catch(next)
})

// matches POST requests to /api/users/
router.post('/', function (req, res, next) { /* etc */});
// matches PUT requests to /api/users/:userId
router.put('/:userId', function (req, res, next) { /* etc */});
// matches DELTE requests to /api/users/:userId
router.delete('/:userId', function (req, res, next) { /* etc */});

router.post('/login', (req, res, next) => {
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

router.post('/signup', (req, res, next) => {
  User.create(req.body)
  .then(user => {
    req.login(user, err => {
      if (err) next(err)
      else res.json(user)
    })
  })
  .catch(function(err) {
    // print the error details
    console.log(err, request.body)
  })
})

router.post('/logout', (req, res, next) => {
  req.logout()
  res.sendStatus(200)
})

router.get('/me', (req, res, next) => {
  res.json(req.user)
})

router.get('/auth/google', passport.authenticate('google', { scope: 'email' }))

module.exports = router;
