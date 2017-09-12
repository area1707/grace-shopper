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
    console.log(err, req.body)
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

router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}))

// collect our google configuration into an object
const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}

// configure the strategy with our config object, and write the function that passport will invoke after google sends
// us the user's profile and access token
const strategy = new GoogleStrategy(googleConfig, function (token, refreshToken, profile, done) {
  const googleId = profile.id;
  const name = profile.displayName;
  const email = profile.emails[0].value;

  User.findOne({where: { googleId: googleId  }})
    .then(function (user) {
      if (!user) {
        return User.create({ name, email, googleId })
          .then(function (user) {
            done(null, user);
          });
      } else {
        done(null, user);
      }
    })
    .catch(done);
});

// register our strategy with passport
passport.use(strategy);

module.exports = router;
