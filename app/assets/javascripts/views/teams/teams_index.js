TeamRun.Views.TeamsIndex = Backbone.CompositeView.extend({
  initialize: function(options) {
    this.hiddenViewIndices = [];
    this.filterAttr = options.filterAttr || false;
    this.filterVal = options.filterVal;
    var that = this;
    that.listenTo(that.collection, 'sync', function() {
      that.render();
    });
    this.listenTo(this.collection, 'remove', this.removeTeam);
    var that = this;
    $(window).on('onDOM', function(){
      // that.triggerAnimation();
    })
  },

  template: JST['teams/index'],
  className: 'team-index',

  render: function() {
    var content = this.template({ filterAttr: this.filterAttr });
    this.$el.html(content);

    var teams = this.collection.filterMyTeams(this.filterAttr, this.filterVal);
    var view = this;
    teams.each(function(team) {
      var teamItemView = new TeamRun.Views.TeamItem({
        collection : teams,
        model: team
      });
      view.addSubview('.team-index-items', teamItemView);
    })
    // this.triggerAnimation();

    return this;
  },

  events: {
    'input .search' : 'search'
  },

  search: function(event) {
    var $form = $(event.currentTarget);
    var searchString = $form.val();
    var matches = this.collection.searchByLocation(searchString);
    var indicesOfMatches = [];
    var that = this;
    matches.forEach(function(match) {
      indicesOfMatches.push(that.collection.indexOf(match));
    });
    this.displayResults(indicesOfMatches);
  },

  displayResults: function(indicesOfMatches) {
    this.subviews('.team-index-items').forEach(function(subview, index) {
      if(indicesOfMatches.indexOf(index) > -1) {
        subview.showView();
      } else {
        subview.hideView();
      }
    });
  },

  removeTeam: function(team) {
    var subviewToRemove = _.findWhere(this.subviews('.team-index-items'), {model: team});
    this.removeSubview('.team-index-items', subviewToRemove);
    this.render();
  },

  triggerAnimation: function() {
    this.$('.expanding-before').addClass('expanding-after').removeClass('expanding-before');
  }

});
