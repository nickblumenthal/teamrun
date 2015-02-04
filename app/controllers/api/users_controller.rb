class Api::UsersController < ApplicationController
  before_action :require_signed_in!, only: [:show]
  before_action :require_signed_out!, only: [:new, :create]

  include UaHelper

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)

    @user.username ||= @user.email
    @user.auth_provider ||= 'teamrun'

    if @user.save
      sign_in(@user)
      redirect_to home_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

  def signup_or_login(token_response)
    response_body = JSON.parse(token_response.body)

    external_user_id = response_body["user_id"]
    provider = 'ua'

    user = User.find_by_oauth_credentials(external_user_id, provider)
    user ? sign_in(user) : create_outside_user(response_body)
  end

  def create_outside_user(response_body)
    user = User.new
    user.external_user_id = response_body['user_id']
    user.auth_token = response_body['access_token']
    user.refresh_token = response_body['refresh_token']
    user.auth_provider = 'ua'

    user_data = get_user_data(user.external_user_id, user.auth_token)
  end

end
