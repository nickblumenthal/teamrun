json.extract! @team, :id, :name, :description, :captain_id
json.events @team.events.each do |event|
  json.extract!(
     event,
     :id,
     :team_id,
     :user_id,
     :route_id,
     :description,
     :date,
     :time,
     :location
  )
end
