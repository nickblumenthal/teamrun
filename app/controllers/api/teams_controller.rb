class Api::TeamsController < ApplicationController
  before_action :require_signed_in!

  def new
    @team = Team.new
    render :new
  end

  def index
    @team = Team.all
    render json: @team
  end

  def create
    @team = Team.new(team_params)
    @team.captain_id = current_user.id
    if @team.save
      @membership = Membership.new({ team_id: @team.id, user_id: current_user.id })
      @membership.save
      render json: @team
    else
      render json: @team.errors.full_messages, status: 422
    end
  end

  def show
    @team = Team.includes(:events).find(params[:id])
    render :show
  end

  def edit
    @team = Team.find(params[:id])
    render :edit
  end

  def update
    @team = Team.find(params[:id])
    render json: 'Access Denied' unless @team.captain == current_user.id
    if @team.update(team_params)
      render json: @team
    else
      render json: @team.errors.full_messages, status: 422
    end
  end

  def destroy
    @team = Team.find(params[:id])
    if @team.captain_id == current_user.id
      @team.destroy
      render json: 'Destroyed'
    else
      render json: 'Access Denied', status: 403
    end
  end

  private

  def team_params
    params.require(:team).permit(:name, :description)
  end

end
