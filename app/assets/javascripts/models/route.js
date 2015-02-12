TeamRun.Models.Route = Backbone.Model.extend({
  urlRoot: '/api/routes',

  latlngs: function() {
    this._latlngs = [];
    var that = this;
    if(this.get('data')){
      this.get('data').points.forEach(function(point){
        that._latlngs.push(L.latLng(point.lat, point.lng));
      });
    }

    return this._latlngs;
  },

  markers: function() {
    this._markers = [];
    var that = this;
    this.latlngs().forEach(function(latlng) {
      that._markers.push(L.marker(latlng));
    })

    return this._markers;
  },

  getBounds: function() {
    var group = new L.featureGroup(this.markers());
    return group;
  }
})

/*
  Create a route from markers and options
    options: description, starting_point_type
*/

TeamRun.Models.Route.createFromMarkers = function(markers, options) {
  var newRoute = new TeamRun.Models.Route();
  newRoute._routeInfo = {};
  newRoute._routeInfo.data_source = "TeamRun";
  newRoute._routeInfo.description = options.description || "TeamRun Route";
  newRoute._routeInfo.starting_location = {
    "type": options.starting_point_type || "Point",
    "coordinates": [
      markers[0].getLatLng().lat,
      markers[0].getLatLng().lng
    ]
  };
  newRoute._routeInfo.points = [];

  // Assign points from markers
  markers.forEach(function(marker, index) {
    var point = {
      "lat": marker.getLatLng().lat,
      "lng": marker.getLatLng().lng,
      "_links": {
        "marker_icon": [
          {
            "href": "http://static.mapmyfitness.com/d/mapping_api/stable/img/markers/police.png",
            "id": "2017",
            "desc": "Police"
          }
        ]
      },
      "notes": marker.notes || "",
      "order": index
    };
    newRoute._routeInfo.points.push(point);
  });
  newRoute._routeInfo.postal_code = "00000";
  newRoute._routeInfo.name = options.name;
  newRoute.set('routeInfo', newRoute._routeInfo);
  return newRoute
};
