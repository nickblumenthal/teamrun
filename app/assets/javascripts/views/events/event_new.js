TeamRun.Views.EventNew = Backbone.CompositeView.extend({
  template: JST['events/new'],

  render: function() {
    var content = this.template({ event: this.model });
    this.$el.html(content);

    var newRouteView = new TeamRun.Views.RouteNew({
      model: {}
    });

    this.addSubview('#new-route', newRouteView);
    return this;
  }

})
