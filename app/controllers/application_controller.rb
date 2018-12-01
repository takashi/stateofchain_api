class ApplicationController < ActionController::Base
  include Authenticatable

  # before_action :authenticate_user!

  private

  def authenticate_user!
    redirect_to :root unless logged_in?
  end

  def use_ssl?
    Rails.env.production?
  end

  def basic_authentication
    if Rails.env.production? && use_ssl?
      authenticate_or_request_with_http_basic do |name, password|
        name == 'catcher' && password == 'inthetwitter'
      end
    end
  end
end
