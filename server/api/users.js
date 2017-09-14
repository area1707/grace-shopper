// api/users.js
const router = require('express').Router();
const User = require('../db/models/users')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

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

module.exports = router;
