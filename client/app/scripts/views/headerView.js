var Backbone = require('backbone');

module.exports = Backbone.View.extend({

  el: 'header',

  template: require('../templates/header.hbs'),

  initialize: function () {
    // headerView listens to two models.  If this turns out to be too hacky, refactor .menu dropdown into it's own view
    this.listenTo(this.model.user, 'change:username', this.render);
    this.listenTo(this.model, 'showHeader', this.show);
    this.listenTo(this.model, 'hideHeader', this.hide);
  },

  show: function(){
    this.$el.addClass('active');
  },

  hide: function(){
    this.$el.removeClass('active');
  },

  render: function () {
    this.$el.html( this.template(this.model.user.toJSON()) );
    return this.$el;
  }

});
