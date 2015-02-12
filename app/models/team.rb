class Team < ActiveRecord::Base
  validates :name, :description, :location, presence: true
  validates :name, uniqueness: true

  has_many :memberships
  has_many :members, through: :memberships, source: :user
  belongs_to(
    :captain,
    class_name: 'User',
    foreign_key: :captain_id,
    primary_key: :id
  )
  has_many :events


end
