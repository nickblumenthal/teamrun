json.array! @teams do |team|
  json.extract! team, :id, :name, :description, :captain_id, :logo
  json.events team.events.each do |event|
    json.extract!(
      event,
      :id,
      :team_id,
      :user_id,
      :route_id,
      :description,
      :date,
      :time,
      :location,
      :name
    )
  end
  json.members team.members.each do |member|
    json.extract!(
      member,
      :id
    )
  end
end
