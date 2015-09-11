var util = require('util');
var userManager = require('./userManager');

var userServiceUrl = process.env.USER_SERVICES_URL;

module.exports = {

  getUser: function(req, res, next){
    var uid = req.params.id
    // can't pipe b/c need to swap in empty object literal if response is empty
    // request.get(util.format('%s/api/user/%s', userServiceUrl, uid))
    //   .on('error', function(err){
    //     console.log("Error getting all users:", err);
    //     res.status(500).send(err);
    //     next(err);
    //   })
    //   .on('end', function(){
    //     console.log(util.format('GET user %s successfully completed', uid));
    //     next();
    //   })
    //   .pipe(res);
    request.get(util.format('%s/api/user/%s', userServiceUrl, uid), function(err, getUserReq, body){
      if(err){
        console.log("Error getting all users:", err);
        res.status(500).send(err);
        next(err);
        return
      }
      console.log(util.format('GET user %s successfully completed', uid));
      res.status(200).send(body || {});
      next();
    });
  },

  getUsers: function(req, res, next){
    var getUsersReq = request.get(userServiceUrl + '/api/user')
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
      .on('end', function(){
        console.log('GET all users successfully completed')
        next();
      })
      .pipe(res);

  },

};
