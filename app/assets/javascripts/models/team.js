TeamRun.Models.Team = Backbone.Model.extend({
  urlRoot: '/api/teams',

  events: function() {
    if (!this._events) {
      this._events = new TeamRun.Collections.Events();
    }

    return this._events;
  },

  parse: function(response) {
    if (response.events) {
      this.lists().set(response.events, { parse: true });
      delete response.events;
    }

    return response;
  }
})
