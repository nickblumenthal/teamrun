class Event < ActiveRecord::Base
  validates :name, :team_id, :description, :user_id, :date, :time, :route_id, presence: true

  belongs_to :team
  belongs_to :user
  belongs_to :route
end
