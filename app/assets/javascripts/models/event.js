TeamRun.Models.Event = Backbone.Model.extend({
  urlRoot: '/api/events',

  route: function() {
    if (!this._route) {
      this._route = new TeamRun.Models.Route();
    }

    return this._route;
  },

  parse: function(response) {
    if (response.route) {
      this.route().set(response.route, { parse: true });
      delete response.route;
    }

    return response;
  },

  createCalEvent: function() {
    var calEvents = {events: []};
    calEvents.events.push({
      'title' : this.escape('name'),
      'start' : this.escape('date'),
      'showPath' : 'events/' + this.id
    });

    return calEvents;
  }
})
