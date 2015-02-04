module UaHelper
  TOKEN_ENDPOINT = "https://api.ua.com/v7.0/oauth2/uacf/access_token/"
  ID = 'ye4baut4actzzzhtmhkws3acpfzaszuf'
  SECRET = '7d8RQf4KFuVRvCFwjUBXjUHKP72dCQ65QTFZs2NdFsy'

  ## Initiate OAuth2 Flow for Auth Token
  def oauth
    if params[:code]
      token_response = get_user_tokens(params[:code])
      signup_or_login(token_response)
    end

    render json: params
  end

  ## Get user's auth token after receiving auth code
  def get_user_tokens(code)
    request = Typhoeus::Request.new(
    TOKEN_ENDPOINT,
    method: :post,
    body: {
      'grant_type' => "authorization_code",
      'client_id' => ID,
      'client_secret' => SECRET,
      'code' => code
    },
    headers: {
      'Api-Key' => ID
    })
    request.run
  end

  ## Get client auth token (client credentials)
  def get_client_token
    request = Typhoeus::Request.new(
    TOKEN_ENDPOINT,
    method: :post,
    body: {
      'grant_type' => "client_credentials",
      'client_id' => ID,
      'client_secret' => SECRET,
    })
    request.run
    response = request.response
    access_token = response.body.access_token
  end

  ## Get signed in user's data
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
