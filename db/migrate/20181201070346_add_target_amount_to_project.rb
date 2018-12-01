class AddTargetAmountToProject < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :target_amount, :integer
  end
end
