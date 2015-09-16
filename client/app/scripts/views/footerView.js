var Backbone = require('backbone');

module.exports = Backbone.View.extend({

  el: 'footer',

  template: require('../templates/footer.hbs'),

  initialize: function () {
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
    this.$el.html(this.template(this.model.toJSON()));
    return this.$el;
  }

});
