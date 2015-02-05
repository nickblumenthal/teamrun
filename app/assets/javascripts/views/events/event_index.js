TeamRun.Views.EventIndex = Backbone.CompositeView.extend({
  initialize: function() {
    this.listenTo(this.collection, 'add sync remove reset change', this.render);
  },

  template: JST['events/index'],
  className: 'events-index-container',

  render: function() {
    var content = this.template();
    this.$el.html(content);

    var view = this;
    this.collection.each(function(eventModel) {
      var eventItemView = new TeamRun.Views.EventIndexItem({ model: eventModel });
      view.addSubview('.events-index', eventItemView);
    });

    return this;
  }

});
