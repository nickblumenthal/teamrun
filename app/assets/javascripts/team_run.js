window.TeamRun = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new TeamRun.Routers.Router({
      $rootEl : $('#content')
    });
    Backbone.history.start();
    TeamRun.currentUser = TeamRunAuth();
  }
};

$(document).ready(function(){
  TeamRun.initialize();
});
