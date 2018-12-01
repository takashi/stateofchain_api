module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    protected
    def find_verified_user
      user_session = ::UserSession.active.find_by(key: cookies[:user_session_key_cookie_key_])
      if user_session && current_user = user_session.user
        current_user
      else
        reject_unauthorized_connection
      end
    end
  end
end
