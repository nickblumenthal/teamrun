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
    'teams/:id/events/new' : 'newEvent',
    'events/:id' : 'showEvent'
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
    team = this.teamsCollection.getOrFetch(id);
    team.fetch();
    var showTeamView = new TeamRun.Views.TeamShow({
      model: team
    })
    this._swapView(showTeamView);
  },

  newRoute: function() {
    var newRouteView = new TeamRun.Views.RouteNew({
      model: {},
      purpose: 'route'
    });
    this._swapView(newRouteView);
    newRouteView.trigger('viewRendered');
  },

  showRoute: function(id) {
    var route = new TeamRun.Models.Route({id: id});
    route.fetch();
    var showRouteView = new TeamRun.Views.RouteShow({
      model: route
    });
    this._swapView(showRouteView);
  },

  newEvent: function(id) {
    var newEventView = new TeamRun.Views.EventNew({
      model: new TeamRun.Models.Event(),
      teamId: id
    });
    this._swapView(newEventView);
  },

  showEvent: function(id) {
    var showEventView = new TeamRun.Views.EventShow({
      model: new TeamRun.Models.Event({id: id})
    });
    this._swapView(showEventView);
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
    if($('#map').length > 0) {
      $('#map').trigger('mapResize');
    };
  }
})
