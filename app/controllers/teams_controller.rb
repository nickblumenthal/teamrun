class TeamsController < ApplicationController
  def new
    @team = Team.new
    render :new
  end

  def create
    @team = Team.new(team_params)

end
