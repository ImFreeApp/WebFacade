var util = require('util');
var userManager = require('./userManager');

var userServiceUrl = process.env.USER_SERVICES_URL;

module.exports = {

  getUser: function(req, res, next){
    var uid = req.params.id;

    userManager.getUser(uid)
      .then(function(userData){
        console.log(util.format('GET user %s successfully completed', uid));
        var responseData = {
          users: userData || []
        };
        res.status(200).send(responseData);
        next(responseData);
      }).catch(function(err){
        console.log("Error getting user:", err);
        res.status(500).send(err);
        next(err);
      });
  },

  getUsers: function(req, res, next){
    // An alternative would be to not use promises and pipe response streams straight from
    // the request module requests.  Error handling would need to be rethought
    userManager.getUsers()
      .then(function(userDatas){
        console.log('GET all users successfully completed');
        console.log('userDATa tpye:', typeof userDatas);
        var responseData = {
          users: userDatas
        };
        res.status(200).send(responseData);
        next(responseData);
      }).catch(function(err){
        console.log("Error getting all users:", err);
        res.status(500).send(err);
        next(err);
      });
  },

};
