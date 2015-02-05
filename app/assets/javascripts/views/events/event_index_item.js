TeamRun.Views.EventIndexItem = Backbone.CompositeView.extend({
  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['events/item'],
  className: 'events-item',

  events: {
    'click .event-information': 'showEvent'
  },

  render: function() {
    var content = this.template({ event: this.model });
    this.$el.html(content);

    return this;
  },

  showEvent: function(event) {
    event.preventDefault();
    Backbone.history.navigate('events/' + this.model.id, { trigger: true });
  }
});
