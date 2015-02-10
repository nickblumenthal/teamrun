TeamRun.Views.CalendarShow = Backbone.CompositeView.extend({
  initialize: function() {
    var view = this;
    this.listenTo(this.model.events(), 'add', this.addEventToCalendar);
    this.listenTo(this.model, 'sync', this.addExistingEventsToCalendar);
    this.calendarInitialized = false;
  },

  template: JST['calendars/show'],

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  renderCalendar: function(callback) {
    this.$('.calendar').fullCalendar();
    this.calendarInitialized = true;
    callback && callback();
  },

  addEventToCalendar: function(newEvent) {
    // Ensure calendar has been created first
    if(this.calendarInitialized === false) {
      var view = this;
      this.renderCalendar(function(){view.addEventToCalendar(newEvent)});
    } else {
      this.$('.calendar').fullCalendar('addEventSource', newEvent.createCalEvent());
    }
  },

  // If the calendar is uninitialized after syncing the model, display with existing
  // events or a blank calendar.
  addExistingEventsToCalendar: function() {
    if(this.calendarInitialized === false) {
        this.renderCalendar();
        var view = this;
        this.model.events().each(function(event) {
          view.addEventToCalendar(event);
        });
    }
  }

});
