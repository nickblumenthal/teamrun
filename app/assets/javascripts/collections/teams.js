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
  },

  filterMyTeams: function(filterAttr, filterVal) {
    if(filterAttr && filterVal) {
      teams = [];
      this.filter(function(team) {
        var memberArray = team.get(filterAttr);
        memberArray.forEach(function(member) {
          if(member.id === filterVal) {
            teams.push(team);
          }
        });
      });
      return new TeamRun.Collections.Teams(teams);
    } else {
      return this;
    }
  },

  searchByLocation: function(searchString) {
    searchString = searchString.toLowerCase();
    var searchResults;
    searchResults = this.filter(function(team) {
      return team.escape('location').toLowerCase().indexOf(searchString) > -1
    });

    return searchResults;
  }
})
