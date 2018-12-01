class User < ApplicationRecord
  validates :email, presence: true
  validates :email, uniqueness: true
  validates :pubkey, presence: true

  has_many :user_sessions
  has_many :projects
end
