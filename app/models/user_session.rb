require 'securerandom'

class UserSession < ApplicationRecord
  SESSION_EXPIRATION = 2.weeks

  KEY_LENGTH = 32

  MAX_USER_AGENT_LENGTH = 255

  belongs_to :user

  before_validation :assign_key, on: :create
  before_validation :assign_accessed_at, on: :create
  before_validation :scrub_user_agent

  validates :key, presence: true
  validates :accessed_at, presence: true
  validates :user, presence: true

  scope :active, -> { not_expired.not_revoked }
  scope :not_expired, -> { where('accessed_at >= ?', SESSION_EXPIRATION.ago) }
  scope :not_revoked, -> { where(revoked_at: nil) }

  def revoke!
    update!(revoked_at: ::Time.zone.now)
  end

  def update_access_history(ip:, user_agent:)
    self.accessed_at = ::Time.zone.now
    self.ip = ip
    self.user_agent = user_agent
    save
  end

  private

  def assign_key
    self.key ||= ::SecureRandom.urlsafe_base64(KEY_LENGTH)
  end

  def assign_accessed_at
    self.accessed_at ||= ::Time.zone.now
  end

  def scrub_user_agent
    return unless user_agent
    self.user_agent = user_agent[0, MAX_USER_AGENT_LENGTH]
    self.user_agent = user_agent.force_encoding('UTF-8').scrub
  end
end
