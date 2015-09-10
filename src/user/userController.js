var bluebird = require('bluebird');
var request = require('request');

var userServiceUrl = process.env.USER_SERVICES_URL || 'http://localhost:3002';

module.exports = {

  getUser: function(req, res, next){
    res.status(200).send('get users');
    next();
  },

  getUsers: function(req, res, next){
    request.get(userServiceUrl + '/api/user')
      // .on('response', function(userServicesRes){
      //   if(userServicesRes.statusCode !== 200){
      //     console.log(userServicesRes.statusCode);
      //   }
      // })
      .on('error', function(err){
        console.log("Error getting all users:", err);
        res.status(500).send(err);
        next(err);
      })
      .pipe(res);
  },

};
