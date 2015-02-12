TeamRun.Views.RouteShow = Backbone.CompositeView.extend({
  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.latlngs = [];

    // Listen to a mapResize event to fill map to the size of the containing div
    var view = this;
    $(window).on('mapResize', function() {
      view.map && view.map.invalidateSize();
      view.fitMap();
    });
  },

  template: JST['routes/show'],

  render: function() {
    var content = this.template({ route: this.model });
    this.$el.html(content);
    this.renderMap();
    return this;
  },

  renderMap: function() {
    var view = this;
    L.mapbox.accessToken = 'pk.eyJ1IjoibnJibHVtMDEiLCJhIjoicEZqaW0tWSJ9.H00z3GVyiZ8Y68LDvb8rbw';
    this.map = L.mapbox.map(this.$('#map')[0], 'nrblum01.l4bfc7g0').setView([37.78, -122.40], 14);
    this.addPoints();
    this.drawPath();
    this.showDistance();
  },

  addPoints: function(point) {
    var that = this;
    this.model.markers().forEach(function(marker) {
      marker.addTo(that.map);
    })
  },

  drawPath: function() {
    var polyline = L.polyline(this.model.latlngs(), {color: 'red'}).addTo(this.map);
  },

  showDistance: function() {
    var distance = this.calculateDistance();
    this.$('#route-distance').html(distance + 'm');
  },

  calculateDistance: function() {
    var distance = 0;
    for(var i = 0; i < this.model.latlngs().length - 1; i++) {
      var ptA = this.model.latlngs()[i];
      var ptB = this.model.latlngs()[i + 1];
      distance += ptA.distanceTo(ptB);
    }

    return Math.round(distance*100) / 100;
  },

  fitMap: function() {
    if(this.model.markers().length > 1) {
      this.map.fitBounds(this.model.getBounds());
    }
  }

});
