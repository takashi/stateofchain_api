class Project < ApplicationRecord
  after_create :notify_to_participants
  has_many :project_accounts

  def notify_to_participants
    ActionCable.server.broadcast "notifications_#{1}", message: self.to_json
  end
end
