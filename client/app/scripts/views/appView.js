var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var HeaderView = require('./headerView');
var FooterView = require('./footerView');
var PageView = require('./pageView');

module.exports = Backbone.View.extend({

  el: '#app',

  initialize: function (){
    this.headerView = new HeaderView({ model: this.model });
    this.footerView = new FooterView({ model: this.model });

    // render view
    this.render();

    // calcaulte size of page on load and recaculate on resize
    this.calculateSize();
    $(window).on('resize', this.calculateSize.bind(this));
    $(window).on('scroll', _.throttle(this.pageScroll.bind(this), 30));

    // set up event listener for page chagne
    this.listenTo(this.model, 'change:currentPage', this.changePage);

    // simulate pageScroll to initialize first page
    this.pageScroll();
  },

  template: require('../templates/app.hbs'),

  pageTemplates: [
    {
      template: require('../templates/pages/page0.hbs'),
      backgroundColor: '#FFF'
    },
    {
      template: require('../templates/pages/page1.hbs'),
      backgroundColor: '#80DBFF'
    },
    {
      template: require('../templates/pages/page2.hbs'),
      backgroundColor: '#FFA10B'
    },
    {
      template: require('../templates/pages/page3.hbs'),
      backgroundColor: '#FF5703'
    },
    {
      template: require('../templates/pages/page4.hbs'),
      backgroundColor: '#52CC93'
    },
    {
      template: require('../templates/pages/page5.hbs'),
      backgroundColor: '#967DB3'
    },
  ],

  calculateSize: function(){
    this.DIMENSIONS = {};
    this.DIMENSIONS.headerHeight = this.headerView.$el.outerHeight();
    this.DIMENSIONS.footerHeight = this.footerView.$el.outerHeight();
    this.DIMENSIONS.windowHeight = innerHeight; //$(window).outerHeight();

    // page breakpoints at end of each page
    this.DIMENSIONS.pageEndBreakPoints = this.pageViews.reduce(function(pageEndBreakPoints, pageView, idx){
      var previousBreakPoint = idx > 0 ? pageEndBreakPoints[idx -1] : 0;
      return pageEndBreakPoints.concat( previousBreakPoint + pageView.$el.height() );
    }, []);

    this.DIMENSIONS.bodyHeight = this.DIMENSIONS.pageEndBreakPoints[this.DIMENSIONS.pageEndBreakPoints.length -1];

    $('body').css({ 'height': this.DIMENSIONS.bodyHeight });
  },

  pageScroll: function(e){
    // get page idx from breakpoint buckets
    var breakpointRatio = this.model.get('breakpointRatio');
    var newPageIdx = this.DIMENSIONS.pageEndBreakPoints.reduce(function(pageIdx, bp){
      return pageYOffset < bp - (innerHeight * (1-breakpointRatio)) ? pageIdx : pageIdx +1;
    }, 0);

    if(newPageIdx === this.model.get('currentPage') + 1){
      this.model.trigger('changePage', 'up', newPageIdx);
    }else if(newPageIdx === this.model.get('currentPage') - 1){
      this.model.trigger('changePage', 'down', newPageIdx);
    }else if(newPageIdx !== this.model.get('currentPage')){
      this.model.trigger('changePage', 'skip', newPageIdx);
    }

  },

  changePage: function(app){
    this.model.pages.each(function(page){
      if(page.get('pageNumber') === this.get('currentPage')){
        page.trigger('show');
      }else if(page.get('pageNumber') === this._previousAttributes['currentPage']){
        page.trigger('send2background');
      }else{
        page.trigger('hide');
      }
    }.bind(this.model));

    if(this.model.get('currentPage') > 0){
      this.model.trigger('showHeader');
      this.model.trigger('showFooter');
    }else{
      this.model.trigger('hideHeader');
      this.model.trigger('hideFooter');
    }
  },

  render: function () {
    // render app template
    this.$el.html( this.template(this.model.toJSON()) );

    // render header and footer
    this.headerView.render();
    this.footerView.render();

    // render each page
    this.pageViews = this.pageTemplates.map(generatePage, this);

    function generatePage(pageData, idx){
      var page = this.model.pages.add({ pageNumber: idx }),
          pageView = new PageView({ model: page });

      _.extend(pageView, pageData);

      this.$el.find('.page-container').append(pageView.render());
      return pageView;
    };

    return this.$el;
  }

});
