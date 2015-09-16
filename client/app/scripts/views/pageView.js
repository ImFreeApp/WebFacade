var Backbone = require('backbone');

module.exports = Backbone.View.extend({

  events: {},

  className: 'page',

  initialize: function () {
    this.$el.addClass('pageNumber-' + this.model.get('pageNumber'))
    this.listenTo(this.model, 'show', this.show);
    this.listenTo(this.model, 'send2background', this.send2background);
    this.listenTo(this.model, 'hide', this.hide);
  },

  show: function() {
    this.$el.stop().css({
      'zIndex': 2,
      'opacity': 0
    }).animate({
      'opacity': 1
    }, 200);
  },

  send2background: function() {
    this.$el.stop().css({
      'zIndex': 1
    }).animate({
      'opacity': 1
    }, 400);
  },

  hide: function() {
    this.$el.stop().css({
      'zIndex': 0,
      'opacity': 0
    }).animate({
      'opacity': 0
    }, 400);
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.css({
      backgroundColor: this.backgroundColor
    })
    return this.$el;
  }

});
