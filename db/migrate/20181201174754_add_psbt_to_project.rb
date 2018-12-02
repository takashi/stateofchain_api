class AddPsbtToProject < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :psbt, :text, limit: 4294967295
  end
end
