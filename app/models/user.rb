class User < ActiveRecord::Base
  attr_reader :password;

  validates :username, :auth_provider, :password_digest, :email, presence: :true
  validates :password, length: { minimum: 6, allow_nil: true}

  before_validation :ensure_session_token

  def self.find_by_credentials(email, password)
    user = User.find_by({email: email})
    user && user.is_password?(password) ? user : nil
  end

  def self.find_by_oauth_credentials(external_user_id, provider)
    user = User.find_by({external_user_id: external_user_id, auth_provider: provider})
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def set_activation_token
    self.activation_token =
    generate_unique_token_for_field(:activation_token)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end
end
