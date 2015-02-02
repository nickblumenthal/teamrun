class SessionsController < ApplicationController
  before_action :logged_in_redirect
  skip_before_action :logged_in_redirect, only: [:destroy]

  def new
    render :new
  end

  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if @user
      sign_in(@user)
      redirect_to home_url
    else
      flash.now[:errors] = ['Incorrect username or password']
      render :new
    end
  end

  def destroy
    sign_out
    redirect_to new_session_url
  end

  def logged_in_redirect
    redirect_to cats_url unless current_user.nil?
  end

end
