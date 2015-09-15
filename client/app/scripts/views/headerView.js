var Backbone = require('backbone');

module.exports = Backbone.View.extend({

  el: 'header',

  template: require('../templates/header.hbs'),

  initialize: function () {
    this.listenTo(this.model, 'change:user', this.render);
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
    this.$el.html( this.template(this.model.toJSON()) );
    return this.$el;
  }

});
