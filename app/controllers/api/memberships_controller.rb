class Api::MembershipsController < ApplicationController
  before_action :require_signed_in!

  def create
    @membership = Membership.new(membership_params)
    @membership.user_id = current_user.id
    if @membership.save
      render json: @membership
    else
      render json: @membership.errors.full_messages, status: 403
    end
  end

  private

  def membership_params
    params.require(:membership).permit(:team_id);
  end
end
