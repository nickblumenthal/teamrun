TeamRun.Views.RouteShow = Backbone.CompositeView.extend({
  initialize: function() {
    this.listenTo(this.model, 'sync', this.renderMap);
    this.latlngs = [];

    // Listen to a mapResize event to fill map to the size of the containing div
    var view = this;
    $(window).on('mapResize', function() {
      view.map.invalidateSize();
    });
  },

  template: JST['routes/show'],

  render: function() {
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  renderMap: function() {
    var view = this;
    L.mapbox.accessToken = 'pk.eyJ1IjoibnJibHVtMDEiLCJhIjoicEZqaW0tWSJ9.H00z3GVyiZ8Y68LDvb8rbw';
    this.map = L.mapbox.map('map', 'nrblum01.l4bfc7g0').setView([37.78, -122.40], 14);
    this.model.get('data').points.forEach(function(point){
      view.addPoint(point);
    });
    this.drawPath();
    // this.addMapEvents();
  },

  addPoint: function(point) {
    var latlng = L.latLng(point.lat, point.lng);
    this.latlngs.push(latlng);
    var marker = L.marker(latlng);
    marker.addTo(this.map);
  },

  drawPath: function() {
    var polyline = L.polyline(this.latlngs, {color: 'red'}).addTo(this.map);
    this.showDistance();
  },

  showDistance: function() {
    var distance = this.calculateDistance();
    this.$('#route-distance').html(distance + 'm');
  },

  calculateDistance: function() {
    var distance = 0;
    for(var i = 0; i < this.latlngs.length - 1; i++) {
      var ptA = this.latlngs[i];
      var ptB = this.latlngs[i + 1];
      distance += ptA.distanceTo(ptB);
    }

    return Math.round(distance*100) / 100;
  }

});
