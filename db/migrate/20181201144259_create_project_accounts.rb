class CreateProjectAccounts < ActiveRecord::Migration[5.2]
  def change
    create_table :project_accounts do |t|
      t.references :project, foreign_key: true
      t.references :user, foreign_key: true
      t.text :pubkey

      t.timestamps
    end
  end
end
