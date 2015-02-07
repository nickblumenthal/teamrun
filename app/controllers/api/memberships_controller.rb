class Api::MembershipsController < ApplicationController
  before_action :require_signed_in!

  def show
    @membership = Membership.find_by(membership_params).where({ id: current_user.id })
    render json: @membership
  end

  def create
    @membership = Membership.new(membership_params)
    @membership.user_id = current_user.id
    if @membership.save
      render json: @membership
    else
      render json: @membership.errors.full_messages, status: 403
    end
  end

  def destroy
    @membership = Membership.where(membership_params).where({ user_id: current_user.id })[0]
    if @membership.destroy
      render json: 'destroyed'
    else
      render json: 'error'
    end
  end

  private

  def membership_params
    params.require(:membership).permit(:team_id);
  end
end
