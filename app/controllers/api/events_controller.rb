class Api::EventsController < ApplicationController
  def create
    @event = Event.new(event_params)
    @event.user_id = current_user.id
    if current_user.teams.find(@event.team_id)
      if @event.save
        render json: @event
      else
        render json: @event.errors.full_messages, status: 422
      end
    else
      render json: "Not a member of this team", status: 403
    end
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
