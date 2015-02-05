class Event < ActiveRecord::Base
  validates :name, :team_id, :description, :user_id, :date, :time, presence: true

  belongs_to :team
  belongs_to :user
end
