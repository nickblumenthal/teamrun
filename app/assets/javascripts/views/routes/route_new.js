TeamRun.Views.RouteNew = Backbone.CompositeView.extend({
  template: JST['routes/new'],

  render: function() {
    var content = this.template({ route: this.model });
    this.$el.html(content);

    return this;
  },

  renderMap: function() {
    L.mapbox.accessToken = 'pk.eyJ1IjoibnJibHVtMDEiLCJhIjoicEZqaW0tWSJ9.H00z3GVyiZ8Y68LDvb8rbw';
    var map = L.mapbox.map('map', 'nrblum01.l4bfc7g0').setView([40, -74.50], 9);
  }
});
