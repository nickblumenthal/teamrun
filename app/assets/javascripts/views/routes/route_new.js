TeamRun.Views.RouteNew = Backbone.CompositeView.extend({
  initialize: function(options) {
    this.markers = [];
    // Purpose can be either event or route depending on user end goal
    this.purpose = options.purpose;

    // Listen to a mapResize event to fill map to the size of the containing div
    var view = this;
    $(window).on('mapResize', function() {
      view.map.invalidateSize();
    });
  },

  template: JST['routes/new'],

  render: function() {
    var content = this.template({ route: this.model, purpose: this.purpose });
    this.$el.html(content);
    this.renderMap();
    return this;
  },

  events: {
    'click .submit-route' : 'submitRoute'
  },

  submitRoute: function(event, callback) {
    event.preventDefault();
    options = {
      name: this.$('input[name="route[name]"]').val(),
      description: this.$('textarea[name="route[description]"]').val()
    };
    var newRoute = TeamRun.Models.Route.createFromMarkers(this.markers, options)
    newRoute.save({}, {
      success: function() {
        callback && callback(newRoute.id);
      }
    });
  },

  renderMap: function() {
    L.mapbox.accessToken = 'pk.eyJ1IjoibnJibHVtMDEiLCJhIjoicEZqaW0tWSJ9.H00z3GVyiZ8Y68LDvb8rbw';
    this.map = L.mapbox.map(this.$('#map')[0], 'nrblum01.l4bfc7g0').setView([37.78, -122.40], 14);
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
    this.$('#route-distance').html('Distance: ' + distance + 'm');
  },

  calculateDistance: function() {
    var distance = 0;
    for(var i = 0; i < this.markers.length - 1; i++) {
      var ptA = this.markers[i].getLatLng();
      var ptB = this.markers[i + 1].getLatLng();
      distance += ptA.distanceTo(ptB);
    }

    return Math.round(distance*1) / 1;
  }

});
