class AddPsbtToProject < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :psbt, :text
  end
end
