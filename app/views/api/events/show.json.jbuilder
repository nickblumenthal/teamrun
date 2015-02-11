json.extract! @runEvent, :team_id, :description, :user_id, :date, :time, :location, :name
json.team_name @runEvent.team.name
json.route do
  json.extract! @runEvent.route, :name, :ua_id, :user_id, :description, :data
end
