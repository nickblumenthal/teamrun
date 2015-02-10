TeamRun.Views.TeamsIndex = Backbone.CompositeView.extend({
  initialize: function(options) {
    this.filterAttr = options.filterAttr || false;
    this.filterVal = options.filterVal;

    var that = this;
    that.listenTo(that.collection, 'add change remove reset', function() {
      that.collection.fetch();
      that.render();
    });

    $(window).on('onDOM', this.initMasonry.bind(this));
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

    return this;
  },

  events: {
    'click .new-team': 'newTeam'
  },

  newTeam: function(event) {
    event.preventDefault();
    Backbone.history.navigate('teams/new', {trigger: true});
  },

  initMasonry: function(event) {
    event.preventDefault;
    console.log('test');
    this.$('.team-index-items').masonry({
      columnWidth: 400,
      itemSelector: '.team'
    });
  }
});
