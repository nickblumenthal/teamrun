class UsersController < ApplicationController
  before_action :require_signed_in!, only: [:show]
  before_action :require_signed_out!, only: [:new, :create]

  ID = 'ye4baut4actzzzhtmhkws3acpfzaszuf'
  SECRET = '7d8RQf4KFuVRvCFwjUBXjUHKP72dCQ65QTFZs2NdFsy'

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

  def oauth
    if params[:code]
      token_response = get_tokens(params[:code])
      signup_or_login(token_response)
    end

    render json: params
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

  def get_tokens(code)
    request = Typhoeus::Request.new(
      "https://api.ua.com/v7.0/oauth2/uacf/access_token/",
      method: :post,
      body: {
        'grant_type' => "authorization_code",
        'client_id' => ID,
        'client_secret' => SECRET,
        'code' => code
      },
      headers: {
        'Api-Key' => ID
      }
    )
    request.run
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

  def get_user_data(user_id, auth_token)
    request = Typhoeus::Request.new(
    "https://oauth2-api.mapmyapi.com/v7.0/user/self/",
    method: :get,
    body: {
      'Content-Type' => "application/json",
      'Api-Key' => ID,
      'Authorization' => "Bearer #{auth_token}"
    },
    headers: {
      'Api-Key' => ID,
      'Authorization' => auth_token
    }
    )
    request.run
    response = request.response
    fail

  end
end
