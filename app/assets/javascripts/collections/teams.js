TeamRun.Collections.Teams = Backbone.Collection.extend({
  url: 'api/teams',
  model: TeamRun.Models.Team,
  comparator: 'name'
})
