require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module StateofchainApi
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    config.time_zone = 'Asia/Tokyo'
    config.active_record.default_timezone = :local
    config.generators.system_tests = nil

    config.paths.add 'lib', eager_load: true

    config.generators do |g|
      g.test_framework       :rspec, controller_specs: false, view_specs: false, helper_specs: false
      g.helper               false
      g.stylesheets          false
      g.javascripts          false
      g.factory_bot dir: 'spec/support/factories'
    end
  end
end
