class Api::RoutesController < ApplicationController
  include UaHelper

  def create
    @route = Route.new()
    @route.data = route_params
    @route.user_id = current_user.id
    @route.name = @route.data['name']
    @route.description = @route.data['description']
    if @route.save
      render json: @route
    else
      render json: @route.errors.full_messages, status: 422
    end
  end

  def show
    @route = Route.find(params[:id])
    render json: @route
  end

  private

  def route_params
    params.require(:routeInfo)
  end

end
