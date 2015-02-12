TeamRun.Views.EventShow = Backbone.CompositeView.extend({
  initialize: function() {
    this.model.fetch();
    this.listenTo(this.model, 'sync add remove', function() {
      this.render();
      if($('#map').length > 0) {
        $('#map').trigger('mapResize');
      };
    });
  },

  template: JST['events/show'],
  className: 'event-show',

  render: function() {
    var content = this.template({ event: this.model });
    this.$el.html(content);
    var routeShowView = new TeamRun.Views.RouteShow({ model: this.model.route() });
    this.addSubview('#route-show', routeShowView);

    return this;
  }
});
