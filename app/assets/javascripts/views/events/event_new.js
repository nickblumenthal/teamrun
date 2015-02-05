TeamRun.Views.EventNew = Backbone.CompositeView.extend({
  initialize: function(options) {
    this.teamId = options.teamId
  },

  template: JST['events/new'],

  render: function() {
    var content = this.template({ event: this.model });
    this.$el.html(content);

    this.newRouteView = new TeamRun.Views.RouteNew({
      model: {}
    });

    this.addSubview('#new-route', this.newRouteView);
    return this;
  },

  events: {
    'click .submit' : 'createEvent'
  },

  createEvent: function(event) {
    event.preventDefault();
    var eventData = this.$('form').serializeJSON();
    eventData.event.team_id = this.teamId;
    newEvent = new TeamRun.Models.Event(eventData);
    this.newRouteView.submitRoute(event, function(route_id){
      newEvent.set('route_id', route_id);
      newEvent.save({}, {
        success: function(){
          Backbone.history.navigate('', { trigger: true });
        }
      })
    })
  }

})
