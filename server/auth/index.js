const router = require('express').Router()
const User = require('../db/models/users')
module.exports = router

router.get('/me', (req, res, next) => {
  res.json(req.user)
})

//route for login
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
      // Order.update()
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
    console.log(err, req.body)
  })
})

router.post('/logout', (req, res, next) => {
  req.logout()
  res.sendStatus(200)
})

router.use('/google', require('./google'))