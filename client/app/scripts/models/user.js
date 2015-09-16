var Backbone = require('backbone');
var Cookies = require('js-cookie');

module.exports = Backbone.Model.extend({

  initialize: function(){
    this.set('username', Cookies.get('username'));
  },

  logOut: function(){
    // delete session on server
    // $.post()

    // delete cookie on client
    Cookies.remove('username');

    // modify user model
    this.set('username', null)
  }

});
