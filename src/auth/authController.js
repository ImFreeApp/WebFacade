var passport = require('passport');

options = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET
}

module.exports = {
  authenticate: function(req, res, next){
    res.status(200).send('authenticate');
  }
};
