window.TeamRun = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    TeamRun.currentUser = TeamRunAuth();
    cloudinary.setCloudName('nicholas');
    new TeamRun.Routers.Router({
      $rootEl : $('#content')
    });
    Backbone.history.start();
  }
};
