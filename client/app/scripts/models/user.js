var Backbone = require('backbone');
var Cookies = require('js-cookie');

module.exports = Backbone.Model.extend({

  initialize: function() {
    this.set('username', Cookies.get('username'));
  },

});
