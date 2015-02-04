TeamRun.Models.Route = Backbone.Model.extend({
  urlRoot: '/api/routes',
})

/*
  Create a route from markers and options
    options: description, starting_point_type
*/

TeamRun.Models.Route.createFromMarkers = function(markers, options) {
  var newRoute = new TeamRun.Models.Route();
  newRoute.routeInfo = {};
  newRoute.routeInfo.data_source = "TeamRun";
  newRoute.routeInfo.description = options.description || "TeamRun Route";
  newRoute.routeInfo.starting_location = {
    "type": options.starting_point_type || "Point",
    "coordinates": [
      markers[0].getLatLng().lat,
      markers[0].getLatLng().lng
    ]
  };
  newRoute.routeInfo.points = [];

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
    newRoute.routeInfo.points.push(point);
  });
  newRoute.routeInfo.postal_code = "00000";
  newRoute.routeInfo.name = options.name;

  return newRoute
};
