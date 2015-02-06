TeamRun.Views.EventIndexItem = Backbone.CompositeView.extend({
  initialize: function() {
    var view = this;
    this.listenTo(this.model, 'sync', function() {
      console.log('calling event index item render');
      view.render();
    });
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
