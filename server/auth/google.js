const passport = require('passport')
const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', passport.authenticate('google', { scope: 'email' }));

router.get('/callback',
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