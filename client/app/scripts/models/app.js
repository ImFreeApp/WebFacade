var Backbone = require('backbone');
var Pages = require('../collections/pages');

module.exports = Backbone.Model.extend({

  initialize: function() {
    this.pages = new Pages();
    this.set('org', 'Adequate Design Studios');
    this.set('user', 'Horatio');

    // fraction of the window size to trigger page breakpoint
      // 0: top; 0.5: middle; 1: bottom
    this.set('breakpointRatio', 0.5);

    this.on('changePage', function(dir, pageIdx){
      this.set({
        'currentPage': pageIdx,
        'navDirection': dir
      });
    });
  }

});
