class Membership < ActiveRecord::Base
  validates :team_id, :user_id, presence: true
  validates :user_id, uniqueness: { scope: :team_id, message: 'already signed up for this team'}

  belongs_to :team
  belongs_to :user
end
