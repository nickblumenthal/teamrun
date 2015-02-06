TeamRun.Views.CalendarShow = Backbone.CompositeView.extend({
  initialize: function() {
    var view = this;
    // this.listenTo(this.model, 'sync', this.renderCalendar);
    this.listenTo(this.model.events(), 'add', this.addEventToCalendar);
  },

  template: JST['calendars/show'],

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  renderCalendar: function() {
    var calendarEvents = this.makeCalendarEvents();
    this.$('.calendar').fullCalendar(calendarEvents);
  },

  makeCalendarEvents: function() {
    var calEvents = {events: []};
    this.model.events().each(function(calEvent) {
      calEvents.events.push({
        'title' : calEvent.escape('name'),
        'start' : calEvent.escape('date')
      })
    });

    return calEvents;
  },

  addEventToCalendar: function(newEvent) {
    var calEvents = {events: []};
    calEvents.events.push({
      'title' : newEvent.escape('name'),
      'start' : newEvent.escape('date')
    });
  }


});
