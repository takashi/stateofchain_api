class Project < ApplicationRecord
  after_create :notify_to_participants
  has_many :project_accounts
  belongs_to :user

  enum status: { waiting: 0, started: 1, finished: 2 }

  attr_accessor :participants

  def notify_to_participants
    participants.each do |participant_id|
      ActionCable.server.broadcast "notifications_#{participant_id}", project: self.to_json, user: self.user.to_json
    end
  end
end
