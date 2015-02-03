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
  }
};

$(document).ready(function(){
  TeamRun.initialize();
});
