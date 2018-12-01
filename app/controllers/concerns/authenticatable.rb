module Authenticatable
  USER_SESSION_KEY_COOKIE_KEY = "user_session_key_cookie_key_"

  extend ActiveSupport::Concern

  included do
    helper_method :current_user, :logged_in?
  end

  def current_user
    return @__current_user if instance_variable_defined?(:@__current_user)
    @__current_user = current_user_session&.user
  end

  # @return [UserSession, nil]
  def current_user_session
    case
    when instance_variable_defined?(:@__current_user_session)
      @__current_user_session
    when current_user_session_key
      @__current_user_session = ::UserSession.active.find_by(key: current_user_session_key)
    else
      @__current_user_session = nil
    end
  end

  def login(user)
    clear_current_user_cache
    create_and_set_user_session!(user)
  end

  def logout
    current_user_session&.revoke!
    clear_user_session_cookie
    clear_current_user_cache
  end

  def logged_in?
    !!current_user
  end

  private

  # @return [String, nil]
  def current_user_session_key
    cookies[user_session_key_cookie_key]
  end

  def clear_user_session_cookie
    cookies.delete(user_session_key_cookie_key)
  end

  def user_session_key_cookie_key
    USER_SESSION_KEY_COOKIE_KEY
  end

  def clear_current_user_cache
    if instance_variable_defined?(:@__current_user)
      remove_instance_variable(:@__current_user)
    end
    if instance_variable_defined?(:@__current_user_session)
      remove_instance_variable(:@__current_user_session)
    end
  end

  # @param [User] user
  # @return [UserSession]
  def create_and_set_user_session!(user, team = nil)
    user_session = create_user_session_of!(user)
    store_current_user_session_key_cookie(user_session.key)
    user_session
  end

  # @param [User] user
  # @return [UserSession]
  def create_user_session_of!(user)
    user.user_sessions.create!(
      ip: request.ip,
      user_agent: request.user_agent,
    )
  end

  # @param [String] value
  def store_current_user_session_key_cookie(key)
    cookies[user_session_key_cookie_key] = {
      # domain: "*",
      expires: UserSession::SESSION_EXPIRATION.from_now,
      httponly: true,
      path: '/',
      value: key,
    }
  end
end
