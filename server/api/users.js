// api/users.js
const router = require('express').Router();
const db = require('../db/index')
const User = db.model('user')
//this wont have associations so dont use it
//const User = require('../db/models/users')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const {mustBeLoggedIn, forbidden} = require('./auth.filters')
// matches GET requests to /api/users/
router.get('/', function (req, res, next) {
  User.findAll()
  .then( users => res.status(200).json(users))
  .catch(next)
})

// matches POST requests to /api/users/
router.post('/', (req, res, next) =>
	User.create(req.body)
	.then(user => res.status(201).json(user))
	.catch(next))
// matches PUT requests to /api/users/:userId
router.put('/:userId', function (req, res, next) { /* etc */});
// matches DELTE requests to /api/users/:userId
router.delete('/:userId', function (req, res, next) { 
	User.findById(req.params.userId)
	.then(user => user.destroy())
	.then(() => res.sendStatus(204))
  	.catch(next)
});

router.get('/unauth', (req, res, next) => res.send(req.headers.cookie))
router.get('/:id', mustBeLoggedIn, (req, res, next) =>
	User.findById(req.params.id)
	.then(user => res.json(user))
	.catch(next))

module.exports = router;
