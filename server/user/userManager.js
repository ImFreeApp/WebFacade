var request = require('request-promise');
var userServiceUrl = process.env.USER_SERVICES_URL;

module.exports = {

  findOrCreateUser: function(profile, accessToken){
    // TODO: userServices should not depend on accessToken
    return request.post({
      baseUrl: userServiceUrl,
      url: '/api/user',
      body: {
        "token": accessToken || "none",
        "userData": profile
      },
      json: true
    });
  },

  getUser: function(uid){
    return request.get({
      baseUrl: userServiceUrl,
      url: '/api/user/' + uid,
      json: true
    });
  },

  getUsers: function(){
    return request.get({
      baseUrl: userServiceUrl,
      url: '/api/user',
      json: true
    });
  },

};
