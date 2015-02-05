class AddNameColumnToEvents < ActiveRecord::Migration
  def change
    add_column :events, :name, :string
    add_index :events, :name, null: false
  end
end
