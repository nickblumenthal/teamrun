TeamRun.Views.TeamShow = Backbone.CompositeView.extend({

  template: JST['teams/show'],
  className: 'show-team',

  events: {
    'click .new-event-button': 'newEvent'
  },

  render: function() {
    var content = this.template({ team: this.model });
    this.$el.html(content);

    // Add team description subview
    var detailView = new TeamRun.Views.TeamDetail({
      model: this.model
    });
    this.addSubview('.team-detail', detailView);

    // Add event index subview
    var eventIndexView = new TeamRun.Views.EventIndex({
      collection: this.model.events()
    });
    this.addSubview('.events-list', eventIndexView);

    // Add calendar subview
    var calendarView = new TeamRun.Views.CalendarShow({
      model: this.model
    });
    this.addSubview('.calendar-container', calendarView);

    return this;
  },

  newEvent: function(event) {
    event.preventDefault();
    Backbone.history.navigate("#/teams/" + this.model.id + "/events/new", { trigger: true });
  }

})
