class StaticPagesController < ApplicationController
  before_action :require_signed_in!, only: [:home]

  def home
    render :home
  end

  def landing
    render :landing
  end
  
end
