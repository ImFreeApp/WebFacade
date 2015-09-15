var App = require('./models/app');
var AppView = require('./views/appView');
var $ = require('jquery');
var _ = require('underscore');

$(document).ready(function (){
  'use strict';

  // $(document).foundation();
  var app = new App();
  var appView = new AppView({ model: app });

  _.extend(window, {
    app: app,
    appView: appView
  });
});
