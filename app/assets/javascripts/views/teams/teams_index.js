TeamRun.Views.TeamsIndex = Backbone.CompositeView.extend({
  initialize: function() {
    var that = this;
    that.listenTo(that.collection, 'add change remove reset', function() {
      that.collection.fetch();
      that.render();
    });
  },

  template: JST['teams/index'],
  className: 'team-index',

  render: function() {
    console.log('index render')
    var content = this.template();
    this.$el.html(content);

    var teams = this.collection;
    var view = this;
    this.collection.each(function(team) {
      var teamItemView = new TeamRun.Views.TeamItem({
        collection : teams,
        model: team
      });
      view.addSubview('.team-index-items', teamItemView);
    })
    return this;
  }
});