TeamRun.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.teamsCollection = new TeamRun.Collections.Teams();
    this.teamsCollection.fetch();
  },

  routes: {
    '' : 'teamsIndex',
    'teams/new' : 'newTeam'
  },

  teamsIndex: function() {
    var teamsIndexView = new TeamRun.Views.TeamsIndex({
      collection : this.teamsCollection
    });
    this._swapView(teamsIndexView);
  },

  newTeam: function() {
    var newTeamView = new TeamRun.Views.TeamForm({
      model: new TeamRun.Models.Team(),
      collection: this.teamsCollection
    });
    this._swapView(newTeamView);
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
