var userManager = require('../user/userManager');
var passport = require('passport');
var util = require('util');
var FacebookStrategy = require('passport-facebook');

passport.use( new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: util.format('http://localhost:%d/api/auth/facebook/callback', process.env.PORT),
    enableProof: false
  }, function(accessToken, refreshToken, profile, done) {
    // console.log('PROFILE:', profile);
    userManager.findOrCreateUser(profile, accessToken)
      .then(function(userData){
        // return userData to client
        done(null, userData);
      }).catch(function(err){
        done(err);
      });
  })
);

passport.serializeUser(function(user, done) {
  console.log('serialize user', user.fbId);
  done(null, user.fbId);
});

passport.deserializeUser(function(id, done) {
  console.log('deserializeUser', id);
  userManager.findOrCreateUser(profile, null)
    .then(function(userData){
      done(null, userData.fbId);
    }).catch(function(err){
      done(err);
    });
});

module.exports = function(router){

  router.use(passport.initialize());

  router.get('/', passport.authenticate('facebook', {
    scope: ['user_likes', 'user_location', 'user_posts']
  }) );

  router.get('/facebook/callback', passport.authenticate('facebook', {
    // failureRedirect: 'http://localhost:9000',
    // successRedirect: 'http://localhost:9000',
    // failureFlash: true, //TODO: add flash capabilities via connect-flash middleware
    // successFlash: 'Login Successful. Velkommen.'
  }), function(req, res, next) {
    var user = req.user;
    // FB authentication successful
    console.log('login successful: user');
    res.redirect(process.env.WEB_CLIENT_URL);
    next(user);
  });

};
