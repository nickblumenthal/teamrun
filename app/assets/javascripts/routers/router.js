TeamRun.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.teamsCollection = new TeamRun.Collections.Teams();
    this.teamsCollection.fetch();
  },

  routes: {
    '' : 'teamsIndex',
    'teams/new' : 'newTeam',
    'teams/:id' : 'showTeam',
    'routes/new' : 'newRoute',
    'routes/:id' : 'showRoute',
    'teams/:id/events/new' : 'newEvent'
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

  showTeam: function(id) {
    var showTeamView = new TeamRun.Views.TeamShow({
      model: this.teamsCollection.getOrFetch(id)
    })
    this._swapView(showTeamView);
  },

  newRoute: function() {
    var newRouteView = new TeamRun.Views.RouteNew({
      model: {}
    });
    this._swapView(newRouteView);
    newRouteView.renderMap();
  },

  showRoute: function(id) {
    var route = new TeamRun.Models.Route({id: id});
    route.fetch();
    var showRouteView = new TeamRun.Views.RouteShow({
      model: route
    });
    this._swapView(showRouteView);
    // showRouteView.renderMap();
  },

  newEvent: function(id) {
    var newEventView = new TeamRun.Views.EventNew({
      model: new TeamRun.Models.Event()
    });
    this._swapView(newEventView);
    newEventView.subviews('#new-route')[0].renderMap();
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
