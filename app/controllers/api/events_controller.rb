class Api::EventsController < ApplicationController
  def create
    @runEvent = Event.new(event_params)
    @runEvent.user_id = current_user.id
    p current_user.id
    if current_user.teams.where(id: @runEvent.team_id).length > 0
      if @runEvent.save
        render json: @runEvent
      else
        render json: @runEvent.errors.full_messages, status: 422
      end
    else
      render json: "Not a member of this team", status: 403
    end
  end

  def show
    @runEvent = Event.includes(:route, :team).find(params[:id]);
    render :show
  end

  private

  def event_params
    params.require(:event).permit(
      :route_id,
      :description,
      :date,
      :time,
      :location,
      :name,
      :team_id
    )
  end
end
