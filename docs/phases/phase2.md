# Phase 2: JSON API/Backbone Views - Allow users to create and retrieve routes
## Rails
### Models
* Route

### Controllers
Api::RoutesController (create, destroy, index, show)

### Views
* routes/show.json.jbuilder

## Backbone
### Models
* Route

### Collections
* Routes

### Views
* RoutesIndex (composite view which contains RouteItems)
* RoutesShow

## Gems/Libraries
* Typhoeus for making server side request to Under Armour API
* Under Armour Api using client credentials to make publicly available routes.
* Mapbox library
