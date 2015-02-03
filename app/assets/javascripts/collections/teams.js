TeamRun.Collections.Teams = Backbone.Collection.extend({
  url: 'api/teams',
  model: TeamRun.Models.Team,
  comparator: 'name',

  getOrFetch: function(id) {
    var team;
    if(!(team = this.get(id))) {
      team = new TeamRun.Models.Team({ id: id });
      team.fetch();
    }

    return team;
  }
})
