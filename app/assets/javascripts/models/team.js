TeamRun.Models.Team = Backbone.Model.extend({
  urlRoot: '/api/teams',

  events: function() {
    if (!this._teamEvents) {
      this._teamEvents = new TeamRun.Collections.Events();
    }

    return this._teamEvents;
  },

  parse: function(response) {
    if (response.events) {
      this.events().set(response.events, { parse: true });
      delete response.events;
    }

    return response;
  },

  isMember: function(memberId) {
    var members = this.get('members');
    var result = false
    if(members) {
      members.forEach(function(memberObj) {
        if(+memberObj.id === memberId) {
          result = true;
        }
      });
    }

    return result;
  }
})
