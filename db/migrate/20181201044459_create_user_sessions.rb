class CreateUserSessions < ActiveRecord::Migration[5.2]
  def change
    create_table :user_sessions do |t|
      t.datetime :accessed_at
      t.datetime :created_at
      t.datetime :revoked_at
      t.references :user, foreign_key: true
      t.string :ip
      t.string :key
      t.string :user_agent
    end
  end
end
