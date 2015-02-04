TeamRun.Views.RouteNew = Backbone.CompositeView.extend({
  initialize: function() {
    this.markers = [];
  },

  template: JST['routes/new'],

  render: function() {
    var content = this.template({ route: this.model });
    this.$el.html(content);

    return this;
  },

  renderMap: function() {
    L.mapbox.accessToken = 'pk.eyJ1IjoibnJibHVtMDEiLCJhIjoicEZqaW0tWSJ9.H00z3GVyiZ8Y68LDvb8rbw';
    this.map = L.mapbox.map('map', 'nrblum01.l4bfc7g0').setView([37.78, -122.40], 14);
    this.addMapEvents();
  },

  addMapEvents: function() {
    this.map.on('click', this.addPoint.bind(this));
  },

  addPoint: function(mapEvent) {
    var latlng = mapEvent.latlng;
    var marker = L.marker(latlng);
    this.markers.push(marker);
    marker.addTo(this.map);
    this.drawPath();
  },

  drawPath: function() {
    var latlngs = [];
    this.markers.forEach(function(marker) {
      latlngs.push(marker.getLatLng());
    });
    var polyline = L.polyline(latlngs, {color: 'red'}).addTo(this.map);
    this.showDistance();
  },

  showDistance: function() {
    var distance = this.calculateDistance();
    this.$('#route-distance').html(distance + 'm');
  },

  calculateDistance: function() {
    var distance = 0;
    for(var i = 0; i < this.markers.length - 1; i++) {
      var ptA = this.markers[i].getLatLng();
      var ptB = this.markers[i + 1].getLatLng();
      distance += ptA.distanceTo(ptB);
    }

    return Math.round(distance*100) / 100;
  }

});
