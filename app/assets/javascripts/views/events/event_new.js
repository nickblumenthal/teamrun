TeamRun.Views.EventNew = Backbone.CompositeView.extend({
  initialize: function(options) {
    this.teamId = options.teamId
  },

  template: JST['events/new'],
  className: 'row',

  render: function() {
    var content = this.template({ event: this.model });
    this.$el.html(content);

    this.newRouteView = new TeamRun.Views.RouteNew({
      model: {}
    });

    this.addSubview('#new-route', this.newRouteView);

    var that = this;
    this.$('form').validator().on('submit', function(event) {
      that.createEvent(event);
    })
    return this;
  },

  createEvent: function(event) {
    // this.$('form').validator('validate');
    if(!event.isDefaultPrevented()) {
      var eventData = this.$('form').serializeJSON();
      eventData.event.team_id = this.teamId;
      this.newRouteView.submitRoute(event, function(route_id){
        eventData.event.route_id = route_id;
        newEvent = new TeamRun.Models.Event(eventData);
        newEvent.save({}, {
          success: function(){
            Backbone.history.navigate('events/' + newEvent.id, { trigger: true });
          }
        })
      })
    }
  }

})
