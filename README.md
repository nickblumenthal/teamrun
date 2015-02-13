# TeamRun

[Heroku link][heroku]

[heroku]: http://teamrun.nickblumenthal.io

## Minimum Viable Product
TeamRun is a mesh of Meetup and MapMyRun built with Rails and Backbone.  Users can:

- [x] Create accounts
- [x] Create sessions (log in)
- [x] Create a team/club
- [x] Join teams
- [x] Create running events for their team
- [x] Map running events for their team
- [x] View a calendar of events

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Create & Join Teams (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to create teams using simple text forms in Rails views. Likewise, users will be able to join teams from a list of available teams. Additionally, users should be able to see a simple show page for each team.

[Details][phase-one]

### Phase 2: JSON API/Backbone Views - Allow users to create and retrieve routes(~3 days)
I will add API routes to serve and accept JSON map data using the Under Armour Api to store/retrieve the associated routes.
The UA api can be accessed with client credentials. The flow goes as follows:
* Send request to UA api with client key/secret from server side using Typhoeus.
* Receive access token
* Create routes by sending a post request to the routes api with header and appropriate route json data. Append access token to header.
* Retrieve routes by sending a get request to the routes api with access token in header.

The map data will consist of lat/long points and associated marker meta data. Mapbox will be used to display the map and retrieve the coordinates of the picked points. When creating routes visually, mapbox will be used to drop markers and retrieve the lat/longs of points.  The information will then be converted to json and sent to the UA api with the methodology described above.  Use backbone.js to create views associated with creating/joining teams and creating/showing routes.

[Details][phase-two]

### Phase 3: JSON API/Backbone Views - Allow users to create and retrieve events(~1 days)
Once users can save and retrieve route route data, I will combine this functionality with creating and retrieving events. This will involve adding the route data to the event information and then adding additional details including date, time, location, and a description.  For this first stage event retrieval will be limited to showing events based off of the id.

[Details][phase-three]

### Phase 4: JSON API - Calendar (~1 day)
Create the api that can respond to a calendar object. Users may belong to multiple teams and their calendar will show all events from the teams.  The calendar object will be a Jquery plugin that allows the user to select specific days and see the times of the events.  Clicking on the event will take them to the event show page on the corresponding team. Events will consist of routes to be run at specific times and notes from the event creator.  The first day will be creating the routes and ensuring that the sql queries return the appropriately formatted event information.

[Details][phase-four]

### Phase 5: Backbone View for Calendar (~1 days)
Create a view for the calendar that can show the entire month and specific upcoming events. Allow the user to click on the calendar and display the associated event that may be contained within it in a more detailed view.  Allow the user to click on the event itself and be shown the event show view

[Details][phase-five]


### Bonus Features (TBD)
- [ ] User avatars
- [ ] Keep track of team stats
- [ ] Allow users to sign in with Under Armour auth so they can create private routes
- [ ] Create courses from routes, to allow people to compete
- [ ] Keep track of individual stats
- [ ] Allow users to create posts about events
- [ ] Allow team creators to moderate who joins teams
- [ ] Allow users to drag and drop events they created in their calendar view
- [ ] Allow sorting of teams
- [ ] Use isotope to show team sorting


[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
