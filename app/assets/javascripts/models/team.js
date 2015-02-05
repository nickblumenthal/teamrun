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
  }
})
