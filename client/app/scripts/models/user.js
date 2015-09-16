var Backbone = require('backbone');
var $ = require('jquery');
var Cookies = require('js-cookie');

module.exports = Backbone.Model.extend({

  initialize: function(){
    this.set('username', Cookies.get('username'));
  },

  logOut: function(){
    // delete session on server
    // $.post('/api/auth/logout', null, function(data, status, jqXHR){

    // });

    // delete cookie on client
    Cookies.remove('username');
    Cookies.remove('connect.sid');

    // modify user model
    this.set('username', null);
  }

});
