var userManager = require('../user/userManager');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');

passport.use( new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/api/auth/facebook/callback',
    enableProof: false
  }, function(accessToken, refreshToken, profile, done) {
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
  userManager.findOrCreateUser({ id: id })
    .then(function(userData){
      console.log('success deserializing user:', userData);
      done(null, userData);
    }).catch(function(err){
      console.log('err deserializing user:', err.message);
      done(err);
    });
});

module.exports = function(router){

  router.use(passport.initialize());
  // router.use(passport.session());

  router.get('/login', passport.authenticate('facebook', {
    scope: ['user_likes', 'user_location', 'user_posts']
  }) );

  router.get('/logout', function(req, res, next){
    req.session.destroy();
    req.logout();
    res.redirect('/');
  });

  router.get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/',
    // successRedirect: '/',
    // failureFlash: true, //TODO: add flash capabilities via connect-flash middleware
    // successFlash: 'Login Successful. Velkommen.'
  }), function(req, res, next) {
    var user = req.user;
    // FB authentication successful
    console.log('LOGIN successful for user', user.displayName);
    res.cookie('username', user.displayName, { maxAge: 900000 });
    // res.redirect('/');
    // next();
    req.login(user, function(err){
      if(err){ return next(err); }
      res.redirect('/');
      next();
    })
  });

};
